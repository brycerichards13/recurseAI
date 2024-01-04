import firestore from './Firestore';
import { Timestamp } from '@google-cloud/firestore';

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
  projectHistory: string[];
}

async function createNewUser(
  name: string,
  email: string,
): Promise<string | null> {
  const usersCollection = firestore.collection('users');

  // Check if a user with the given email already exists
  const userDocRef = usersCollection.doc(email);
  const userSnapshot = await userDocRef.get();

  if (userSnapshot.exists) {
    // User with this email already exists
    return null;
  }

  const user: User = {
    name: name,
    email: email,
    chatHistory: [],
  };

  // Add the new user using the email as the document ID
  await userDocRef.set(user);
  return email; // Returns the email of the newly created user.
}

export { createNewUser };
