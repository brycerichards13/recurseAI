# Sprint 3
Jason Choi
Jchoi1
RecurseAI

### What you planned to do
- [#50](https://github.com/utk-cs340-fall23/recurseAI/issues/50)
    - Formating Chat Boxes and the Buttons within the boxes
- [#51](https://github.com/utk-cs340-fall23/recurseAI/issues/51)
    - Organized the project folders/files relating to the Chat Page
- [#52](https://github.com/utk-cs340-fall23/recurseAI/issues/52)
    - Developing a better User Input Box on the Chat Page

### What you did not do
- completed everything that I expected myself to do.

### What problems you encountered
- Odd css/html formatting that I couldn't figure out how to fix. for example, the user text box should have been vertically slimmer than what it is now but for some reason I couldn't figure out how to slim it down to a default in time.

### Issues you worked on
- [Formatting Chat Boxes and buttons](https://github.com/utk-cs340-fall23/recurseAI/issues/50)
- [Restructuring/Organizing Project Folders](https://github.com/utk-cs340-fall23/recurseAI/issues/51)
- [Chat Page User Input Box](https://github.com/utk-cs340-fall23/recurseAI/issues/52)


### Files you worked on
- recurseAI
    - components
        - ChatBox
            - chatbox.module.css
            - index.tsx
        - ChatInput
            - chatinput.module.css
            - index.tsx
        - ChatResponse
            - chatresponse.module.css
            - index.tsx
- recurseAI/components/ChatResponse/chatresponse.module.css
- recurseAI/components/ChatResponse/index.tsx
- recurseAI/components/ChatInput/index.tsx
- recurseAI/components/ChatInput/chatinput.module.css
- recurseAI/components/ChatBox/index.tsx
- recurseAI/components/ChatBox/chatbox.module.css

### What you accomplished
I made the side bar navigation bar expandable and retractable. Structured the ChatPage so that the page will have a header and footer that will hold key information for users like the title of the project and the user input boxes. I remade the user input area so that the text box will expand vertically up to a point if the user presses shift + enter or if the user types in text and the text goes over the width of the text box. I also styled the chat boxes so that the buttons are stylized on the chat boxes. I reorganized all the css files relating to the chatpage. Before, every component on the chatpage was using a single css page in a different directory, now each component has their own css file correlating to their own component. I fixed a lot of the bugs relating to the formatting of the chatpage. For example, before, when a user signed in and did not select a chat, the navbar would take up a lot more screen than intended. Another would be the chatpage not being able to scroll up and down.