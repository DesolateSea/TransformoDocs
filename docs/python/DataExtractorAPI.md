# Data Extractor API

The Data Extractor API provides endpoints for extracting structured information from various document types such as resumes, articles, research papers, and more.

## Endpoints

### Extract Data from Document

```
POST /data-extractor
```

Extracts structured data from the provided document.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| file | File | Yes | The document file to extract data from (PDF, TXT, or MD) |
| analyze_only | Boolean | No | If set to 'true', only analyzes the document context without extracting data (default: 'false') |
| document_type | String | No | Explicitly specify the document type (e.g., 'resume', 'article'). If not provided, the type will be automatically detected |

#### Response

##### Success Response (200 OK)

When `analyze_only=false` (default):

```json
{
  "message": "Data extracted successfully",
  "data": {
    // Extracted data structure varies based on document type
    // For example, for resumes:
    "personal_info": {
      "name": "John Doe",
      "email": "john.doe@example.com",
      // ...
    },
    "education": [...],
    "experience": [...],
    // ...
  }
}
```

When `analyze_only=true`:

```json
{
  "message": "Document context analyzed",
  "context": {
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
}
```

##### Error Responses

- **400 Bad Request**: When no file is provided or the file format is not supported
- **500 Internal Server Error**: When an error occurs during processing

## Example Usage

### Using cURL

```bash
# Extract data from a PDF file
curl -X POST -F "file=@resume.pdf" http://localhost:5000/data-extractor

# Only analyze document context
curl -X POST -F "file=@resume.pdf" -F "analyze_only=true" http://localhost:5000/data-extractor

# Specify document type explicitly
curl -X POST -F "file=@document.pdf" -F "document_type=article" http://localhost:5000/data-extractor
```

### Using Python Requests

```python
import requests

# Extract data from a PDF file
with open('resume.pdf', 'rb') as f:
    response = requests.post(
        'http://localhost:5000/data-extractor',
        files={'file': f}
    )
    data = response.json()
    print(data)

# Only analyze document context
with open('resume.pdf', 'rb') as f:
    response = requests.post(
        'http://localhost:5000/data-extractor',
        files={'file': f},
        data={'analyze_only': 'true'}
    )
    context = response.json()
    print(context)
```