// Component for received input that renders to the screen as text with the edit button
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from '../ChatInput/chatinput.module.css';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tree } from 'lib/tree-datastructure';
import { fetchData } from 'app/api/fetch-data';
import { recursePromptText } from 'lib/recurse-prompt';
interface ChatInputProps {
  data: string;
  index: number;
  chatTree: Tree;
  onChangePriorityChild: (direction: number) => void;
  onChangePreviousInput: (data: string, index: number) => void;
  onUpdateInputArray: (chatTree: Tree) => void;
  onAddNewNode: (data: string) => void;
}

export default function BranchedPrompt({
  data,
  index: indexValue,
  chatTree,
  onChangePriorityChild,
  onUpdateInputArray,
  onChangePreviousInput,
  onAddNewNode,
}: ChatInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(data);
  const [validInput, setValidValue] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const indexVal: number = indexValue;
  const chatTreeVar: Tree = chatTree;
  const textareaRef = useRef(null);

  function changeChildAndRefreshArray(direction: number) {
    if (indexVal === 0) {
      if (chatTreeVar.priorityChild + direction < 0) return;
      if (chatTreeVar.priorityChild + direction > chatTree.children.length - 1)
        return;
      chatTreeVar.priorityChild = chatTreeVar.priorityChild + direction;
      onUpdateInputArray(chatTreeVar);
      setInputValue(chatTreeVar.returnStringArray()[chatTreeVar.priorityChild]);
    } else {
      onChangePriorityChild(direction);
      onUpdateInputArray(chatTreeVar);
      setInputValue(chatTreeVar.returnStringArray()[indexVal]);
    }
  }
  const updateValue = () => {
    setIsEditing(false); // Exit editing mode
    onChangePreviousInput(inputValue, indexVal); // Update the parent component
    // Additional logic if needed
  };
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
    }
  };
  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);
  
  const handlePromptSelection = (value) => {
    setSelectedPrompt(value);
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
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      updateValue();
    } else if (event.key === 'Enter' && event.shiftKey) {
      setTimeout(adjustTextareaHeight, 0);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue.trim() !== '') {
      setInputValue(newValue);
      setValidValue(true);
      adjustTextareaHeight();
    } else {
      setValidValue(false);
    }
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    onChangePreviousInput(inputValue, indexVal);
  };

  return (
    <div className={styles.inputText}>
      {isEditing ? (
        <textarea
          className={styles.edit}
          ref={textareaRef}
          type="data"
          value={inputValue}
          
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          
        />
      ) : (
        <div className={styles.text}>
          {validInput ? (
            <Markdown remarkPlugins={[remarkGfm]}>
              {inputValue}
            </Markdown>
          ) : (
            <p className={styles.errorText}>Input value cannot be empty.</p>
          )}
          
          <div className={styles.chatSection}>
      <div className={styles.promptSelection}>
        <div
          className={`${styles.promptOption} ${
            selectedPrompt === 'prompt1' ? styles.selectedPrompt : ''
          }`}
          onClick={() => handlePromptSelection('prompt1')}
        >
          Prompt 1
        </div>
        <div
          className={`${styles.promptOption} ${
            selectedPrompt === 'prompt2' ? styles.selectedPrompt : ''
          }`}
          onClick={() => handlePromptSelection('prompt2')}
        >
          Prompt 2
        </div>
      </div>
          
          <div className={styles.inputFooter}>
            <button onClick={handleEditButtonClick}>
              <img src="/edit.svg" alt="Change Input" />
            </button>
            {/* Disabled permanently until chat inputs are correctly stored. */}
            {chatTree.children.length > 1 ? (
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
      )}
    </div>
  );
}