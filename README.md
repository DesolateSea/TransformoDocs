# 🧾 TransformoDocs

**TransformoDocs** is a full-stack platform for automated document understanding. It extracts structured data from unstructured documents like PDFs, scans, and forms, and allows users to query them using natural language. 

Whether you’re verifying ID proofs, parsing contracts, or building smart document search, TransformoDocs turns raw documents into usable, queryable, intelligent data.

---

## ❓ What Is TransformoDocs?

TransformoDocs provides a unified system to:

- 📄 **Upload documents** (PDFs, images, forms)
- 🧠 **Automatically extract key data** using OCR and LLMs
- 💬 **Ask natural-language questions** like _"What is the due date on this invoice?"_
- 🛠️ **Automate workflows using REST APIs** — perfect for pipelines, integrations, or backend systems
- 🌐 **Access via a modern web interface or fully-documented APIs**

It’s ideal for:

- Legal firms automating contract review  
- KYC / onboarding flows  
- HR teams parsing resumes or certificates  
- Financial institutions extracting tables and metrics from scanned documents  
- Teams building document-processing workflows in CI/CD pipelines or cloud systems
- Or just general purpose use for any unstructured document

---

## 🚀 Key Highlights

- ⚙️ **Spring Boot REST APIs**  
  Secure and modular API backend with Spring Web, Security, Validation, and Actuator.

- 🔐 **JWT Authentication & Validation**  
  Encrypted access control and schema-validated input with Spring Security & Validation.

- 💾 **MongoDB & Redis Integration**  
  Persistent storage for document data (MongoDB) and caching/session support (Redis).

- 📩 **OTP via Spring Mail**  
  Email-based verification to support authentication and transactional flows.

- 🧠 **Python Microservices**  
  - OCR service for image-to-text conversion  
  - LLM-based information extraction  
  - Prompt-based question answering over document content

- 🤖 **Automation-Ready via API**  
  Every major feature is available as a REST endpoint for easy integration into custom workflows, CRON jobs, or cloud-based pipelines.

- 🧠 **ML & AI Integration**  
  Powered by **TensorFlow**, **PyTorch**, and optionally integrated with **AWS Textract**.

- 📘 **Automated Documentation**  
  Swagger UI via Springdoc, with markdown generation using **Widdershins**.

- ⚛️ **Frontend with React + TypeScript**  
  A clean, component-driven web UI built using modern React and Vite (under development).

- 📱 **Optional Mobile Support**  
  Future-ready mobile client built in **React Native (Expo)** (not yet released).

---

## 🧰 Tech Stack

### Backend
- Java 17, Spring Boot 3.4
- Spring Security, Spring Mail, Validation, Actuator
- JWT
- MongoDB & Redis
- OpenAPI (Springdoc), Lombok

### Python Microservices
- Python 3.8+
- Flask + Jupyter Notebooks
- Tesseract / PaddleOCR (for OCR)
- HuggingFace / Julep AI (for LLMs)
- TensorFlow, PyTorch

### Frontend
- React.js + TypeScript
- Node.js + npm
- Vite
- Widdershins (OpenAPI → Markdown)

---

## 📂 Project Setup

To get started locally, check out the [SETUP.md](SETUP.md) guide.

For a list of contributors, check out the [CONTRIBUTORS.md](CONTRIBUTORS.md) file.