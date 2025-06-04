import os
import yaml
from functools import lru_cache
from app.agents.client import client, model
import time
agent = client.agents.create(
    name="Data Extractor",
    model=model,
    about="Extracts data from the given input and returns it in a structured format"
)

@lru_cache(maxsize=None)
def create_task(prompt):
    with open(prompt, "r", encoding="utf-8") as f:
        task_definition = yaml.safe_load(f)

    task = client.tasks.create(agent_id=agent.id, **task_definition)
    return task

def analyze_document_context(document_text):
    """
    Analyze the document to determine its type and context.

    Args:
        document_text (str): The text content of the document to analyze

    Returns:
        dict: Information about the document type and context
    """
    # print("Analyzing document context...")
    # print(document_text[:100])

    try:
        # Get the context analysis task
        context_prompt_path = os.path.join(os.path.dirname(__file__), "context_prompt.yml")
        task = create_task(context_prompt_path)
    except FileNotFoundError as e:
        print("Error: Context prompt file not found.")
        raise FileNotFoundError(f"Context prompt file not found: {context_prompt_path}") from e
    except Exception as e:
        print("Unexpected error loading task:", e)
        raise

    # print(f"Executing task for analysis: {document_text[:30]}...")
    # print("Task ID:", task.id)

    try:
        exec_ = client.executions.create(
            task_id=task.id,
            input={"document_text": document_text}
        )
    except Exception as e:
        print("Failed to start task execution:", e)
        raise

    while True:
        try:
            res = client.executions.get(exec_.id)
        except Exception as e:
            print("Error fetching execution status:", e)
            raise

        if res.status in ["succeeded", "failed"]:
            break
        time.sleep(1)

    if res.status == "succeeded":
        output = res.output['choices'][0]['message']['content']
        print("Task execution succeeded.")
        return output

    else:
        print("Task execution failed:", res.error)
        raise Exception(f"Task execution failed: {res.error}")

def extract_document_data(document_text, document_type=None):
    """
    Extract structured data from a document based on its type.
    If document_type is not provided, it will first analyze the document to determine its type.
    
    Args:
        document_text (str): The text content of the document to analyze
        document_type (str, optional): Type of document (resume, article, etc.)
        
    Returns:
        dict: Structured data extracted from the document
    """
    # print("Extracting document data...")
    # print(document_text[:100])
    # If document type is not provided, analyze the document first
    if document_type is None:
        context_info = analyze_document_context(document_text)
        document_type = context_info.get("document_type")
    
    try:
        # Get the context analysis task
        extraction_prompt_path = os.path.join(os.path.dirname(__file__), "extraction_prompt.yml")
        task = create_task(extraction_prompt_path)
        # Handle the case where the task is not found or some other error occurs
    except FileNotFoundError as e:
        raise FileNotFoundError(f"extraction prompt file not found: {extraction_prompt_path}") from e

    # Get the extraction task
    
    # Run the task with the document text and type
    exec_ = client.executions.create(
        task_id=task.id,
        input={
            "document_text": document_text,
            "document_type": document_type,
            "extraction_fields": get_extraction_fields(document_type)
        }
    )
    while (res := client.executions.get(exec_.id)).status not in ["succeeded", "failed"]:
        time.sleep(1)

    if res.status == "succeeded":
        output = res.output['choices'][0]['message']['content']
        return output
    else:
        print("Error: in the task execution extraction") 
        raise Exception(f"Task execution failed: {res.error}")

def get_extraction_fields(document_type):
    """
    Get the appropriate extraction fields based on document type.
    
    Args:
        document_type (str): Type of document (resume, article, etc.)
        
    Returns:
        dict: Fields to extract for the given document type
    """
    # Define extraction fields for different document types
    extraction_fields = {
        "resume": {
            "personal_info": ["name", "email", "phone", "location", "linkedin", "website"],
            "education": ["institution", "degree", "field_of_study", "start_date", "end_date", "gpa", "achievements"],
            "experience": ["company", "position", "start_date", "end_date", "location", "description"],
            "projects": ["name", "description", "technologies", "url", "highlights"],
            "skills": ["category", "items"],
            "certifications": ["name", "issuer", "date", "expires"],
            "achievements": []
        },
        "article": {
            "title": [],
            "author": [],
            "publication_date": [],
            "summary": [],
            "content": [],
            "category": [],
            "tags": []
        },
        "research_paper": {
            "title": [],
            "authors": [],
            "abstract": [],
            "keywords": [],
            "sections": ["title", "content"],
            "references": ["citation", "doi"]
        },
        "invoice": {
            "invoice_number": [],
            "date": [],
            "due_date": [],
            "vendor": ["name", "address", "contact"],
            "client": ["name", "address", "contact"],
            "items": ["description", "quantity", "unit_price", "total"],
            "subtotal": [],
            "tax": [],
            "total": [],
            "payment_terms": []
        },
        # Add more document types as needed
    }
    
    # Return fields for the specified document type, or a generic structure if not found
    return extraction_fields.get(document_type, {"content": [], "metadata": []})