# 🧾 TransformoDocs – Setup Guide

This guide will help you set up the full-stack development environment for **TransformoDocs**, including:

- ✅ Spring Boot backend (Java)
- ✅ Python microservices (OCR + LLM)
- ✅ React frontend
- ✅ MongoDB, Redis, and documentation tools

---

## 📦 Prerequisites

Make sure the following tools and services are installed and running:

- [Java 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Redis](https://redis.io/docs/install/)
- [Node.js + npm](https://nodejs.org/)
- [Python 3.8+](https://www.python.org/)
- [Widdershins](https://github.com/Mermade/widdershins) (for documentation)

---

## 🛠️ Backend Setup (Spring Boot)

> Java-based REST API with Spring Web, Security, MongoDB, Redis, JWT, and Mail

### 1. Clone the repository

```bash
git clone https://github.com/Nishant-mohan/TransformoDocs.git
cd TransformoDocs
```

### 2. Configure Environment

Create a `.env` file in the project root (or update if already present):

```env
WEBURL=http://localhost:5173
PYTHON_BACKEND_URL=http://localhost:5000
MONGODB_URI=mongodb://localhost:27017/transformodocs
```

Ensure:

* MongoDB is running
* Redis is running locally
* Python backend (Flask) is running

### 3. Build & Run the Backend

```bash
mvn clean install
mvn spring-boot:run
```

---

## 📘 API Documentation (Widdershins)

TransformoDocs uses **Widdershins** to generate Markdown-based API docs from OpenAPI specs.

### 1. Install Widdershins

```bash
npm install -g widdershins
```

### 2. Make sure the server is running

```bash
mvn spring-boot:run
```

### 3. Generate API Docs

* **Windows (PowerShell):**

  ```powershell
  ./update-docs.ps1 http://localhost:8080
  ```

* **Linux/macOS:**

  ```bash
  bash update-docs.sh http://localhost:8080
  ```

---

## 🌐 Frontend Setup (React)

> A TypeScript React app (under `web/`) for UI interaction with the backend.

### 1. Create `.env` file

In the project root:

```bash
cp .env.example .env
```

### 2. Start the Frontend

```bash
cd web
npm install
npm run dev
```

The frontend should be accessible at `http://localhost:5173`.

---

## 🐍 Python Microservices (Flask)

> Includes OCR and prompt-based querying services used by the main backend.

### 1. Navigate to Python Backend

```bash
cd python
```

### 2. Set Up Virtual Environment

```bash
python -m venv venv
```

Activate the environment:

* **Windows:**

  ```bash
  .\venv\Scripts\activate
  ```
* **macOS/Linux:**

  ```bash
  source venv/bin/activate
  ```

### 3. Install Requirements

```bash
pip install -r requirements.txt
```

### 4. Run Flask Application

```bash
python run.py
```

Flask backend should now be running at `http://localhost:5000`.

---

## ✅ You're All Set!

Once:

* Spring Boot is running on `http://localhost:8080`
* React is live at `http://localhost:5173`
* Python backend is active at `http://localhost:5000`