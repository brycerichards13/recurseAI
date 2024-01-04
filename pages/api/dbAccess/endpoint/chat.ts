import { NextApiRequest, NextApiResponse } from 'next';
import { createNewChat } from '../chatWrite';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    if (req.method === 'POST') {
      const { userId } = req.body as { userId: string };
      const chatId = await createNewChat(userId);
      res.status(200).json({ chatId });
    } else if (req.method === 'GET') {
      res.status(200).json({ message: 'Chat API Endpoint' });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
