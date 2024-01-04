import type { NextApiRequest, NextApiResponse } from 'next';
import { createNewUser } from '../userWrite';

interface UserBody {
  name: string;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      // Validate and cast the request body
      const { name, email } = req.body as UserBody;

      // Basic input validation
      if (typeof name !== 'string' || typeof email !== 'string') {
        return res.status(400).json({ error: 'Invalid input' });
      }

      const versionId = await createNewUser(name, email);
      return res.status(200).json({ versionId });
    }

    return res.status(405).end(); // Method Not Allowed
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
