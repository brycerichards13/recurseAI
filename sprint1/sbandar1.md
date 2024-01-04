# Sprint 1
Group: recurseAI  
Name: Shashank Bandaru  
NetID: sbandar1  

### What you planned to do
- Implement backend functions to access LLM API's through a common interface. [#15](https://github.com/utk-cs340-fall23/recurseAI/issues/15)
- Set up the Nextjs project, linters, etc. [#8](https://github.com/utk-cs340-fall23/recurseAI/issues/8)
- Transfer Notion Sprint Board tasks to GitHub. (no related issue)

### What you did not do
Completed my tasks.

### What problems you encountered
- Issues with environment variables and getting the API working initially.

### Issues you worked on
- [#15](https://github.com/utk-cs340-fall23/recurseAI/issues/15)
- [#8](https://github.com/utk-cs340-fall23/recurseAI/issues/8)

### Files you worked on
- `.vscode/settings.json`
- `.vscode/extensions.json`
- `app/api/aiApiWrapper/AiApiWrapper.ts`
- `app/api/aiApiWrapper/PalmAiApiWrapper.ts`
- `app/page.tsx`
- `app/not-found.tsx`
- `.eslintrc.json`
- `.prettierignore`
- `.prettierrc`
- `next.config.js`

### What you accomplished
I added a common interface to access LLM API's so we can get responses from AI. This uses a class based dependency injection method, so all we have to do is switch out the class name when initializing the object to change LLM API's. This allows for more flexibility incase we every need to switch. I implemented the code for Google's PaLM AI API, so we can now send prompts and get responses, along with context and altered saftey settings. I also set up the project using automated tools and manually set up linters.