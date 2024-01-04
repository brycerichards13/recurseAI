import firestore from './Firestore';
import { Timestamp } from '@google-cloud/firestore';

interface User {
  name: string;
  email: string;
  chatHistory: string[];
  projectHistory: string[];
}

interface ProjectData {
  dateCreated: Timestamp;
  lastUsedDate: Timestamp;
  chats: string[];
}

const db = firestore;
const usersRef = db.collection('users');
const projectsRef = db.collection('projects');

async function getProjectsList(userId: string): Promise<string[]> {
  const userDoc = await usersRef.doc(userId).get();
  const user = userDoc.data() as User;
  const projects = user.projectHistory;

  return projects;
}

async function getProjectChatsList(projectId: string): Promise<string[]> {
  const projectDoc = await projectsRef.doc(projectId).get();
  const project = projectDoc.data() as ProjectData;
  const chats = project.chats;

  return chats;
}

export { getProjectsList, getProjectChatsList };
