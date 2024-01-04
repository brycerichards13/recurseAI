# Sprint 1

Group: recurseAI  
Name: Connor Murphy
NetID: cmurph55

### What you planned to do

- Set up the Firestore database. [#9](https://github.com/utk-cs340-fall23/recurseAI/issues/9)
- Define database schema for how the data will be stored and for how relationships will be defined. [#10](https://github.com/utk-cs340-fall23/recurseAI/issues/10)
- Configure the collections of the database in Firestore. [#11](https://github.com/utk-cs340-fall23/recurseAI/issues/11)
- Add database and Firebase's Google authorization feature to backend by creating the relevant typescript interfaces and API endpoints. [#12](https://github.com/utk-cs340-fall23/recurseAI/issues/12)

### What you did not do

I did not get the chance to define the relationship between users from the Google Auth feature to the Chats collection.

### What problems you encountered

- I had(have) a problem with my PC where it does not register client-side functions in any of my browsers.
- I had a hard time understanding how API endpoints were meant to be designed with the App Router.

### Issues you worked on

- [#9](https://github.com/utk-cs340-fall23/recurseAI/issues/9)
- [#10](https://github.com/utk-cs340-fall23/recurseAI/issues/10)
- [#11](https://github.com/utk-cs340-fall23/recurseAI/issues/11)
- [#12](https://github.com/utk-cs340-fall23/recurseAI/issues/12)

### Files you worked on

- ./app/login/page.tsx
- ./pages/api/dbAccess/chatWrite.ts
- ./pages/api/dbAccess/messageWrite.ts
- ./pages/api/dbAccess/versionWrite.ts
- ./pages/api/dbAccess/endpoint/chat.ts
- ./pages/api/dbAccess/endpoint/message.ts
- ./pages/api/dbAccess/endpoint/version.ts
- ./pages/api/firebase.ts
- ./pages/api/useAuth.ts

### What you accomplished

I set up the Firestore database and the Google Auth feature in Firebase. With the help of Shashank, I designed the database schema. I then connected the Google Auth feature to the backend. After this, I developed the functions that set up the the structure of each of the collection's documents and add them to the database. I then developed the API endpoints for these functions.
