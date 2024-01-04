import type { NextApiRequest, NextApiResponse } from 'next';
import { addMessageToChat } from 'app/api/dbAccess/messageWrite';

// Define the expected request body type
interface MessageBody {
  author: 'User' | 'AI';
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      const { author } = req.body as MessageBody;
      const chatId = req.query.chatId as string;

      // Validate chatId and author
      if (
        typeof chatId !== 'string' ||
        !(author === 'User' || author === 'AI')
      ) {
        return res.status(400).json({ error: 'Invalid input' });
      }

      const messageId = await addMessageToChat(chatId, author);
      return res.status(200).json({ messageId });
    }

    return res.status(405).end(); // Method Not Allowed
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
