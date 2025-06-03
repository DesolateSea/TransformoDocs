# DataExtractor Agent

The DataExtractor agent is designed to extract structured information from various document types. It uses a two-step approach: first analyzing the document context to determine its type, then extracting relevant information based on that context.

## Features

- **Context Analysis**: Automatically determines document type, structure, and key contextual information
- **Dynamic Extraction**: Extracts information based on document type and context
- **Supported Document Types**:
  - Resumes
  - Articles
  - Research Papers
  - Invoices
  - And more (easily extensible)

## How It Works

1. **Context Analysis**: The agent first analyzes the document to determine its type, structure, and key contextual information.
2. **Field Selection**: Based on the document type, the agent selects the appropriate fields to extract.
3. **Data Extraction**: The agent extracts the relevant information from the document based on the selected fields.

## Usage

### Basic Usage

```python
from app.agents.DataExtractor.agent import extract_document_data

# Extract data from any document text
document_text = "Your document text here..."

# The agent will automatically determine the document type
result = extract_document_data(document_text)
print(result)
```

### Manual Document Type Specification

```python
from app.agents.DataExtractor.agent import extract_document_data

# Extract data with a specified document type
result = extract_document_data(document_text, document_type="resume")
print(result)
```

### Context Analysis Only

```python
from app.agents.DataExtractor.agent import analyze_document_context

# Just analyze the document context without extraction
context = analyze_document_context(document_text)
print(context)
```

### Processing Files

The included example script demonstrates how to process PDF and text files:

```bash
python -m app.agents.DataExtractor.example path/to/document.pdf
```

or

```bash
python -m app.agents.DataExtractor.example path/to/document.txt
```

## Response Format

### Context Analysis Response

```json
{
  "document_type": "resume",
  "document_subtype": "technical",
  "language": "English",
  "structure_analysis": {
    "has_sections": true,
    "section_count": 5,
    "has_tables": false,
    "has_lists": true
  },
  "content_summary": "Technical resume for a software engineer with 5 years of experience in web development.",
  "key_entities": ["John Doe", "ABC Tech", "XYZ University"],
  "primary_topics": ["software engineering", "web development", "cloud computing"],
  "metadata": {
    "last_updated": "2023-05-15"
  }
}
```

### Extraction Response

The extraction response format varies based on the document type. For example, for a resume:

```json
{
  "personal_info": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "(123) 456-7890",
    "location": "New York, NY",
    "linkedin": "https://linkedin.com/in/johndoe",
    "website": "https://johndoe.com"
  },
  "education": [...],
  "experience": [...],
  "projects": [...],
  "skills": [...],
  "certifications": [...],
  "achievements": [...]
}
```

## Requirements

- Python 3.7+
- PyPDF2 (for PDF processing)
- Julep API key (set in environment variables)

## Configuration

Ensure you have the following environment variables set:

```
JULEP_API_KEY=your_api_key_here
JULEP_MODEL=claude-3.5-sonnet  # or your preferred model
```

## Extending

### Adding New Document Types

To add support for new document types, modify the `get_extraction_fields()` function in `agent.py` to include the new document type and its extraction fields.

```python
def get_extraction_fields(document_type):
    extraction_fields = {
        # Existing document types...
        
        "new_document_type": {
            "field1": [],
            "field2": ["subfield1", "subfield2"],
            # Add more fields as needed
        }
    }
    
    return extraction_fields.get(document_type, {"content": [], "metadata": []})
```