// Import Next.js types
import type { NextApiRequest, NextApiResponse } from 'next';
import { addVersionToMessage } from 'app/api/dbAccess/versionWrite'; // Adjust path as needed

// Define the expected request body type
interface VersionBody {
  messageId: string;
  content: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      // Validate and cast the request body
      const { messageId, content } = req.body as VersionBody;

      // Basic input validation
      if (typeof messageId !== 'string' || typeof content !== 'string') {
        return res.status(400).json({ error: 'Invalid input' });
      }

      const versionId = await addVersionToMessage(messageId, content);
      return res.status(200).json({ versionId });
    }

    return res.status(405).end(); // Method Not Allowed
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
