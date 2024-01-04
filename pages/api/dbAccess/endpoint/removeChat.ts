// pages/api/deleteChat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteChat } from '../deleteChat';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'DELETE') {
      // Extract chatId from the query parameters
      const chatId = req.query.chatId as string;

      // Validate chatId
      if (!chatId) {
        return res.status(400).json({ error: 'ChatId is required' });
      }

      // Delete the chat
      await deleteChat(chatId);

      // Send a confirmation response
      return res
        .status(200)
        .json({ message: `Chat with ID ${chatId} has been deleted.` });
    } else {
      // If not a DELETE request, return a 405 Method Not Allowed
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
