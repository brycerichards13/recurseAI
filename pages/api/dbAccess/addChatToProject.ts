import firestore from './Firestore';
import { Timestamp, FieldValue } from '@google-cloud/firestore';

interface ChatData {
  dateCreated: Timestamp;
  lastUsedDate: Timestamp;
  messages: string[];
}

async function addChatToProject(projectId: string): Promise<string> {
  const chatData: ChatData = {
    dateCreated: Timestamp.now(),
    lastUsedDate: Timestamp.now(),
    messages: [],
  };

  const chatRef = await firestore.collection('chats').add(chatData);

  await firestore
    .collection('projects')
    .doc(projectId)
    .update({
      chats: FieldValue.arrayUnion(chatRef.id),
    });
  return chatRef.id; // Returns the ID of the newly created chat.
}

export { addChatToProject };
