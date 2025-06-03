import os
import sys
import PyPDF2
from pathlib import Path

# Add the parent directory to sys.path to import the agent module
sys.path.insert(0, str(Path(__file__).parent.parent.parent.parent))

from app.agents.DataExtractor.agent import extract_document_data, analyze_document_context

def extract_from_pdf(pdf_path):
    """
    Extract text from a PDF file and process it using the DataExtractor agent
    
    Args:
        pdf_path (str): Path to the PDF file
        
    Returns:
        dict: Structured data extracted from the PDF
    """
    # Extract text from PDF
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text()
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return None
    
    # First analyze the document context
    print("Analyzing document context...")
    context = analyze_document_context(text)
    print(f"Detected document type: {context.get('document_type')}")
    print(f"Content summary: {context.get('content_summary')}")
    
    # Process the text using the DataExtractor agent
    print("\nExtracting structured data...")
    result = extract_document_data(text)
    return result

def extract_from_text(text_path):
    """
    Extract text from a text file and process it using the DataExtractor agent
    
    Args:
        text_path (str): Path to the text file
        
    Returns:
        dict: Structured data extracted from the text file
    """
    try:
        with open(text_path, 'r', encoding='utf-8') as file:
            text = file.read()
    except Exception as e:
        print(f"Error reading text file: {e}")
        return None
    
    # First analyze the document context
    print("Analyzing document context...")
    context = analyze_document_context(text)
    print(f"Detected document type: {context.get('document_type')}")
    print(f"Content summary: {context.get('content_summary')}")
    
    # Process the text using the DataExtractor agent
    print("\nExtracting structured data...")
    result = extract_document_data(text)
    return result

def main():
    # Example usage
    if len(sys.argv) < 2:
        print("Usage: python example.py <path_to_file>")
        return
    
    file_path = sys.argv[1]
    
    if file_path.lower().endswith('.pdf'):
        result = extract_from_pdf(file_path)
    elif file_path.lower().endswith(('.txt', '.md')):
        result = extract_from_text(file_path)
    else:
        print("Unsupported file format. Please provide a PDF or text file.")
        return
    
    if result:
        print("\nExtracted Information:")
        print(result)

if __name__ == "__main__":
    main()