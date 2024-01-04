import React, { useContext, useState, useEffect, useCallback } from 'react';
import styles from './index.module.css';
import { fetchChatData, createChat } from '../../app/api/ChatData/add-chatData';
import { Timestamp } from '@google-cloud/firestore';
import { useSession } from 'next-auth/react';
import { IonIcon } from '@ionic/react';
import { add, chatbox, chatboxOutline, trashOutline  } from 'ionicons/icons';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { deleteChatData } from 'app/api/ChatData/removeChatData';
import FileSVG from '../../public/File.svg';
import DeleteSVG from '../../public/Trash.svg';
import Image from 'next/image';
interface CreateUserRequestBody {
  name: string;
  email: string;
}

interface CreateUserResponseSuccess {
  versionId: string;
}

interface CreateUserResponseError {
  error: string;
}

async function createUser(name: string, email: string): Promise<string | null> {
  try {
    const requestBody: CreateUserRequestBody = { name, email };

    const response = await fetch('/api/dbAccess/endpoint/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData: CreateUserResponseError =
        (await response.json()) as CreateUserResponseError;
      console.error('Error creating user:', errorData.error);
      return null;
    }

    const data: CreateUserResponseSuccess =
      (await response.json()) as CreateUserResponseSuccess;
    return data.versionId;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    return null;
  }
}

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
  messages: Message[];
}

interface User {
  name: string;
  email: string;
  chatHistory: Chat[];
}

type ChatDataResponse =
  | User
  | User[]
  | Chat
  | Chat[]
  | Message
  | Message[]
  | VersionOfMessage
  | VersionOfMessage[]
  | string[]
  | { error: string };

  const Navbar = ({ files, setFiles }) => {
    const { data: session, status } = useSession();
  const router = useRouter();
  const [chatIds, setChatIds] = useState<string[]>([]);
  const [userCreated, setUserCreated] = useState(false);
  const [newUserCreated, setNewUserCreated] = useState(false);

  const searchParams = useSearchParams();
  const currentChatId = searchParams?.get('id');
  const [isDragOver, setIsDragOver] = useState(false);

  const [fileContents, setFileContents] = useState<string[]>([]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
  }, []);

  const handleDragEnter = useCallback((event: React.DragEvent<HTMLTextAreaElement>) => {
    setIsDragOver(true); // Set drag over state to true
  }, []);
  const handleDragLeave = useCallback((event: React.DragEvent<HTMLTextAreaElement>) => {
    setIsDragOver(false); // Set drag over state to false
  }, []);
  const handleDeleteFile = (index) => {
    const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(updatedFiles);
  };
  const handleDrop = useCallback((event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length) {
      const validFiles = Array.from(droppedFiles).filter(file => {
        // List of file extensions considered as plain text
        const textFileExtensions = ['.c', '.cpp', '.py', '.js', '.html', '.css', '.java', '.xml', '.json', '.yaml', '.ini', '.toml', '.txt', '.md', '.sh', '.bat'];
        // Check if file extension is in the list
        const isTextFile = textFileExtensions.some(ext => file.name.endsWith(ext));
        return isTextFile;
      });
      
      setFiles(prevFiles => [...prevFiles, ...validFiles]);
    }
    setIsDragOver(false);
  }, [setFiles]);



  const changeId = (newId: string) => {
    if (searchParams !== null) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('id', newId);

      const searchString = newSearchParams.toString();
      router.push(`/chat/${newId}`);
    } else {
      console.error('Search params is null');
    }
  };

  const isActiveChat = (buttonId: string) => {
    return buttonId === currentChatId;
  };

  // Fetch chatIds when the component mounts or when email changes
  useEffect(() => {
    const fetchChats = async () => {
      if (userCreated && session?.user?.email) {
        try {
          const data: ChatDataResponse = await fetchChatData({
            userId: session?.user?.email,
            getAll: false,
          });
          setChatIds(data as string[]);
        } catch (error) {
          console.error('Error fetching chats:', error);
        }
      }
    };

    fetchChats();
  }, [userCreated]);

  useEffect(() => {
    if (
      status === 'authenticated' &&
      typeof session?.user?.name === 'string' &&
      typeof session?.user?.email === 'string'
    ) {
      createUser(session.user.name, session.user.email)
        .then((versionId) => {
          if (versionId !== null) {
            console.log('User created with Id:', versionId);
            setNewUserCreated(true);
          } else {
            console.log('User accessed successfully');
            setNewUserCreated(false);
          }
          setUserCreated(true);
        })
        .catch((error) => {
          console.error('Error creating user:', error);
        });
    }
  }, [status, session?.user?.name, session?.user?.email]);

  // Handler to create a new chat
  const handleCreateChat = async () => {
    if (session?.user?.email && userCreated) {
      try {
        const response = await createChat(session.user.email);
        const newChatId = response.chatId;

        if (newChatId) {
          setChatIds((prevChatIds) => [...prevChatIds, newChatId]);
          changeId(newChatId); // Navigate to the new chat
        }
      } catch (error) {
        console.error('Error creating new chat:', error);
      }
    }
  };
  /*
  useEffect(() => {
    if (newUserCreated) {
      window.location.reload();
    }
  }, [newUserCreated]);
  */

  const handleDeleteChat = async (chatId) => {
    if (confirm(`Are you sure you want to delete chat ${chatId}?`)) {
      try {
        await deleteChatData(chatId);
        alert(`Chat ${chatId} deleted successfully.`);
        // Remove the deleted chatId from the chatIds array
        setChatIds(chatIds.filter((id) => id !== chatId));
      } catch (error) {
        alert(`Failed to delete chat: ${error.message}`);
      }
    }
  };

  if (status === 'loading' && !userCreated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav className={styles.nav}>
        <button
          className={styles.newChat}
          onClick={() => {
            void handleCreateChat();
          }}
        >
          <span className={styles.button__icon}>
            <IonIcon icon={add} />
          </span>
          <span className={styles.button__text}> New Chat </span>
        </button>

        {chatIds.map((chatId) => (
          <div key={chatId} className={styles.chatItem}>
            <button
              className={`${styles.history} ${
                isActiveChat(chatId) ? styles.active : ''
              }`}
              onClick={() => changeId(chatId)}
            >
              <span className={styles.history_icon}>
                <IonIcon icon={chatboxOutline} />
              </span>

              <span className={styles.history_text}>Chat: {chatId}</span>
            </button>

            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteChat(chatId)}
            >
              <IonIcon icon={trashOutline} />
            </button>
          </div>
        ))}
      </nav>
      <div className={styles.navBox}>
        <div
        className={`${styles.fileArea} ${isDragOver ? styles.dragOver : ''}`}
        id='drop-area'
          onDragOver={handleDragOver} 
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          onDragEnter={handleDragEnter}
          >
          {files.length > 0 ? (
            <div className={styles.buttonContainer}>
              {files.map((file, index) => (
                <button
                className={styles.fileButton}
                key={index}
                onClick={() => handleDeleteFile(index)}
                title={file.name}
                >
                <Image src={FileSVG} width={25} height={25}className={styles.fileIcon} alt="File Icon" />
                <Image src={DeleteSVG} className={styles.deleteIcon} alt="Delete Icon" />
                <span className={styles.fileName} >{file.name}</span>
                <span className={styles.deleteText} >Delete</span>
                </button>
              ))}
            </div>
          ) : (
            'Drag and Drop File'
          )}
          </div>
      </div>
    </div>
  );
};

export default Navbar;
