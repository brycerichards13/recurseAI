# Sprint 1

Bryce Richards | bricha37 | RecurseAI

### What you planned to do

- I planned to first create a very basic text box where a user can input text and and press enter to clear it.
- Then I planned to take the text in the box and send it the PaLM api, wait for a response, and update the internal data.
- Finally I planned on taking the internal data and displaying it so the user could see.

### What you did not do

- I didn't add full prompt chains so the AI only works with one request at a time.

### What problems you encountered

- Passing data between components
- Use state functions to correctly handle new information
- Correctly using an asynchronous server function in a client side React component.

### Issues you worked on

[#6](https://github.com/utk-cs340-fall23/recurseAI/issues/6)\
[#7](https://github.com/utk-cs340-fall23/recurseAI/issues/7)\
[#20](https://github.com/utk-cs340-fall23/recurseAI/issues/20)

### Files you worked on

- `app/chat_page/page.module.css`
- `app/chat_page/page.tsx`
- `app/page.tsx`
- `components/chat-box.tsx`
- `components/chat-input.tsx`
- `components/fetch-data.ts`
- `next.config.js`

### What you accomplished

First I set up the components page and also the start of the components to be used for the chat page. Next, I created a very basic text
box where the user could input text and press enter to clear it. After that, I added functionality to update TypeScript variables when the
user input text into the textbox. Then I created a server side asynchronous function that sent the user's input to the PaLM API and awaited a response.
After receiving the response from the API, I added the ability for the server to render it to the users screen.
