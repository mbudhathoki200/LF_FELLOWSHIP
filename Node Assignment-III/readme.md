# TODO CRUD API

A simple Express-based CRUD API for managing TODO items.

## Features

- **User Authentication**: Secure user authentication using JWT.
- **Password Hashing**: Passwords are hashed using bcrypt for enhanced security.
- **CRUD Operations**: Users can create, read, update, and delete their own todos.
- **Authorization**: Users can only access their own todos, ensuring data privacy and security.

## Technologies Used

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **JWT**: For secure user authentication.
- **bcrypt**: For hashing passwords to enhance security.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mbudhathoki200/LF_FELLOWSHIP/tree/master/Node%20Assignment-III
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

OR

1. With docker

```bash
  docker docker push manishbudhathoki/node-assignment-iii:latest
```

## API Endpoints

- **POST /user/signup**: Register a new user.

  ```json
  {
    "name": "example",
    "email": "example@gmail.com",
    "password": "example"
  }
  ```

- **POST /user/login`**: Login a user and receive a JWT.

  ```json
  {
    "email": "example@gmail.com",
    "password": "example"
  }
  ```

- **POST /user/refresh**: refresh by passing the refresh token and receive a new access token.

  ```json
  {
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJuYW1lIjoiYWR3OCIsImVtYWlsIjoiYWR3OEBnbWFpbC5jb20iLCJpYXQiOjE3MjA1MjMzMTIsImV4cCI6MTcyMDUyNjMxMn0.ysHfrDmJTibjah2XYPEod-bfAgQs9fqtN35kUDdtNVI"
  }
  ```

- **GET /todo/getTodo**: Get all todos for the authenticated user.

- **GET /todos/:id**: Get specific todos for the authenticated user.

- **POST /todo/createTodo**: Create a new todo for the authenticated user.

  ```json
  {
    "title": "todo title",
    "description": "todo description"
  }
  ```

- **PUT /todo/update/:id**: Update a todo by ID for the authenticated user.

  ```json
  {
    "title": "todo title",
    "description": "todo description"
  }
  ```

- **DELETE /todo/delete/:id**: Delete a todo by ID for the authenticated user.
