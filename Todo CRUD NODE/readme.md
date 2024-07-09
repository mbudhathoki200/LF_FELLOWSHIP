# TODO CRUD API

A simple Express-based CRUD API for managing TODO items.

## Features

- Create, Read, Update, and Delete TODO items
- RESTful API endpoints
- JSON data format

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mbudhathoki200/LF_FELLOWSHIP/tree/master/Todo%20CRUD%20NODE
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

- `GET /todo/getTodo`: Retrieve all TODO items
- `GET /todos/:id`: Retrieve a specific TODO item
- `POST /todo/createTodo`: Create a new TODO item
- `PUT /todo/update/:id`: Update an existing TODO item
- `DELETE /todo/delete/:id`: Delete a TODO item

## docker pull

docker push manishbudhathoki/todo-app:V1.0.0

## Docker Image

https://hub.docker.com/repository/docker/manishbudhathoki/todo-app/general

## Usage

Send HTTP requests to `http://localhost:3000/todos` using your preferred method (e.g., cURL, Postman, or fetch API).
