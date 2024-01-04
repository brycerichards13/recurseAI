import firestore from 'app/api/dbAccess/Firestore';
import { Timestamp, FieldValue } from '@google-cloud/firestore';

async function addVersionToMessage(
  messageId: string,
  content: string,
): Promise<string> {
  const versionData = {
    sentTime: Timestamp.now(),
    content: content,
  };

  const versionRef = await firestore
    .collection('versionsOfMessages')
    .add(versionData);

  await firestore
    .collection('messages')
    .doc(messageId)
    .update({
      versionsOfMessages: FieldValue.arrayUnion(versionRef.id),
    });

  return versionRef.id; // Returns the ID of the newly added version.
}

export { addVersionToMessage };
