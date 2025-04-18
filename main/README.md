# TransformoDocs - Spring Boot Backend

Spring Boot Backend for TransformoDocs, a Spring Boot project that leverages Spring Web, Spring Security, Spring Data MongoDB, and Spring Data Redis for its backend operations.

![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

## Prerequisites

- Java 17 or higher
- Maven
- MongoDB
- Redis

## Getting Started

1. Clone the repository:
    ```sh
    git clone https://github.com/Nishant-mohan/TransformoDocs.git
    cd TransformoDocs
    ```

2. Make sure the servers for `WEBURL` and `PYTHON_BACKEND_URL` are running and the following configurations are set in the `.env` file:
    ```env
    WEBURL=http://localhost:5173
    PYTHON_BACKEND_URL=http://localhost:5000
    ```

3. Ensure that the `redis` and `mongodb` servers are running and the MONGODB_URI is set in the `.env` file:
    ```env
    MONGODB_URI=mongodb://localhost:27017/transformodocs
    ```

4. Build the project:
    ```sh
    mvn clean install
    ```

5. Run the application:
    ```sh
    mvn spring-boot:run
    ```

## Updating Documentation

TransformoDocs uses [widdershins](https://github.com/Mermade/widdershins) to generate the documentation from the OpenAPI specification. To update the documentation, run the following commands:

1. Install widdershins:
    ```sh
    npm install widdershins -g
    ```

2. Make sure the server is running.
    ```sh
    cd main
    mvn spring-boot:run
    ```

3. Run the script to generate the documentation:

    Windows:
    ```powershell
    ./update-docs.ps1 <server_url>
    ```

    Linux/Mac:
    ```bash
    bash update-docs.sh <server_url>
    ```