import { AiApiWrapper } from './AiApiWrapper';
import { DiscussServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

export class PalmAiApiWrapper extends AiApiWrapper {
  private MODEL_NAME = 'models/chat-bison-001';
  private PALMAI_KEY = process.env.PALMAI_KEY || '';
  private TEMPERATURE = 0.5;
  private CANDIDATE_COUNT = 1;
  private client: DiscussServiceClient;

  constructor() {
    super();
    this.client = new DiscussServiceClient({
      authClient: new GoogleAuth().fromAPIKey(this.PALMAI_KEY),
    });
  }

  async prompt(messages: string[]): Promise<string> {
    const normalized_messages = messages.map((msg) => ({ content: msg }));

    const result = await this.client.generateMessage({
      model: this.MODEL_NAME,
      temperature: this.TEMPERATURE,
      candidateCount: this.CANDIDATE_COUNT,
      prompt: {
        messages: normalized_messages,
      },
    });

    return result?.[0]?.candidates?.[0]?.content ?? 'Error generating message.';
  }
}
