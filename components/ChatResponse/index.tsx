/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/no-children-prop */

// Component for the LLM response to the user's input
// Needs to have a regenerate response function which calls the API
// Also needs the ability to swap back and forth between previous responses

import { Tree } from 'lib/tree-datastructure';

// Markdown and Plugins
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from '../ChatResponse/chatresponse.module.css';
import { recursePromptText } from 'lib/recurse-prompt';
import { fetchData, summarizeURL } from 'app/api/fetch-data';
import { useEffect, useState } from 'react';

interface ChatResponseProps {
  data: string;
  index: number;
  chatTree: Tree;
  onChangePriorityChild: (direction: number) => void;
  onUpdateInputArray: (chatTree: Tree) => void;
  onAddNewNode: (data: string) => void;
}

export default function ChatResponse({
  data,
  index,
  chatTree,
  onChangePriorityChild,
  onUpdateInputArray,
  onAddNewNode,
}: ChatResponseProps) {
  const [content, setContent] = useState("");
  const chatTreeVar: Tree = chatTree;

  function changeChildAndRefreshArray(direction: number) {
    onChangePriorityChild(direction);
    onUpdateInputArray(chatTreeVar);
  }

  const isInputValid = data?.trim() !== '';

  const sendReponseToAPI = () => {
    if (isInputValid) {
      console.log('Sending response to server:', data);
    } else {
      console.log('Invalid response data. Cannot send to API.');
    }
  };

  const recurseResponse = () => {
    const redoArray: string[] = chatTree.returnStringArray();
    const inputPrompt: string = `${recursePromptText}"${data}"`;
    redoArray[chatTree.priorityChild] = inputPrompt;
    fetchData(redoArray)
      .then((response: string) => {
        // chatTree.priorityNodeAtLevel.addChild(new TreeNode(response));
        // chatTree.priorityNodeAtLevel.changePriorityChild(1);
        onAddNewNode(response);
        onUpdateInputArray(chatTreeVar);
      })
      .catch((error) => {
        console.error('API Request Error: ', error);
      });
  };

  useEffect(() => {
    interface AiResponse {
      command: "RESPONSE" | "WEBSITE",
      content: string
    };

    const getContent = async (res: string): Promise<void> => {
      console.log(res)
      // Match the JSON object.
      const jsonMatch = res.match(/\{[\s\S]*\}/);
      
      // Trim all excess whitespace around JSON object.
      let jsonString = "";
      if (jsonMatch) {
        jsonString = jsonMatch[0].trim();
      }
      else {
        setContent("AI responded in an invalid format. Here is the raw response: " + res);
        return;
      }

      // Parse JSON object.
      let json: AiResponse;
      try {
        json = JSON.parse(jsonString);
      }
      catch (err) {
        setContent("AI responded in an invalid format. Here is the raw response: " + res);
        return;
      }

      // Return content if command is RESPONSE.
      if (json.command === "RESPONSE") {
        setContent(json.content);
      }
      else {
        setContent("Searching " + json.content + "...\n" + "Caution AI may loop indefinitely.");
        const summary = await summarizeURL(json.content);
        const res: AiResponse = {
          command: "RESPONSE",
          content: summary
        };
        onAddNewNode(JSON.stringify(res));
        onUpdateInputArray(chatTreeVar);
      }
    };

    void getContent(data);
  }, ([chatTreeVar, data, onAddNewNode, onUpdateInputArray]));

  return (
    <div className={styles.responseText}>
      <p>RESPONSE:</p>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                className={styles.code}
                {...rest}
                children={String(children).replace(/\n$/, '')}
                style={materialOceanic}
                language={match[1]}
                PreTag="div"
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
      <div className={styles.responseFooter}>
        {/* Looks at priorityChild's (current input selected)
        children's (all AI responses for the selected input) 
        length to determine if arrows should show. */}
        {chatTree.children[chatTree.priorityChild].children.length > 1 ? (
          <>
            <button onClick={() => changeChildAndRefreshArray(-1)}>
              <img src="/back.svg" alt="GO BACK" />
            </button>
            <button onClick={() => changeChildAndRefreshArray(1)}>
              <img src="/forward.svg" alt="GO FORWARD" />
            </button>
          </>
        ) : (
          <></>
        )}
        <button onClick={() => recurseResponse()}>Recurse!</button>
      </div>
    </div>
  );
}
