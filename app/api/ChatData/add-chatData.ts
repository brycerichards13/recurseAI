type ChatResponse = {
  chatId?: string;
  message?: string;
  error?: string;
};

async function createChat(userId: string): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/dbAccess/endpoint/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to create chat');
    }

    return (await response.json()) as ChatResponse;
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
}

type MessageResponse = {
  messageId?: string;
  error?: string;
};

async function addMessage(
  chatId: string,
  author: 'User' | 'AI',
): Promise<MessageResponse> {
  try {
    const response = await fetch(
      `/api/dbAccess/endpoint/message?chatId=${chatId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to add message');
    }

    return (await response.json()) as MessageResponse;
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
}

type VersionResponse = {
  versionId?: string;
  error?: string;
};

async function addVersion(
  messageId: string,
  content: string,
): Promise<VersionResponse> {
  try {
    const response = await fetch('/api/dbAccess/endpoint/version', {
      // Ensure the path is correct based on your setup
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messageId, content }),
    });

    if (!response.ok) {
      throw new Error('Failed to add version to message');
    }

    return (await response.json()) as VersionResponse;
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
}

import { Timestamp } from '@google-cloud/firestore';

interface VersionOfMessage {
  sentTime: Timestamp;
  content: string;
}

interface Message {
  author: 'User' | 'AI';
  versionsOfMessages: VersionOfMessage[];
}

interface Chat {
  dateCreated: Timestamp;
  lastUsedDate: Timestamp;
  messages: Message[];
}

interface User {
  name: string;
  email: string;
  chatHistory: Chat[];
  projectHistory: string[];
}

type DataResponse =
  | User
  | User[]
  | Chat
  | Chat[]
  | Message
  | Message[]
  | VersionOfMessage
  | VersionOfMessage[]
  | string[]
  | { error: string };

interface GetDataOptions {
  userId?: string;
  chatId?: string;
  messageId?: string;
  versionOfMessageId?: string;
  getAll: boolean;
}

async function fetchChatData(options: GetDataOptions): Promise<DataResponse> {
  try {
    const { userId, chatId, messageId, versionOfMessageId, getAll } = options;

    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (chatId) params.append('chatId', chatId);
    if (messageId) params.append('messageId', messageId);
    if (versionOfMessageId)
      params.append('versionOfMessageId', versionOfMessageId);
    if (getAll) params.append('getAll', 'true');

    const response = await fetch(
      `/api/dbAccess/endpoint/getData?${params.toString()}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return (await response.json()) as DataResponse;
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: 'An unexpected error occurred' };
    }
  }
}

async function fetchDataByIndex(
  index: number,
  userId: string,
  chatId: string,
  messageId: string,
): Promise<DataResponse> {
  // Base URL for the dataIndex endpoint
  const baseUrl = '/api/dbAccess/endpoint/getDataIndex';

  // Create the query parameters
  const params = new URLSearchParams({
    index: index.toString(), // Convert index to string as URLSearchParams expects string values
  });

  // Add optional parameters if they are provided
  if (userId) params.append('userId', userId);
  if (chatId) params.append('chatId', chatId);
  if (messageId) params.append('messageId', messageId);

  try {
    const response = await fetch(`${baseUrl}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as DataResponse;

    console.log('Data fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export { createChat, addMessage, addVersion, fetchChatData, fetchDataByIndex };
