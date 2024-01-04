import { getData } from '../getDataFcn';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    if (req.method === 'GET') {
      const { userId, chatId, messageId, versionOfMessageId, getAll } =
        req.query;

      if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
      }

      const data = await getData(
        userId as string,
        chatId as string | null,
        messageId as string | null,
        versionOfMessageId as string | null,
        getAll === 'true',
      );

      res.status(200).json(data);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
