'use client';

// React components
import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchData } from 'app/api/fetch-data';
import { useParams } from 'next/navigation';

// Components
import ToggleSwitch from 'components/ToggleSwitch';
import ChatInput from 'components/ChatInput';
import ChatResponse from 'components/ChatResponse';
import { Tree, TreeNode } from 'lib/tree-datastructure';
import { IonIcon } from '@ionic/react';
import { refresh } from 'ionicons/icons';
import { arrowDown } from 'ionicons/icons';
//import './chatbox.module.css';

// Backend/DB Management
import {
  addMessage,
  addVersion,
  fetchChatData,
  fetchDataByIndex,
} from 'app/api/ChatData/add-chatData';
import { Timestamp } from '@google-cloud/firestore';

// CSS
// import styles from 'app/chat/page.module.css';
import styles from './chatbox.module.css';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { cog } from 'ionicons/icons';
import { menu } from 'ionicons/icons';
import FileParser from '../../components/ParseFile'; // Adjust the import path as needed
// CSS
import { settings } from 'firebase/analytics';

import { titlePromptText } from 'lib/title-prompt';

// Init the chat tree and current node
// The current node is created to more easily add to the chain of nodes without having to iterate through the tree to find where to add the node
//let chatTree = new Tree('root');
let currentNode: TreeNode;
let activeMessage: string;
let activeAIMessage: string;
let chatId: string;

interface VersionOfMessage {
  sentTime: Timestamp;
  content: string;
}

interface ChatAreaProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean; // Add this line to accept the new prop
  fileContents: string;
  files: never[];
}

