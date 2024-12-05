# Creative Project 4: React Application

** please refer to Canvas for the latest version of these instructions **

# Overview

For your fourth Creative Project, you will create your own React application. Once again, as a Creative Project, you have the freedom to take ownership of your work, as long as you meet the requirements listed below. This project will introduce the use of React components, state management, routing, and data persistence.

# Ideas for CP4

As always, we encourage you to explore the new material covered in class, as well as related content linked to along the way. You may choose to create a new project for this CP or build on an existing project from previous CPs.

As long as you meet the requirements outlined below, you have the freedom to create the kind of web application you want.

This CP is designed to give you an opportunity to practice writing client-side code using React. This is a great chance to think about how your project could showcase what you've learned so far in web programming for your code portfolio after the quarter ends, so I encourage you to explore implementing different features of your React application!

# External Requirements

Your project must include the following files at a minimum:

- `index.html` - The main entry point of your website
- `App.js` - The root React component of your application
- `index.js` - The entry point for React that renders your `App` component
- `styles.css` - A file to style your React components
- `package.json` - Generated using `npm init` and including any dependencies you use (at a minimum, React, React DOM, and React Router). Remember that you should never directly edit this file, as `npm` will update it as needed.
- **Optional:** `firebase.js` or similar, if integrating with Firebase for state persistence

**Important Note:** All React components and related files should follow a logical directory structure. Ensure that your components are organized in a way that makes sense for the project. I will not grade assignments with an incorrect directory structure. Please confirm yours is correct with me if you are unsure.

You will be writing React components to manage the UI, where your components should dynamically load and present information based on user interaction.

### React Components

Your application must include at least three distinct React components, each serving a different purpose. These components should be reusable, follow best practices, and demonstrate a clear separation of concerns.

### JSX

Write HTML-like syntax within your JavaScript using JSX. Ensure that your JSX is clean, well-structured, and follows best practices, including proper nesting and self-closing tags.

### CSS with React

Style your components using CSS. You may use inline styles, CSS modules, or a preprocessor like SASS. Ensure that your styling is consistent and enhances the user experience.

### Passing Dynamic Data with Props

Pass dynamic data between components using props. This includes passing both primitive data types and objects/arrays. Implement prop destructuring where applicable.

### Stateless Functional Components

Include at least one stateless functional component that relies solely on props without managing its own state.

### Routing with React Router

Implement client-side routing using React Router. Create multiple pages or views in your application, and use React Router to navigate between them. Ensure that routes are well-defined and accessible.

### Events, Refs, and "this" Binding

Handle user events in React, manage component references (refs), and understand the use of `this` in event handlers. Demonstrate proper event binding and handling.

### State Management

Utilize React's state management to control dynamic data within components. Implement mechanisms for updating component states based on user interaction or data changes.

### Persisting State with Local Storage

Save component state to local storage to persist data between sessions. Retrieve the saved state upon reloading the page and restore the UI to its previous state.

### Persisting State with Firebase 

Integrate Firebase as a backend service to persist data. Configure Firebase, set up a database, and use Firebase methods to save and retrieve state data. Demonstrate CRUD operations with Firebase.

### Authentication 

Implement user authentication, allowing users to sign up, log in, and log out of the application. Manage authentication data securely and restrict access to certain parts of the app based on user authentication state. The sign up and log in process should be handled with external APIs such as Facebook, Twitter, Github, etc like we did in class.
Very important: for authentication, be sure the grader will be able to sign up and login.

### PropTypes

Use PropTypes to enforce type-checking on component props unless using TypeScript. Apply PropTypes to all files where relevant data is passed via props.

### Animating React Components (Optional)

Add animations to React components for enhanced user experience. Use libraries like React Transition Group or CSS animations to add transitions and animations.

# Internal Requirements

For full credit, your page must not only match the External Requirements listed above, but you must also demonstrate that you understand what it means to write code following a set of programming standards. Your code should maintain good code quality. Make sure to review the slides specific to React development!

### React Code Quality

- Continue to follow good code quality standards in React, including function decomposition, separation of concerns, and minimizing module-global variables.
- All React components must be written using ES6+ syntax.
- Decompose your components by writing smaller, more generic functions that complete one task rather than a few larger "do-everything" functions.
- Ensure that your components are modular and reusable, following best practices for component design.

### Documentation

- Document your React components and their props using comments or JSDoc where applicable.
- Briefly document any complex logic within your components with comments explaining the code.

### General

- Ensure consistent and readable source code aesthetics as demonstrated in class.
- Place a comment header in each file with your name, section, and a brief description of the file.

# Grading

Grading for Creative Projects is lighter with the chance to explore and learn without the overhead of having to match strict external requirements. My goal is to give you feedback, particularly on the internal requirements and documentation. Please see the rubric.

**This CP will be out of 100 points.**

# Academic Integrity

Creative Projects are unique in that students may look for outside resources for inspiration or assistance in accomplishing their goals. On occasion, students may wish to use portions of sample code that have been obtained through Canvas resources or others. In order to avoid academic misconduct for a Creative Project, you must include school-appropriate content. If I find inappropriate content or plagiarism in CPs, you will be ineligible for any points on the CP. Ask the instructor if you're unsure if your work is cited appropriately. Any external sources like images should be cited where used in the source code or (ideally) visible in a page footer.
