import type { NextApiRequest, NextApiResponse } from 'next';
import { getProjectChatsList } from '../getProjects';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      // Extract projectId from the query parameters
      const projectId = req.query.projectId as string;

      // Validate projectId
      if (!projectId) {
        return res.status(400).json({ error: 'ProjectId is required' });
      }

      // Retrieve the chat list for the project
      const chats = await getProjectChatsList(projectId);

      // Send the chats as a response
      return res.status(200).json({ chats });
    } else {
      // If not a GET request, return a 405 Method Not Allowed
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
