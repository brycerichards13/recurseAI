import type { NextApiRequest, NextApiResponse } from 'next';
import { createNewProject } from '../projectWrite';

interface CreateProjectRequestBody {
  userId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      // Destructure and cast the request body
      const { userId } = req.body as CreateProjectRequestBody;

      // Validate userId
      if (typeof userId !== 'string') {
        return res.status(400).json({ error: 'UserId must be a string' });
      }

      // Create a new project
      const projectId = await createNewProject(userId);

      // Send the projectId as a response
      return res.status(200).json({ projectId });
    } else {
      // If not a POST request, return a 405 Method Not Allowed
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
