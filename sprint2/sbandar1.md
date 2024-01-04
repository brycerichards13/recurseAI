# Sprint 2
Name: Shashank Bandaru  
GitHub ID: bandarussr  
Group: recurseAI  

### What you planned to do
- Set up middleware to prevent access to pages without logging in [#23](https://github.com/utk-cs340-fall23/recurseAI/issues/23)
- Markdown rendering for AI responses [#21](https://github.com/utk-cs340-fall23/recurseAI/issues/21)
- Loading state UI when waiting for AI responses [#22](https://github.com/utk-cs340-fall23/recurseAI/issues/22)
- Clean up existing code to match TS/React conventions [#24](https://github.com/utk-cs340-fall23/recurseAI/issues/24)

### What you did not do
- Was unable to implement loading state UI's [#22](https://github.com/utk-cs340-fall23/recurseAI/issues/22)

### What problems you encountered
- Issues with authentication method (fixed in [#23](https://github.com/utk-cs340-fall23/recurseAI/issues/23))
- Issues with implementing loading UI using the current ChatBox component

### Issues you worked on
- [#21](https://github.com/utk-cs340-fall23/recurseAI/issues/21)
- [#23](https://github.com/utk-cs340-fall23/recurseAI/issues/23)
- [#24](https://github.com/utk-cs340-fall23/recurseAI/issues/24)
- [#32](https://github.com/utk-cs340-fall23/recurseAI/issues/32) (Assisted on this...)

### Files you worked on
- `app/api/auth/[...nextauth]/options.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `app/docs/[slug]/page.tsx`
- `app/page.tsx`
- `app/layout.tsx`
- `components/ChatInput/index.tsx`
- `components/ChatResponse/index.tsx`
- `components/ClientSessionProvider/index.tsx`
- `middleware.ts`


### What you accomplished
This sprint I redid the authentication for the project as the old method limited the user data to one page. I also implemented middleware to prevent the user from accessing any page under the `chat/` route. I also implemented a slug based dynamic blog for the documentation page as an alternative to Jason's documentation page, it is under the `docs/` route. I also implemented markdown rendering for AI responses, so that AI responses are formatted properly. It also includes code block syntax highlighting. Aside from these featuers, I went through all the files and switched imports to absolute imports and changed code to match the TS/React conventions of using Props interfaces and other stuff.
