import { AiApiWrapper } from 'app/api/aiApiWrapper/AiApiWrapper';
import * as cheerio from 'cheerio';

/**
 * @description Summarizes any content given the content as a string.
 *
 * @param aiWrapper An AiApiWrapper class.
 * @param content Content to summarize.
 * @returns A summary of the content as a `Promise<string>`.
 */
export default async function summarize(
  aiWrapper: new () => AiApiWrapper,
  content: string,
): Promise<string> {
  const ai = new aiWrapper();

  // Create prompt and shorten the prompt
  const prompt =
    'Summarize the content of following HTML page. Do not mention anything about the HTML or how the page is formatted.\n';
  const normalized_content = prompt + normalizeContent(content);
  const shortened_content = shortenContent(normalized_content, 15000); // Max AI can handle is 20k bytes for payload.

  // Summarize using AI
  const res = await ai.prompt([shortened_content]);
  return res;
}

/**
 * @description Normalizes HTML content by removing any non-text content.
 *
 * @param content Content to normalize.
 * @returns Normalized content as a `string`.
 */
function normalizeContent(content: string): string {
  let normalized_content;
  const $ = cheerio.load(content);

  // Remove any HTML tags that are not text content.
  $('script').remove();
  $('img').remove();
  normalized_content = $.root().text();

  // Remove excessive whitespace (eats up token count).
  normalized_content = normalized_content.replace(/\s+/g, ' ');

  return normalized_content;
}

/**
 * @description Shortens content to max_size an AI's API can handle.
 * Substring cannot be used as Unicode characters have variable byte sizes.
 *
 * @param content Content to be shortened.
 * @param max_size Maximum number of bytes in resulting string.
 * @returns Shortened content as a `string`.
 */
function shortenContent(content: string, max_size: number): string {
  let shortened_content = '';
  const encoder = new TextEncoder();

  for (const char of content) {
    const size = encoder.encode(shortened_content + char).length;
    if (size > max_size) break;

    shortened_content += char;
  }

  return shortened_content;
}
