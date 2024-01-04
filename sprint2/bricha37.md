# Sprint 2

Name: Bryce Richards
GitHub ID: brycerichards13  
Group: recurseAI

### What you planned to do

- Fix the component structure to split up the inputs and outputs into different components
- Add a regenerate response button
- Add the ability to change previous inputs and have it affect the whole chat chain
- Add functionality for switching back and forth between regenerated responses, and changed inputs as a tree
- Change user input to optimize for reinputting the response back into the AI

### What you did not do

- Change user input to optimize for reinputting the response back into the AI

### What problems you encountered

I encountered a problem around 2 days before the sprint was due where I couldn't use the website at all. This is due to the chat history feature being added and authentication not working for just me in particular. We are still trying to figure out the cause of this, but it has been really frustrating because I am not able to work on the project. However most of what I wanted to get done was completed, as I had been working on the project over the past two weeks anyway and my team mates have helped troubleshoot.

### Issues you worked on

- [#1](https://github.com/utk-cs340-fall23/recurseAI/issues/40)
- [#2](https://github.com/utk-cs340-fall23/recurseAI/issues/41)
- [#3](https://github.com/utk-cs340-fall23/recurseAI/issues/42)
- [#4](https://github.com/utk-cs340-fall23/recurseAI/issues/43)

### Files you worked on

- `app/page.tsx`
- `components/ChatBox/index.tsx`
- `components/ChatInput/index.tsx`
- `components/ChatResponse/index.tsx`
- `lib/tree-datastructure.ts`

### What you accomplished

The first thing I accomplished was changing the component structure of the chat page. Before, the whole user input and response conversation was put into a single component which was just a single paragraph element, and all of the text inside. I separated the user input and the AI's response to be two different types of components. Then I implemented a regenerate response function which would delete the old output, regenerate the response, and then output the new response. Next I added the change user input, which allows a user to go anywhere in the chat and change their input, which removes everything after the edited input, and then generates a response. Lastly I added the ability to go back and forth between different changed user inputs and different regenerated responses. I implemented a custom tree data structure to allow for users to switch between different branches of the conversation, so the regenerated responses and changed inputs are persistent and can be viewed again instead of being wiped away after changing or regenerating.
