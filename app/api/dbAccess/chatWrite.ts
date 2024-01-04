import firestore from 'app/api/dbAccess/Firestore';
import { Timestamp } from '@google-cloud/firestore';

interface VersionOfMessage {
  sentTime: Timestamp;
  content: string;
}

interface Message {
  author: 'User' | 'AI';
  versionsOfMessages: VersionOfMessage[];
}

interface ChatData {
  dateCreated: Timestamp;
  lastUsedDate: Timestamp;
  messages: Message[];
}

async function createNewChat(): Promise<string> {
  const chatData: ChatData = {
    dateCreated: Timestamp.now(),
    lastUsedDate: Timestamp.now(),
    messages: [],
  };

  const chatRef = await firestore.collection('chats').add(chatData);
  return chatRef.id; // Returns the ID of the newly created chat.
}

export { createNewChat };
