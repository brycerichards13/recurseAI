import firestore from 'app/api/dbAccess/Firestore';
import { Timestamp, FieldValue } from '@google-cloud/firestore';

interface MessageData {
  author: 'User' | 'AI';
  versionsOfMessages: VersionOfMessage[];
}

interface VersionOfMessage {
  sentTime: Timestamp;
  content: string;
}

async function addMessageToChat(
  chatId: string,
  author: 'User' | 'AI',
): Promise<string> {
  const messageData: MessageData = {
    author: author,
    versionsOfMessages: [],
  };

  const messageRef = await firestore.collection('messages').add(messageData);

  await firestore
    .collection('chats')
    .doc(chatId)
    .update({
      messages: FieldValue.arrayUnion(messageRef.id),
      lastUsedDate: Timestamp.now(),
    });

  return messageRef.id;
}

export { addMessageToChat };
