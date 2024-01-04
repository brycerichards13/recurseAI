import { Timestamp } from '@google-cloud/firestore';
import firestore from '../dbAccess/Firestore';

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

const db = firestore;

async function getDataIndex(
  index: number,
  userId?: string,
  chatId?: string,
  messageId?: string,
): Promise<Chat | Message | VersionOfMessage | null> {
  try {
    if (userId) {
      // Fetch the chat ID at the specified index
      const userDoc = await db.collection('users').doc(userId).get();
      const userData = userDoc.data();
      const chatRefId = userData?.chats[index];
      if (!chatRefId) {
        throw new Error('Chat ID not found at the specified index.');
      }
      // Fetch the actual Chat document
      const chatDoc = await db.collection('chats').doc(chatRefId).get();
      return chatDoc.data() as Chat;
    } else if (chatId) {
      // Fetch the message ID at the specified index
      const chatDoc = await db.collection('chats').doc(chatId).get();
      const chatData = chatDoc.data();
      const messageRefId = chatData?.messages[index];
      if (!messageRefId) {
        throw new Error('Message ID not found at the specified index.');
      }
      // Fetch the actual Message document
      const messageDoc = await db
        .collection('messages')
        .doc(messageRefId)
        .get();
      return messageDoc.data() as Message;
    } else if (messageId) {
      // Fetch the versionOfMessage ID at the specified index
      const messageDoc = await db.collection('messages').doc(messageId).get();
      const messageData = messageDoc.data();
      const versionRefId = messageData?.versionsOfMessage[index];
      if (!versionRefId) {
        throw new Error(
          'VersionOfMessage ID not found at the specified index.',
        );
      }
      // Fetch the actual VersionOfMessage document
      const versionDoc = await db
        .collection('versionsOfMessage')
        .doc(versionRefId)
        .get();
      return versionDoc.data() as VersionOfMessage;
    }
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
    throw error;
  }
  return null;
}

export default getDataIndex;
