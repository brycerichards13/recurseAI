'use server';
import { PalmAiApiWrapper } from 'app/api/aiApiWrapper/PalmAiApiWrapper';
import summarize from 'app/api/webScraper/summarize';
import webScraper from 'app/api/webScraper/webScraper';

export async function fetchData(inputData: string[]) {
  console.log(
    '--------------------------------------------------------------------------------------------',
  );
  console.log('INPUT DATA: ', inputData);
  const x = new PalmAiApiWrapper();
  const res = await x.prompt(inputData);
  console.log(res);
  return res;
  // add data to database for regeneration and selecting point of entry for prompts
}

export async function summarizeURL(url: string): Promise<string> {
  const content = await webScraper(url);
  const summary = await summarize(PalmAiApiWrapper, content);
  return summary;
}
