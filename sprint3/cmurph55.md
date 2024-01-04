# Sprint 3

Group: recurseAI  
Name: Connor Murphy
GitHubID: EarlTheUnicorn

### What you planned to do

- Read and write messages and versionsOfMessage based on current chat. [#39](https://github.com/utk-cs340-fall23/recurseAI/issues/39)
- Create function and endpoint for reading messages and versions of messages at a certain index. [#53](https://github.com/utk-cs340-fall23/recurseAI/issues/53)
- Allow chat history to work with all branches of the chat tree. [#54](https://github.com/utk-cs340-fall23/recurseAI/issues/54)

### What you did not do

I was unable to finish issue 54 because I got very bogged down with the chat history. I also did not have time to fix a few circumstantial errors with the chat history.

### What problems you encountered

- I got an extremely misleading error with the chat history, which sent me on a wild goose chase for 3 days.

### Issues you worked on

- [#39](https://github.com/utk-cs340-fall23/recurseAI/issues/39)
- [#53](https://github.com/utk-cs340-fall23/recurseAI/issues/53)
- [#54](https://github.com/utk-cs340-fall23/recurseAI/issues/54)

### Files you worked on

- ./app/components/ChatPageNavbar/index.tsx
- ./pages/api/dbAccess/getDataFcn.ts
- ./pages/api/dbAccess/endpoint/getData.ts
- ./pages/api/dbAccess/endpoint/getDataIndex.ts
- ./app/chat/page.tsx

### What you accomplished

I created the backend scripts for reading messages and versions of messages at a certain index. I then created the GET function for the data at the index. After that, I made the chat box store and post the chats. Last, I started to set up the history to read from different branches of the chat tree.
