// React components
import React, { useState, useEffect, useRef } from 'react';
import { fetchData } from 'app/api/fetch-data';
import ChatInput from 'components/ChatInput';
import ChatResponse from 'components/ChatResponse';
import { Tree, TreeNode } from 'lib/tree-datastructure';
import { IonIcon } from '@ionic/react';
import { refresh } from 'ionicons/icons';
import { arrowDown } from 'ionicons/icons';
import { cog } from 'ionicons/icons';
import { menu } from 'ionicons/icons';
import styles from '../ChainPrompt/chainprompt.module.css';

const chatTree = new Tree('root');
let currentNode: TreeNode;

interface ChatNode {
  userInput: string;
  responses: string[];
}

interface ChatAreaProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function ChatBox({
  toggleSidebar,
  isSidebarOpen,
}: ChatAreaProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [chatNodes, setChatNodes] = useState<ChatNode[]>([]);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  const addNewNode = (userInput: string, responses: string[]) => {
    const newNode: ChatNode = {
      userInput,
      responses,
    };
    setChatNodes([...chatNodes, newNode]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      if (inputValue.trim() !== '') {
        const updatedInputArray: string[] = chatTree.returnStringArray();

        fetchData(updatedInputArray)
          .then((responses: string[]) => {
            addNewNode(inputValue, responses);
            setInputValue('');
            resetTextareaSize();
          })
          .catch((error) => {
            console.error('API Request Error: ', error);
          });
      } else {
        addNewNode('Error: Input cannot be empty', []);
      }
    } else if (event.key === 'Enter' && event.shiftKey) {
      // Allow the newline to be added by not calling event.preventDefault()
      // The browser will handle inserting the newline
    }
  };

  const resetTextareaSize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '0px';
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const chatContainer = chatContainerRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  const regenerateResponse = (indexToGoTill: number) => {
    const priorityNodeAtLevel: TreeNode = chatTree.getChildAtLevel(
      indexToGoTill - 1,
      chatTree,
    );

    const redoArray: string[] = chatTree
      .returnStringArray()
      .slice(0, indexToGoTill);

    fetchData(redoArray)
      .then((response: string) => {
        priorityNodeAtLevel.addChild(new TreeNode(response));
        priorityNodeAtLevel.changePriorityChild(1);
        updateInputArray(chatTree);
      })
      .catch((error) => {
        console.error('API Request Error: ', error);
      });
  };

  const updateInputArray = (chatTree: Tree) => {
    // Update the logic for updating the chat tree or input array if required
  };

  const changePreviousInput = () => {
    // Logic to change the previous input if required
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      let newHeight = textarea.scrollHeight;

      newHeight = Math.max(newHeight, 0);
      newHeight = Math.min(newHeight, 250);

      textarea.style.height = `${newHeight}px`;
    }
  };

  return (
    <div className={styles.chatSection}>
      <header className={styles.header}>
        <button className={styles.expand_icon} onClick={toggleSidebar}>
          <IonIcon icon={menu} />
        </button>
        <h2 className={styles.title}>Title</h2>
        <button className={styles.option__icon}>
          <IonIcon icon={cog} />
        </button>
      </header>
      <main className={styles.chatScroll} ref={chatContainerRef}>
        {chatNodes.map((node, index) => (
          <div key={index}>
            <ChatInput
              key={`input-${index}`}
              data={node.userInput}
              indexValue={index}
              chatTree={chatTree}
              onChangePriorityChild={chatTree.getChildAtLevel(index - 1, chatTree).changePriorityChild.bind(chatTree.getChildAtLevel(index - 1, chatTree))}
              onUpdateInputArray={updateInputArray}
              onChangePreviousInput={changePreviousInput}
            />
            {node.responses.map((response, responseIndex) => (
              <ChatResponse
                key={`response-${index}-${responseIndex}`}
                data={response}
                index={responseIndex}
                chatTree={chatTree}
                onChangePriorityChild={chatTree.getChildAtLevel(index - 1, chatTree).changePriorityChild.bind(chatTree.getChildAtLevel(index - 1, chatTree))}
                onUpdateInputArray={updateInputArray}
              />
            ))}
          </div>
        ))}
      </main>
      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.button}
          onClick={() => regenerateResponse(chatNodes.length - 1)}
        >
          <span className={styles.button__text}>Regenerate</span>
          <span className={styles.button__icon}>
            <IonIcon icon={refresh} />
          </span>
        </button>
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
        <form action={fetchData}>
          <div className={styles.chatBox}>
            <textarea
              ref={textareaRef}
              onKeyDown={handleKeyDown}
              onInput={resizeTextarea}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Away..."
            />
          </div>
        </form>
      </footer>
    </div>
  );
}
