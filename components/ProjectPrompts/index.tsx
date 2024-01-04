// React components
import { useState, useEffect } from 'react';
import { fetchData } from 'app/api/fetch-data';
import { addMessage, addVersion } from 'app/api/ChatData/add-chatData';

// Components
import ChatInput from 'components/ChatInput';
import ChatResponse from 'components/ChatResponse';
import { IonIcon } from '@ionic/react';
import { refresh } from 'ionicons/icons';
import { arrowDown } from 'ionicons/icons';
import ProjectPrompt from 'components/ProjectPrompt';

// Data
import { projectPromptText } from 'lib/project-prompt';

// CSS
import styles from '../ProjectPrompts/projectprompts.module.css';

interface ResponseData {
  title: string;
  actions: Array<{
    action: string;
    details: string;
  }>;
}

export default function ChatBox() {
  'use client';

  const [inputValue, setInputValue] = useState<string>('');
  const [inputArray, setInputArray] = useState<string[]>([]);
  const [inputStringNoExtra, setInputStringNoExtra] = useState<string>('');
  const [chainArray, setChainArray] = useState<string[]>([]);
  const [titleValue, setTitle] = useState<string>('');
  const [emptyProjectBool, setEmptyProjectBool] = useState<boolean>(true);
  const [addGoalBool, setAddGoalBool] = useState<boolean>(false);
  const [detailArray, setDetailArray] = useState<string[]>([]);
  const [loadingBool, setLoadingBool] = useState<boolean>(false);

  function regenerateResponse() {
    fetchData([inputArray[0]])
      .then((res) => {
        const result = interpretResponse(res);
        setTitle(result.title);
        setChainArray(result.actions.map((action) => action.action));
        setDetailArray(result.actions.map((actionItem) => actionItem.details));
        setEmptyProjectBool(false);
      })
      .catch((error) => {
        console.error('API Request Error: ', error);
      });
  }

  function addNewChain() {}

  function extractJSON(input: string): string {
    const jsonRegex = /\{[\s\S]*\}/;
    const match = input.match(jsonRegex);
    if (match) {
      return match[0];
    } else {
      throw new Error('No JSON found in the input');
    }
  }

  function interpretResponse(input: string): ResponseData {
    const JSONdata = extractJSON(input);
    try {
      const data: ResponseData = JSON.parse(JSONdata);
      if (!data.title || !Array.isArray(data.actions)) {
        throw new Error('JSON does not have the expected format.');
      }
      console.log(data);
      return data;
    } catch (e) {
      throw new Error('Invalid JSON data.');
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();

      setLoadingBool(true);
      if (inputValue.trim() !== '') {
        // Add the extra prompt instructions to get objectives out of the input
        // This might not be secure \/ \/
        const inputPrompt: string = `${projectPromptText}"${inputValue}"`;
        const updatedInputArray: string[] = [inputPrompt];

        fetchData(updatedInputArray)
          .then((res) => {
            const result = interpretResponse(res);
            setTitle(result.title);
            setInputArray(updatedInputArray);
            setInputStringNoExtra(inputValue);
            setChainArray(result.actions.map((action) => action.action));
            setDetailArray(
              result.actions.map((actionItem) => actionItem.details),
            );
            setEmptyProjectBool(false);
            setLoadingBool(false);
          })
          .catch((error) => {
            console.error('API Request Error: ', error);
          });
        setInputValue('');
      } else {
      }
    }
  }

  // Function for changing the whether or not the input box appears, and changing the add button
  function handleChangeInputClick() {
    setEmptyProjectBool(true);
    setInputValue(inputStringNoExtra);
  }

  function handleAddGoalClick() {
    setAddGoalBool(true);
  }

  useEffect(() => {
    const className = styles.animateUpElement;
    console.log('className: ', className);
    const elements = document.querySelectorAll(`.${className}`);

    elements.forEach((elem, index) => {
      setTimeout(() => {
        // Add the class from your CSS module
        elem.classList.add(styles.revealUp);
      }, 300 * index);
    });
  }, []);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h2 className={styles.title}>{titleValue}</h2>
        <button style={{ marginLeft: 'auto', cursor: 'pointer' }}>
          <img src="/settings_icon.svg" alt="settings" />
        </button>
      </header>

      {emptyProjectBool === true && loadingBool == false ? (
        <div className={styles.centerGuidingText}>
          <div style={{ overflowY: 'hidden' }}>
            <h1 className={styles.animateUpElement}> Create a project</h1>
          </div>
          <div style={{ overflowY: 'hidden' }}>
            <h3 className={styles.animateUpElement}>One step at a time...</h3>
          </div>
        </div>
      ) : null}

      {/* Loading Animation */}
      {loadingBool === true ? (
        <div className={styles.loader}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : null}

      <footer className={styles.footer}>
        {loadingBool === true ? null : emptyProjectBool === true ? (
          <form action={fetchData}>
            <input
              className={styles.textBox}
              onKeyDown={handleKeyDown}
              type={'data'}
              value={inputValue}
              placeholder="Enter your idea here..."
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        ) : (
          <div>
            <button
              type="button"
              className={styles.button}
              onClick={() => regenerateResponse()}
            >
              <span className={styles.button__text}>Regenerate</span>
              <span className={styles.button__icon}>
                <IonIcon icon={refresh} />
              </span>
            </button>

            <button onClick={handleChangeInputClick}>
              Change Project Input
            </button>
          </div>
        )}
      </footer>

      <main className={styles.container}>
        {chainArray.map((message, index) => {
          const detailString: string = detailArray.at(index) || '';
          return (
            <ProjectPrompt
              key={index || 0}
              data={message || ''}
              detail={detailString}
            />
          );
        })}
      </main>
      {emptyProjectBool === true ? null : addGoalBool === true ? ( // True
        <input></input>
      ) : (
        // True
        <button onClick={handleAddGoalClick}>Add</button>
      )}
    </div>
  );
}
