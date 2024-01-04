// pages/api/dataIndex.js

import { NextApiRequest, NextApiResponse } from 'next';
import getDataIndex from '../../../../app/api/ChatData/getByIndex';

// Handler for the API endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const { index, userId, chatId, messageId } = req.query;

      if (index === undefined) {
        res.status(400).json({ error: 'Index is required' });
        return;
      }

      // Convert index to number
      const indexNumber = parseInt(index as string, 10);
      if (isNaN(indexNumber)) {
        res.status(400).json({ error: 'Invalid index provided' });
        return;
      }

      const data = await getDataIndex(
        indexNumber,
        userId as string | undefined,
        chatId as string | undefined,
        messageId as string | undefined,
      );

      // If there's no data, return 404 (Not Found)
      if (!data) {
        res.status(404).json({ error: 'Data not found' });
        return;
      }
      res.status(200).json(data);
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
