import firestore from './Firestore';
import { FieldValue } from '@google-cloud/firestore';

async function deleteChat(chatId: string): Promise<void> {
  try {
    // Reference to the chat document in the Firestore 'chats' collection
    const chatRef = firestore.collection('chats').doc(chatId);

    // Delete the chat document
    await chatRef.delete();
    console.log(`Chat with ID ${chatId} has been deleted.`);

    // Reference to the users collection
    const usersRef = firestore.collection('users');

    // Get all users who have the chatId in their chatHistory
    const snapshot = await usersRef
      .where('chatHistory', 'array-contains', chatId)
      .get();

    // Remove the chatId from each user's chatHistory
    snapshot.forEach(async (doc) => {
      await usersRef.doc(doc.id).update({
        chatHistory: FieldValue.arrayRemove(chatId),
      });
      console.log(
        `Chat ID ${chatId} removed from user ${doc.id}'s chatHistory.`,
      );
    });
  } catch (error) {
    console.error(`Error deleting chat with ID ${chatId}:`, error);
    throw error;
  }
}

export { deleteChat };
