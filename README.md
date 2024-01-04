<p align="center">
  <img src="https://github.com/utk-cs340-fall23/recurseAI/assets/103869923/f59a9db1-ca9d-4650-8352-076220b28c14" alt="recurseAI_logo"/>
</p>

Contributors
============
- Bryce Richards - brycerichards13
- Jason Choi - Jchoi1
- Shashank Bandaru - bandarussr
- Austin Gilbert - AustinGilbe
- Connor Murphy - EarlTheUnicorn
- Zackery Whitscell - ZackeryW

[http://localhost:3000/]

Table of Contents
=================

 - [Overview](#overview)
 - [Technologies](#technologies)
 - [Download](#download)
 - [Build and Install](#build-and-install)
 - [Documentation](#documentation)
 - [User Instructions](#user-instructions)
 - [License](#license)

Overview
========

Our project aims to transform ChatGPT into a project-focused, self-promoting language model that can autonomously complete complex tasks and goals with the aid and guidance of the user. The current limitations of ChatGPT create very linear single-chain prompts and manual interactions, which hinder its utility for users seeking to achieve broader objectives. By enabling ChatGPT to generate/prompt itself and leverage external tools you could allow for an extremely functional, goal-focused AI.

Technologies
============

- Frontend + Backend: Next.js 14
- Database: Firebase
- Authentication: Next Auth and Google Auth
- Large Language Model / Artificial Intelligence: PaLM 2 AI

Download
========

Obtain a local copy of the Git Repository using this command:

    git clone https://github.com/utk-cs340-fall23/recurseAI.git


Build and Install
=================

Access your local RecurseAI git repository. Once there run the following command to install all necessary packages:

    npm i

Your repository is ready to be built, but we still have one more thing to take care of, your AI token.

- Create a file named: *.env.local* in the root directory.
- Go to: https://makersuite.google.com/
- Login -> Key Icon on the left -> Generate GPI Key -> Copy it
- Paste the copied key into your *.env.local* in this format:

    PALMAI_KEY=Insert_Your_Key_Here

Your recurseAI project folder is now fully installed and ready to be built! 

> [!NOTE]
> The app also requires auth keys. To circumvent, delete the `middleware.ts` file in the project's root directory.

Documentation
=============

To start your recurseAI application you can run one of the following commands:

    npm run dev

    yarn dev

    pnpm dev

    bun dev

Wait 10-30 seconds and then navigate to: 

    http://localhost:3000/

This will take you to the main page of recurseAI. From here you will see some information to teach you a little more about the project, you can access the documentation, and you can go to the chat page to get started.

User Instructions
=================

This application is simple to use. Once the application is built and the main page is reached as described in [Documentation](#documentation) you can chat away with PaLM AI on the chat page. 

More power users can access:

    http://localhost:3000/project

This is our hidden, work-in-progress landing page for the recursive project-focused functionality of recurseAI. This page will parse large responses from the AI into smaller, more digestible sections.

License
=======

recurseAI is licensed under the MIT software license, which means that
you are free to get and use it for commercial and non-commercial
purposes as long as you fulfill its conditions.

See the [LICENSE.txt](LICENSE.txt) file for more details.

Note
============
This is a copied public repository of a team project that is part of a private repository.\
The commit history in this repository is not a representation of the actual commit history.\
The true commit history, along with each individual sprint additions can be found in the csv and their folders respectively.