export default function ChatBox({
  children,
  toggleSidebar,
  isSidebarOpen,
  files,
}: ChatAreaProps) {
  // Input value is equal to the current input in the input box
  // Input array is equal to the array of all inputs and outputs
  const [inputValue, setInputValue] = useState<string>('');
  const [inputArray, setInputArray] = useState<string[]>([]);
  const [chatTree, setChatTree] = useState<Tree>(new Tree('root'));
  const [chatTitle, setChatTitle] = useState<string>('New Chat');
  const [loaded, setLoaded] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      console.log('session loaded');
      const savedLoaded = sessionStorage.getItem('loaded');
      return savedLoaded !== null ? savedLoaded : '';
    }
    return ''; // Default value for when sessionStorage is not available
  });

  useEffect(() => {
    sessionStorage.setItem('loaded', loaded);
  }, [loaded]);

  //const [isLoading, setIsLoading] = useState(false);
  const Params = useParams();

  //let inputArray: string[] = [];

  interface VersionOfMessage {
    sentTime: Timestamp;
    content: string;
  }

  interface Message {
    author: 'User' | 'AI';
    versionsOfMessages: VersionOfMessage[];
  }

  interface Chat {
    dateCreated: Timestamp;
    lastUsedDate: Timestamp;
    messages: string[];
  }

  interface User {
    name: string;
    email: string;
    chatHistory: string[];
  }

  const layerSize: number[] = [];

  async function addChatData() {
    if (Params && chatId) {
      try {
        const messages = (await fetchChatData({
          userId: 'not important',
          chatId: chatId,
          getAll: false,
        })) as string[];
        //console.log(messages);
        let i: number = 0;
        let k: number = 0;
        const temp: TreeNode[] = [];
        for (const message of messages) {
          i = 0;
          try {
            const versions = (await fetchChatData({
              userId: 'not important',
              chatId: 'not important',
              messageId: message,
              getAll: false,
            })) as string[];
            const messageNode = new TreeNode(' ', message);
            chatTree.children.push(messageNode);

            for (const version of versions) {
              try {
                const versionOfMessage = (await fetchChatData({
                  userId: 'not important',
                  chatId: 'not important',
                  messageId: 'not important',
                  versionOfMessageId: version,
                  getAll: true,
                })) as VersionOfMessage;
                //console.log('Version data: ', versionOfMessage);
                const data: string = versionOfMessage.content;
                // Create a new node that will be a sibling of the message node
                const newNode = new TreeNode(data, message);
                // Add the new node as a child to the message node
                messageNode.addChild(newNode);

                if (i === 0) {
                  temp.push(newNode);
                  currentNode = newNode;
                }

                i++;
              } catch (error) {
                console.error(
                  'Could not get version of message object ',
                  error,
                );
              }
            }
            //messageNode.priorityChild = 0;
            if (k > 0 && i !== 0) {
              temp[k - 1].addChild(chatTree.children[k]);
              //temp[k - 1].priorityChild = 0;
              //console.log(temp);
            }

            layerSize.push(i);

            k++;

            if (k === messages.length) activeAIMessage = message;

            if (k + 1 === messages.length) activeMessage = message;
          } catch (error) {
            console.error('Could not get version list: ', error);
          }
        }
      } catch (error) {
        console.error('Could not get message list: ', error);
      }
      cleanUpTree(chatTree);
      console.log(chatTree.printTree());
      updateInputArray(chatTree);
    }
    //console.log(chatTree.printTree());
  }
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  function cleanUpTree(chatTree: Tree): void {
    // Shift up the layers by one, making the children of root's children the new first layer
    const newChildren: TreeNode[] = [];
    chatTree.children.forEach((child) => {
      newChildren.push(...child.children);
    });
    chatTree.children = newChildren;

    // Function to enforce the size of each layer
    function enforceLayerSize(node: TreeNode, depth: number): void {
      if (depth < layerSize.length) {
        // Truncate the children array to the desired size
        node.children = node.children.slice(0, layerSize[depth]);
        // Continue for each child
        node.children.forEach((child) => enforceLayerSize(child, depth + 1));
      }
    }

    // Depth-first search function to clean up the tree
    function dfs(node: TreeNode, parent: TreeNode | null = null): void {
      // Process all children first
      for (let i = 0; i < node.children.length; i++) {
        dfs(node.children[i], node);
      }

      // Check and remove the current node if it is an empty space
      if (node.data.trim() === '' && parent) {
        // Re-attach current node's children to its parent
        parent.children = [...parent.children, ...node.children];
        // Remove the current node from its parent
        parent.children = parent.children.filter((child) => child !== node);
      }
    }

    // Start the cleanup process from the root's new children
    chatTree.children.forEach((child) => dfs(child));

    // Enforce the layer size starting from the root (depth 0)
    enforceLayerSize({ children: chatTree.children } as TreeNode, 0);
  }

  useEffect(() => {
    if (Params && chatId) {
      //setIsLoading(true); // Start loading
      setChatTree(new Tree(chatId));
      /* 
      const timer = setTimeout(() => {
        setIsLoading(false);
        void addChatData();
      }, 5000);

      return () => clearTimeout(timer); */
    }
  }, [chatId]);

  useEffect(() => {
    if (chatTree && Params && chatId) {
      //setLoaded(!loaded);
      void addChatData();
    }
  }, [chatTree]);

  //console.log(loaded);

  useEffect(() => {
    if (
      ((loaded !== chatId && loaded) ||
        (loaded === '' && chatId !== undefined)) &&
      chatId
    ) {
      window.location.reload();
      setLoaded(chatId);
    }
  }, [loaded]);
  const [knowledge, setCombinedContent] = useState('');

  useEffect(() => {
    if (files.length > 0) {
      readAndCombineFiles(files);
    }
  }, [files]);

  const readAndCombineFiles = (files) => {
    let combinedFilesContent = '';
    let filesRead = 0;

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        combinedFilesContent += e.target.result + '\n';
        filesRead++;

        if (filesRead === files.length) {
          // All files have been read
          setCombinedContent(combinedFilesContent.trim());
        }
      };

      reader.readAsText(file);
    });
  };
  const textareaRef = useRef(null); // Create a ref for the textarea
  const chatContainerRef = useRef(null); // Create a ref for the chat window

  // Function to resize the textarea
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Temporarily shrink to get the correct new scrollHeight
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to the new height
    }
  };

  function changePreviousInput(data: string, index: number) {
    // If the new input is different from the old input, then update the tree
    if (data != inputArray[index]) {
      let priorityNodeAtLevel: TreeNode;
      // If the index is 0, then the priority node is the root node, and we need to add a new child directly to the tree ds
      // Otherwise we need to find the parent node of the node the user is changing, and add the new node as a child of that parent node
      // Once the new node (the new user input) is added, we change the priority child which basically switches the path of the tree to the new node
      if (index === 0) {
        priorityNodeAtLevel = new TreeNode(data, activeMessage);
        chatTree.children.push(priorityNodeAtLevel);
        chatTree.priorityChild = chatTree.priorityChild + 1;
      } else {
        priorityNodeAtLevel = chatTree.getChildAtLevel(index - 1, chatTree);
        priorityNodeAtLevel.addChild(new TreeNode(data, activeMessage));
        priorityNodeAtLevel.changePriorityChild(1);
      }
      addVersion(activeMessage, data).catch((error) => {
        console.error('API Request Error: ', error);
      });

      updateInputArray(chatTree);
      currentNode = priorityNodeAtLevel;
      regenerateResponse(index + 1);
    }
  }

  function regenerateResponse(indexToGoTill: number) {
    const priorityNodeAtLevel: TreeNode = chatTree.getChildAtLevel(
      indexToGoTill - 1,
      chatTree,
    );

    const redoArray: string[] = chatTree
      .returnStringArray()
      .slice(0, indexToGoTill);

    fetchData(redoArray)
      .then((response: string) => {
        priorityNodeAtLevel.addChild(new TreeNode(response, activeAIMessage));
        priorityNodeAtLevel.changePriorityChild(1);

        //console.log(chatTree.printTree());

        updateInputArray(chatTree);
        addVersion(activeAIMessage, response).catch((error) => {
          console.error(
            'API Request Error (adding regenerated version): ',
            error,
          );
        });
      })
      .catch((error) => {
        console.error('API Request Error: ', error);
      });
    console.log(chatTree.printTree());
  }

  // Scrolls the page to the bottom when the user clicks the button
  function scrollToBottom() {
    if (chatContainerRef.current) {
      const chatContainer = chatContainerRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  function createTitle() {
    const title: string = titlePromptText;

    const updatedInputArray: string[] = chatTree.returnStringArray();
    // Add titlePrompt to the array
    updatedInputArray.push(title);

    // Calls a server function from a separate file (because it's asynchronous and the component were currently in is a client component)
    // Awaits a response, then adds the new response to the tree
    fetchData(updatedInputArray)
      .then((response: string) => {
        setChatTitle(response);
        console.log(response);
      })
      .catch((error) => {
        console.error('API Request Error: ', error);
      });
  }

  // Traverses through the tree to find the priority nodes and updates the input array
  // Also updates the current node to be the last priority node in the tree
  function updateInputArray(tree: Tree) {
    const newInputArray: string[] = tree.returnStringArray();
    if (newInputArray.length === 3 && chatTitle === 'New Chat') {
      createTitle();
    }
    setInputArray(newInputArray);
    //currentNode = tree.getChildAtLevel(newInputArray.length - 1, tree);
  }

  function addNewNode(inputValue: string, messageId?: string) {
    if (currentNode) {
      const childNode: TreeNode = new TreeNode(
        inputValue,
        currentNode.messageId,
      );
      currentNode.addChild(childNode);
      currentNode = childNode;
    } else {
      currentNode = new TreeNode(inputValue, messageId as string);
      chatTree.children.push(currentNode);
    }
    updateInputArray(chatTree);
  }

  useEffect(() => {
    if (Params) chatId = Params['id'] as string;
  }, [Params]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const userInput = inputValue.trim();
      // const knowledge = fileContents.join('\n').trim();
      const instruction =
        'You are the AI. The user has provided you with a knowledge base and some input as a JSON object.\
      Your task is to incrementally solve the problem. You should always respond in JSON format. Here is a pseudo schema for the format:\
      {\
        command: RESPONSE | WEBSITE,\
        content: string\
      }\
      If you choose the RESPONSE command, just send a message like normal. If you choose the WEBSITE command, then provide a link to the website\
      you would like summarized. The user will send the summary back to you, along with the knowledge and this task prompt.\
      Remember, you must always follow this exact JSON schema and may not deviate from it at any time. Do not add extra sentences or conversational\
      phrases outside of the JSON object, the user is only interested in your JSON object.';

      if (userInput.trim() !== '') {
        const dataToSend = JSON.stringify({
          task: instruction,
          userInput: userInput,
          knowledge: knowledge,
        });
        addMessage(chatId, 'User')
          .then((messageRes) => {
            addVersion(messageRes.messageId as string, dataToSend).catch(
              (error) => {
                console.error(
                  'API Request Error (cannor add version): ',
                  error,
                );
              },
            );
            activeMessage = messageRes.messageId as string;
          })
          .catch((error) => {
            console.error('API Request Error (cannor add message): ', error);
          });
        addNewNode(dataToSend, activeMessage);

        const updatedInputArray: string[] = chatTree.returnStringArray();
        // Calls a server function from a separate file (because it's asynchronous and the component were currently in is a client component)
        // Awaits a response, then adds the new response to the tree
        fetchData(updatedInputArray)
          .then((res) => {
            addMessage(chatId, 'AI')
              .then((messageRes) => {
                addVersion(messageRes.messageId as string, res).catch(
                  (error) => {
                    console.error(
                      'API Request Error (cannor add version): ',
                      error,
                    );
                  },
                );
                activeAIMessage = messageRes.messageId as string;
              })
              .catch((error) => {
                console.error(
                  'API Request Error (cannor add message): ',
                  error,
                );
              });
            addNewNode(res, activeMessage);
          })
          .catch((error) => {
            console.error('API Request Error: ', error);
          });
        //Resets the input box to be empty
        setInputValue('');
        resetTextareaSize();
      } else {
        //alert('Input cannot be empty.');
        addNewNode('Error: Input cannot be empty');
      }
    } else if (event.key === 'Enter' && event.shiftKey) {
      // Allow the newline to be added by not calling event.preventDefault()
      // The browser will handle inserting the newline
    }
  }
  const resetTextareaSize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'inherit'; // Set this to your desired minimum height
      // Reset the bottom of the chatBox if necessary
    }
  };
  useEffect(() => {
    resizeTextarea();
  }, [inputValue]);

  return (
    <div className={styles.chatSection}>
      <header className={styles.header}>
        <button className={styles.expand_icon} onClick={toggleSidebar}>
          <IonIcon icon={menu} />
        </button>
        <h2 className={styles.title}>{chatTitle}</h2>
        <ToggleSwitch darkMode={darkMode} onChange={toggleDarkMode} />
      </header>
      <main className={styles.chatScroll} ref={chatContainerRef}>
        {inputArray.map((message, index) => {
          const hasPreviousPrompt = index > 0;
          const hasNextPrompt = index < inputArray.length - 1;
          let isJSON = true;
          try {
            JSON.parse(message);
          } catch (e) {
            isJSON = false;
          }
          if (index % 2 === 0) {
            let userInput = message;
            if (isJSON) {
              // Parse the JSON string and extract userInput
              const messageObj = JSON.parse(message);
              userInput = messageObj.userInput;
            }
            return (
              <ChatInput
                key={index}
                data={userInput}
                indexValue={index}
                chatTree={chatTree}
                // Prop function to change the priority child of the parent node
                // The .bind function is there because otherwise the node being passed in would not have the correct values
                onChangePriorityChild={chatTree
                  .getChildAtLevel(index - 1, chatTree)
                  .changePriorityChild.bind(
                    chatTree.getChildAtLevel(index - 1, chatTree),
                  )}
                // onUpdateInputArray={updateInputArray}
                // onChangePreviousInput={changePreviousInput}
                onAddNewNode={addNewNode}
              />
            );
          } else {
            return (
              <ChatResponse
                key={index}
                data={message}
                index={index}
                chatTree={chatTree}
                // Prop function to change the priority child of the parent node
                // The .bind function is there because otherwise the node being passed in would not have the correct values
                onChangePriorityChild={chatTree
                  .getChildAtLevel(index - 1, chatTree)
                  .changePriorityChild.bind(
                    chatTree.getChildAtLevel(index - 1, chatTree),
                  )}
                onUpdateInputArray={updateInputArray}
                onAddNewNode={addNewNode}
              />
            );
          }
        })}
      </main>

      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.button}
          onClick={() => regenerateResponse(inputArray.length - 1)}
        >
          <span className={styles.button__text}>Regenerate</span>
          <span className={styles.button__icon}>
            <IonIcon icon={refresh} />
          </span>
        </button>

        <form action={fetchData}>
          <div className={styles.chatBox}>
            <textarea // Change this to textarea
              ref={textareaRef} // Attach the ref to the textarea
              onKeyDown={handleKeyDown}
              onInput={resizeTextarea} // Add the onInput event handler
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={"Ask Away..."} // Conditional placeholder
              rows={1}
              cols={100}
            />
          </div>
        </form>

        <button
          type="button"
          className={styles.button}
          onClick={scrollToBottom}
        >
          <span className={styles.button__text}>To Bottom</span>
          <span className={styles.button__icon}>
            <IonIcon icon={arrowDown} />
          </span>
        </button>
      </footer>
    </div>
  );
}
