# Sprint 3

Name: Bryce Richards
GitHub ID: brycerichards13
Group: recurseAI

### What you planned to do

- Add the project page to allow for people to input their goals, edit the goal, and add tasks
- Manipulate the prompt in the project page so the LLM responds in a manner that can be parsed and splits goals
- Add a recurse button which inputs the LLM's response back into itself

### What you did not do

- Make the button to add subtasks functional
- Remove the extra prompt manipulation in the recurse functionality

### What problems you encountered

- The LLM were using (PaLM) is free, at the expense that it does not follow instructions properly, so designing a prompt that will follow a parsable format was very difficult
- Another problem was designing the prompt manipulation to respond to prompts about tasks, while denying tasks not pertaining to prompts

### Issues you worked on

- [#55](https://github.com/utk-cs340-fall23/recurseAI/issues/55)
- [#56](https://github.com/utk-cs340-fall23/recurseAI/issues/56)
- [#57](https://github.com/utk-cs340-fall23/recurseAI/issues/57)

### Files you worked on

- `/components/ChatBox/index.tsx`
- `/components/ChatInput/index.tsx`
- `/components/ChatResponse/index.tsx`
- `/components/ProjectPrompts/index.tsx`
- `/app/project/page.module.css`
- `/app/project/page.tsx`
- `/components/ChatInput/index.tsx`
- `/components/ChatResponse/index.tsx`
- `/components/ProjectPrompt/index.tsx`
- `/components/ProjectPrompts/index.tsx`
- `/components/ProjectPrompts/projectPrompts.module.css`
- `/lib/project-prompt.ts`
- `/lib/recurse-prompt.ts`

### What you accomplished

I added the project page which allows for the user to input a large goal, which then breaks down the goal into smaller sub goals. The user can change also change the goal, and regenerate the response it provides. I also added the ability to recurse on the responses and inputs.
