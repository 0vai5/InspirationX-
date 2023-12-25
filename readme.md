# Express Social Media App

## Created By
- **Author:** Ovais Raza

## Libraries Used
- Express.js: Web application framework for Node.js
- Passport.js: Authentication middleware for Node.js
- EJS: Embedded JavaScript templates for rendering views
- Mongoose: MongoDB object modeling for Node.js
- Multer: Middleware for handling multipart/form-data (file uploads)

## Routes

- `/` - Home route that renders the registration page if the user is not logged in. Redirects to the feed if already logged in.
- `/feed` - Renders a feed page displaying all posts fetched from the database.
- `/profile` - Displays the user's profile, including their posts.
- `/login` - Renders the login page. On form submission, authenticates the user using Passport local strategy.
- `/logout` - Logs out the user and redirects to the login page.
- `/create` - Renders a page to create a new post.
- `/login` (POST) - Handles user login requests using Passport authentication.
- `/register` (POST) - Handles user registration requests and creates a new user in the database.
- `/createPost` (POST) - Handles post creation requests with file upload functionality.

## Overview

This Express.js application was created by Ovais Raza and serves as a basic social media platform with user authentication and post creation features. It utilizes Passport.js for user authentication using a local strategy, EJS for rendering views, and Mongoose for interacting with a MongoDB database.

Key functionalities include:
- User registration and login using Passport.js local strategy.
- Rendering pages for the user feed, profile, login, registration, and post creation.
- Fetching posts from the database and displaying them on the feed.
- User profile display with their posts.
- Creating new posts with file upload capabilities using Multer middleware.

The application uses routes to handle different functionalities and middleware like `isLoggedIn` and `redirectIfLoggedIn` to manage user authentication and redirection.

To run the application:
1. Install Node.js and MongoDB.
2. Run `npm install` to install dependencies.
3. Set up your MongoDB connection.
4. Start the server using `npm start` or `node app.js`.
5. Access the application in your browser using the specified routes.
