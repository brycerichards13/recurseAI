# Sprint 3
Name: Shashank Bandaru  
GitHub ID: bandarussr  
Group: recurseAI  

### What you planned to do
- Set up a web scraper and a way for the AI to communicate to our program that it wants to search Google and read a website [#45](https://github.com/utk-cs340-fall23/recurseAI/issues/45)
- Hide the "Go back" and "Go forward" buttons when there is nothing to switch between [#28](https://github.com/utk-cs340-fall23/recurseAI/issues/28)

### What you did not do
- Did not create a way for the AI to tell our program that it wants to search Google and read a website

### What problems you encountered
- PaLM AI is very limited in what it can do compared to chatGPT, so I had trouble getting it to follow a specified format of speaking.
- Getting the backward/forward buttons working for chat input when it is edited. Mainly due to the new input not being stored correctly, so it always seems like there is only one chat input.

### Issues you worked on
- [#45](https://github.com/utk-cs340-fall23/recurseAI/issues/45)
- [#28](https://github.com/utk-cs340-fall23/recurseAI/issues/28)

### Files you worked on
- `app/api/webScraper/webScraper.ts`
- `app/api/webScraper/summarize.ts`
- `app/web-test/page.tsx`
- `components/ChatInput/index.tsx`
- `components/ChatResponse/index.tsx`

### What you accomplished
I got a working web scraper complete and have it so that we call the AI separately to summarize the page's HTML content, so we can send it back to the chat AI in a way it can simply understand the content. I also did a small UI element feature where the backward/forward arrows for inputs and responses are only visible if there are multiple.