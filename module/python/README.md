# TransformoDocs

A modular interface for document processing and NLP services. This package provides a simple way to convert documents to text and extract structured information using NLP.

## Features

- PDF to text conversion
- Structured data extraction using NLP
- Simple, intuitive API
- Secure credential management

## Installation

```bash
pip install transformo-docs
```

## Quick Start

```python
from transformo_docs import TransformoDocs

# Initialize with API credentials
api = TransformoDocs(api_key='your-api-key', api_secret='your-api-secret')

# Convert PDF to text
with open('document.pdf', 'rb') as file:
    text = api.convert_pdf_to_text(file)

# Extract structured data
data = api.extract_data(text)
print(data)
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

# Install development dependencies
pip install -e ".[dev]"

# Run tests
python -m pytest
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.