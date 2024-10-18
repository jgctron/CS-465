Full Stack Web Application - CS 465 Final Project
Overview
 
This project is a full-stack web application for the customer and admin sides. In the final iteration, secure admin login authentication features were added to finalise the functionality. The purpose of this README is to outline the architecture and functionality of the project and explain the process of developing the app, including testing strategies used and a reflection on the app build.

Table of Contents
Overview
Architecture
Functionality
Testing
Reflection
Architecture

This application was developed with the objective of creating a full stack solution, using technology for both frontend and backend. The frontend components are:

Express HTML: Used for the server-side rendering pages that handle static content.
JavaScript: Employed to handle dynamic interactions and features on the client side.

Single-Page Application (SPA): The SPA architecture would enable faster page-to-page navigation without a full-page refresh when changing from one view to another.

The back end used a NoSQL MongoDB database to store data for the application. Whereas MySQL uses a fixed data model, MongoDB uses a dynamic schema that can quickly grow and adapt as the project still changes. Since a modern web application isn’t static, this flexibility was important to me since I couldn’t know at the start what data models might need to change in the future as the project grew.

Functionality
 For data exchanges between the front end and the back end, I decided to use JSON (JavaScript Object Notation). Whereas JavaScript is well known as a programming language, JSON is a lightweight data interchange format for transmitting data structures. It sorts of ‘glues’ data between the client (frontend) and server (backend) ends.

Refactoring and Reusable Components

But by the time I’d finished the project, I ended up recording most of the functionality and even refactoring again, which resulted in a significantly more effective codebase. For example, using reusable user interface (UI) components allowed me to abstract nearly identical chunks of code implementing something generic, such as displaying an editable string with a button for deleting it and reusing it in different parts of the app. This greatly simplified the codebase and made it easier to add new features without writing redundant code.

Testing

API testing was necessary for the project so that when requests were made to send or retrieve information from the backend application, it would behave correctly. Here’s what it entailed:

Endpoint Testing: Checking all the endpoints of the api whether they have a proper interaction between the client and the server for the requests made like GET, POST, PUT, DELETE.

Security Testing: Addition of the security layers like secure login authentication made it a bit complicated for testing. I need to test that the user authentication system is working. This includes the testing of how the credentials are encrypted and how the session is handled.

 It was important to understand how each affected the other, how the methods, endpoints and security tied together.

Reflection
 The course has helped me a lot to work towards my career goal in developing, where in this course, I got experience in full stack development by learning to combine frontend and backend components. With this course, I have learned to grow my capabilities in handling both sides of web development.

Critical skills I’ve developed in this course include:
 Full stack: How does the front end (SPA) relate to the back end (NoSQL database), and how does everything connect together via APIs?

Security: Implementing secure authentication mechanisms and understanding best practices in securing web applications.
 Refactoring and modularity: Learning how code can be refactored to be more performant and maintainable, as well as how to create reusable UI components.

 It will make me a better contender for jobs, and I’ll also apply these skills to further projects in the future.
