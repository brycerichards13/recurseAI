import type { NextApiRequest, NextApiResponse } from 'next';
import { getProjectsList } from '../getProjects';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      // Extract userId from query string
      const userId = req.query.userId as string;

      // Validate userId
      if (!userId) {
        return res.status(400).json({ error: 'UserId is required' });
      }

      // Retrieve the projects
      const projects = await getProjectsList(userId);

      // Send the projects as a response
      return res.status(200).json({ projects });
    } else {
      // If not a GET request, return a 405 Method Not Allowed
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
