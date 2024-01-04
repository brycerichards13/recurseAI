import type { NextApiRequest, NextApiResponse } from 'next';
import { addChatToProject } from '../addChatToProject';

// Define the expected request body type
interface AddChatRequestBody {
  projectId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      // Destructure and cast the request body
      const { projectId } = req.body as AddChatRequestBody;

      // Validate projectId
      if (!projectId) {
        return res.status(400).json({ error: 'ProjectId is required' });
      }

      // Add a chat to the project
      const chatId = await addChatToProject(projectId);

      // Send the chatId as a response
      return res.status(200).json({ chatId });
    } else {
      // If not a POST request, return a 405 Method Not Allowed
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
