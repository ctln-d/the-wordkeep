# The Wordkeep

The Wordkeep is a tool to collect words and their definitions using the Merriam-Webster API, allowing users to create their own personal dictionaries.

# Demo

![Website Screenshot](the-wordkeep-demo.png)

# What's New

- User authentication
- Custom source/notes space for saved words
- Word deletion functionality
- MongoDB database integration

# Built With

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- **react-pageflip** — interactive book UI
- **Merriam-Webster Collegiate Dictionary API**

# Getting Started

1. Open the URL: https://the-wordkeep.onrender.com/
2. Create an account by clicking "don't have an account?" at the bottom.
3. Enter a username (letters, numbers, hyphens, underscores), email, and password (must be at least 8 characters). 
4. Click on the "dictionary" button to open the left panel.
5. Type in a word in the search bar and press the "enter" key. A message will show if the word is not supported by this dictionary ("No definition found.").
6. If the word exists, click the "add" button to add it to the book. 
7. To revisit the definition of a word in the book, simply click on the word on the page.
8. To add a log the source or write a note, type in the "source" or "notes" boxes. Be sure to click "save".
9. To delete a word, press "delete" under the "save" button.
10. Click or drag the page corners to turn the page, if applicable. No new pages will be available until the existing pages are full.


# AI Usage

This project was developed with occasional assistance from AI tools for debugging and learning/understanding backend concepts.

# Contributing

## Cloning and Installation
1. Clone the repo
```
git clone https://github.com/ctln-d/the-wordkeep
```
2. Install and run backend
```
cd backend
npm install
node server.js
```
3. Install and run frontend
```
cd frontend
npm install
npm run dev
```

## Making Contributions
- Make sure to create a new branch and name it adequately
- Write clear commit messages
- When pushing changes, open a pull request and describe the changes made
