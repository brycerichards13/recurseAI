import firestore from './Firestore';
import { Timestamp, FieldValue } from '@google-cloud/firestore';

interface VersionOfMessage {
  sentTime: Timestamp;
  content: string;
}

interface Message {
  author: 'User' | 'AI';
  versionsOfMessage: string[];
}

interface Chat {
  dateCreated: Timestamp;
  lastUsedDate: Timestamp;
  messages: string[];
}

interface User {
  name: string;
  email: string;
  chatHistory: Chat[];
  projectHistory: string[];
}

// Firestore references
const db = firestore;
const usersRef = db.collection('users');
const chatsRef = db.collection('chats');
const messagesRef = db.collection('messages');
const versionsOfMessagesRef = db.collection('versionsOfMessage');

async function getData(
  userId: string | null,
  chatId: string | null,
  messageId: string | null,
  versionOfMessageId: string | null,
  getAll: boolean,
): Promise<
  | User
  | User[]
  | Chat
  | Chat[]
  | Message
  | Message[]
  | VersionOfMessage
  | VersionOfMessage[]
  | string[]
  | null
> {
  // Start with User
  if (userId && !chatId && !messageId && !versionOfMessageId) {
    const userDoc = await usersRef.doc(userId).get();
    if (getAll) {
      return userDoc.exists ? (userDoc.data() as User) : null;
    } else {
      // If not getting all, then only return chatHistory
      return userDoc.exists ? (userDoc.data() as User).chatHistory : null;
    }
  }

  // Proceed to Chat
  else if (chatId && !messageId && !versionOfMessageId) {
    const chatDoc = await chatsRef.doc(chatId).get();
    if (getAll) {
      return chatDoc.exists ? (chatDoc.data() as Chat) : null;
    } else {
      // If not getting all, then only return messages
      return chatDoc.exists ? (chatDoc.data() as Chat).messages : null;
    }
  }

  // Proceed to Message
  else if (messageId && !versionOfMessageId) {
    const messageDoc = await messagesRef.doc(messageId).get();
    if (getAll) {
      return messageDoc.exists ? (messageDoc.data() as Message) : null;
    } else {
      // If not getting all, then only return versionsOfMessages
      return messageDoc.exists
        ? (messageDoc.data() as Message).versionsOfMessage
        : null;
    }
  }

  // Proceed to VersionOfMessage
  else if (versionOfMessageId) {
    const versionDoc = await versionsOfMessagesRef
      .doc(versionOfMessageId)
      .get();
    return versionDoc.exists ? (versionDoc.data() as VersionOfMessage) : null;
  }

  return null; // If none of the conditions met
}

export { getData };
