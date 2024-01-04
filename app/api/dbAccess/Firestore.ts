import { Firestore } from '@google-cloud/firestore';

const firestore = new Firestore({
  projectId: 'recurseai-b9e9c',
  keyFilename:
    '../topSecret/recurseai-firebase-admin.json',
});

export default firestore;
