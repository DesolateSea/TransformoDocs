# Introduction to Transformodocs

Welcome to **Transformodocs**! This document will provide you with a comprehensive overview of Transformodocs, a powerful tool designed to streamline and enhance your document management and transformation processes.

## What is Transformodocs?

TransformoDocs is a powerful document management system that empowers businesses to overcome the challenges of non-machine-readable formats.It is a versatile platform that allows you to efficiently manage, convert, and transform various types of documents. Whether you’re dealing with text files, spreadsheets, presentations, or any other document formats, Transformodocs offers a range of features to make your work easier and more efficient.

## Key Features

- **Data Accessibility:** Non-machine-readable formats hinder data accessibility, making it difficult to search, analyze, and extract information from documents.
- **Automation challenges:** Manual processing of non-machine-readable formats is time-consuming and prone to errors, hindering workflow efficiency and productivity.
- **Limited Insights:** Non-machine-readable formats limit the ability to derive meaningful insights from data contained within documents, impacting informed decision-making.
- **workflow Integration:** Seamlessly integrate with existing business workflows for streamlined document processing.
- **Security and Privacy:** Securely store and manage sensitive data with advanced encryption and access controls.

- **Data Extraction**

Data extraction is a core function of TransformoDocs. We use machine learning models to automatically extract key information from documents, such as dates, names, and addresses.

- **Model Selection**

Choosing the right ML model for a particular task is crucial. We have a range of models available, including supervised, unsupervised, and reinforcement learning. We select the model that best fits the specific document type and extraction needs.

- **NLP (Natural Language Processing)**

NLP models are utilized to perform tasks such as sentiment analysis, named entity recognition, and document classification, enabling deeper insights and contextual understanding of the content.

- **Advanced Analytics**

Compliance and Security:Our system incorporates ML models to ensure regulatory compliance by monitoring and managing document access and storage according to standards like GDPR and HIPAA.

 Accessibility Features:We integrate ML-based text-to-speech capabilities to enhance accessibility for users with disabilities, converting text into spoken words seamlessly.



## Tech Stack

Transformodocs is built using a robust and diverse tech stack to ensure high performance and scalability. Our tech stack includes:

- **React.js:** A JavaScript library for building user interfaces.
- **React Native (Expo):** A framework for building cross-platform mobile applications.
- **Node.js:** A JavaScript runtime environment for building server-side applications.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **Python:** A general-purpose programming language.
- **Flask:** A lightweight Python web framework.
- **Jupyter Notebook:** An open-source web application for interactive computing.
- **TensorFlow:** An open-source machine learning library.
- **PyTorch:** An open-source machine learning library.
- **AWS (Lambda, S3, Textract):** Cloud computing services from Amazon Web Services.
- **MongoDb:** developing scalable applications with evolving data schemas.


## How to Start

- **Start Server**
  ```bash
  mvn spring-boot:run
  ```

- **Create .env file**
  ```bash
  cp .env.example .env
  ```

- **For Web**
  ```bash
  cd web
  npm install
  npm run dev
  ```

---

*For more information, visit our [website](https://docs.google.com/presentation/d/1DPhbXj-Dd6qpzB5iwH1Nh-SyKn0wYqMf/edit?usp=drive_link&ouid=117197762259622512565&rtpof=true&sd=true) or follow us on [social media](#).*

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