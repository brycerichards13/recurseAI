# Sprint 1
Austin Gilbert | agilbe24 | recurseAi

### What you planned to do
- Create User Login page
- Set up google auth with data base
- Format User Login page
    - Google Sign button
    - Logout Button
    - Continue Button
    - Page itself
- Link login page to chat page
- Add logout button to chat page

### What you did not do
- I did not set up the google auth since the person who set up the data base(firebase) told me it was easier if he set it up because firebase has implemented google auth. So he set it up for me (I still coded it to work with my buttons)

### What problems you encountered
(List the problems you encountered)
- Format issues
- Learning curves to html and css language
- Once you login and logout in the chat page, trying to log back in would not work (fixed)

### Issues you worked on

- [#13](https://github.com/utk-cs340-fall23/recurseAI/issues/13)
- [#14](https://github.com/utk-cs340-fall23/recurseAI/issues/14)

### Files you worked on

- `app/login/page.tsx`
- `app/login/login.module.css`
- `app/chat_page/page.tsx`

### What you accomplished
I formatted the login page. Both the login screen and after login screen. In the login screen I formatted and created a working button that looks really close to the actual google login button used on many websites. Formatted and created a screen that confirms the user is login by printing out there google username. From this page I added a working logout button that logouts the user and brings them back to the google login page and a continue button that navigates the user to the chat page where they can use the Ai. Added a logout button to the chat_page that logouts the user and bring them back to the starting page. 