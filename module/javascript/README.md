# TransformoDocs

A modular TypeScript/JavaScript interface for document processing and NLP services. This package provides a simple way to convert documents to text and extract structured information using NLP.

## Features

- Written in TypeScript with full type support
- PDF to text conversion
- Structured data extraction using NLP
- Simple, intuitive API
- Promise-based async interface
- Secure credential management

## Installation

```bash
npm install transformo-docs
# or
yarn add transformo-docs
```

## Quick Start

```typescript
import { TransformoDocs } from 'transformo-docs';

// Initialize with API credentials
const api = new TransformoDocs('your-api-key', 'your-api-secret');

// Convert PDF to text
async function processDocument(file: File) {
  try {
    // Convert PDF to text
    const text = await api.convertPDFToText(file);
    
    // Extract structured data
    const data = await api.extractData(text);
    console.log(data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

## Configuration

You can configure the service using environment variables:

```bash
export TRANSFORMO_DOCS_API_KEY='your-api-key'
export TRANSFORMO_DOCS_API_SECRET='your-api-secret'
```

## Development

To set up the development environment:

```bash
# Clone the repository
git clone https://github.com/sih/transformo-docs.git
cd transformo-docs

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Type Definitions

The package includes TypeScript definitions. When using TypeScript, you'll get full type support and autocompletion.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.