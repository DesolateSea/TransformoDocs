# API Documentation

## Overview

This document provides the API documentation for a Flask-based RESTful service that offers Named Entity Recognition (NER) and Sentiment Analysis functionalities. The service leverages Hugging Face's `transformers` library with pre-trained models.

## Endpoints

### 1. Named Entity Recognition (NER)

**Endpoint:** `/ner`

**Method:** `GET`

**Description:** Analyzes the given text for named entities using a pre-trained NER model.

**Query Parameters:**
- `text` (string): The text to be analyzed for named entities.

**Response:**
- **Success:**
  ```json
  {
      "message": "NER analysis complete",
      "entities": [
          {
              "entity": "B-PER",
              "score": 0.999,
              "index": 1,
              "start": 0,
              "end": 4,
              "word": "John"
          }
          ...
      ]
  }
**Errors**
- 
    ```json
        {
        "error":"Missing 'text' parameter."

        }
### 2. Sentiment Analysis

**Endpoint:** `/sentiment`

**Method:** `GET`

**Description:** Analyzes the given text to determine its sentiment using a pre-trained sentiment analysis model.

**Query Parameters:**
- `text` (string): The text to be analyzed for sentiment.

**Response:**

- **Success:**
  ```json
  {
      "message": "Sentiment analysis complete",
      "sentiment": [
          {
              "label": "POSITIVE",
              "score": 0.9998
          }
      ]
  }
- **Error**
  ```json
    {
        "error": "Missing 'text' parameter."
    }

### 3. Health Check

**Endpoint:** `/health`

**Method:** `GET`

**Description:** Provides a simple health check endpoint to verify that the API is running.

**Response:**

- **Success:**
  ```json
  {
      "status": "healthy"
  }
### Error:
- **404 Not Found: Returned when a requested resource does not exist.**
  ```json
  {
    "error": "Resource not found"
  }

- **500 Internal Server Error: Returned for unexpected server errors.**
  ```json
  {
    "error": "Internal Server error"
  }
## Running the Application

### 1. Install Dependencies

    ```bash
    pip install flask flask-restful transformers

### 2.Run the Application: Start the Flask application by executing:

```bash
python app.py
