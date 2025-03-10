# Leselounge

Leselounge is a modern, user-friendly platform designed to enhance your reading experience. Whether you're an avid reader or just getting started, Leselounge offers a wide range of features to help you discover, organize, and enjoy your favorite books. With a sleek interface and powerful tools, Leselounge makes it easy to keep track of your reading progress, join book clubs, and connect with other readers.

## Features
- **Book Discovery**: Find new books based on your interests and reading history.
- **Reading Progress**: Track your reading progress and set goals.
- **Book Clubs**: Join or create book clubs to discuss your favorite books with others.
- **Community**: Connect with other readers, share reviews, and get recommendations.

## Requirements

Before you start, ensure you have the following installed on your machine:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- **Make** (optional, but recommended for easier setup):  
  - **Linux/macOS**: Make is usually pre-installed. If not, install it via your package manager (e.g., `sudo apt install make` on Ubuntu or `brew install make` on macOS).
  - **Windows**: Install Make by installing [Chocolatey](https://chocolatey.org/install) (a package manager for Windows) and then running:
    ```sh
    choco install make
    ```
    Alternatively, you can use [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/install), which includes `make` by default.

### Verifying Installation
To ensure Docker and Docker Compose are installed correctly, run:
```sh
docker --version
docker-compose --version
```

### Using the Makefile
This project includes a `Makefile` to simplify common tasks. While it's optional, it's recommended for a smoother experience. To use it, simply run commands like `make start` or `make clean`. For a full list of commands, check the Makefile.

## Environment Variables
The application uses a single `.env` file located in the **root directory** to manage environment variables for both the backend and frontend. Follow these steps to set it up:

1. **Copy the `.env.example` file**: In the root directory, you'll find a `.env.example` file. Copy it to create your own `.env` file:

    ```sh
    cp .env.example .env
    ```

2. **Edit the `.env` file**: Open the `.env` file and replace the placeholder values with your actual configuration

    ```sh
    PORT=5000
    FRONTEND_PORT=5173
    MONGO_INITDB_ROOT_USERNAME=your-monge-db-username
    MONGO_INITDB_ROOT_PASSWORD=your-mongo-db-password
    MONGO_URI=your-db-url
    JWT_SECRET=your-jwt-secret
    ```
3. **Ensure `.env` is ignored by git**: Make sure your `.gitignore` file includes .env to prevent it from being committed to the repository:

    ```sh
    # Ignore environment files
    .env
    ```

## Starting the Application with Docker

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/ArianFarzad/Leselounge.git
    cd leselounge
    ``` 
2. **Build the Docker Images**:
    ```sh
    docker-compose up --build
    ```
    or
    ```sh
    make start
    ```
3. **Access the Application**: 
    open your web browser and navigate to `http://localhost:5173`

4. **Stopping the Application**:
Application: To stop the application, press `Ctrl+C` in the terminal where Docker is running, or run:

    ```sh
    docker-compose down
    ```
    or
    ```
    make clean
    ```

Now you should have Leselounge up and running on your local machine using Docker. Enjoy exploring and managing your reading experience! 

## Postman Collection  
In the `docs` directory, we have provided a Postman collection to help you easily test and interact with the API endpoints. This collection includes pre-configured requests for all available routes, along with examples of request bodies, and headers. Simply import the collection into Postman to get started and explore the API's functionality.  

For authentication-protected endpoints, make sure to include a valid JWT token in the `Authorization` header as `Bearer <token>`. You can generate a token using the appropriate authentication endpoint and update the collection's environment variables with the token for seamless testing.  

This collection serves as a practical tool to streamline your development and integration process.
