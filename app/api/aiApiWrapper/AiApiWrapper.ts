export abstract class AiApiWrapper {
  abstract prompt(messages: string[]): Promise<string>;
}
