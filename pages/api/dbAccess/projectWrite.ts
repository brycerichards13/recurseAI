import firestore from './Firestore';
import { Timestamp, FieldValue } from '@google-cloud/firestore';

interface ProjectData {
  dateCreated: Timestamp;
  lastUsedDate: Timestamp;
  chats: string[];
}

async function createNewProject(userId: string): Promise<string> {
  const projectData: ProjectData = {
    dateCreated: Timestamp.now(),
    lastUsedDate: Timestamp.now(),
    chats: [],
  };

  const projectRef = await firestore.collection('projects').add(projectData);

  await firestore
    .collection('users')
    .doc(userId)
    .update({
      projectHistory: FieldValue.arrayUnion(projectRef.id),
    });
  return projectRef.id; // Returns the ID of the newly created project.
}

export { createNewProject };
