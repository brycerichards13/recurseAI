import { PalmAiApiWrapper } from 'app/api/aiApiWrapper/PalmAiApiWrapper';
import summarize from 'app/api/webScraper/summarize';
import webScraper from 'app/api/webScraper/webScraper';
import MarkdownContent from 'components/Markdown';

export default async function WebTest() {
  const content = await webScraper(
    'https://www.geeksforgeeks.org/introduction-to-hashing-data-structure-and-algorithm-tutorials/?ref=ghm',
  );
  const summary = await summarize(PalmAiApiWrapper, content);

  return <MarkdownContent>{summary}</MarkdownContent>;
}
