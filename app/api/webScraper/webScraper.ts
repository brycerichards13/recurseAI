/**
 * @description Goes to the specified URL and returns an
 * HTML representation of the page as a string.
 *
 * @param url A URL to a website that begins with an valid scheme
 * (e.g., http://, https://).
 *
 * @returns The content of the website as a `Promise<string>`.
 */
export default async function webScraper(url: string): Promise<string> {
  const res = await fetch(url).then(res => res.text());
  return res;
}
