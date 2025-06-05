"""TransformoDocs Package

A modular interface for document processing and NLP services.
"""

from typing import Optional, Dict, Any, BinaryIO

class TransformoDocs:
    def __init__(self, api_key: str, api_secret: str):
        self.api_key = api_key
        self.api_secret = api_secret
        
    def convert_pdf_to_text(self, file: BinaryIO) -> str:
        """Convert PDF file to text.
        
        Args:
            file: PDF file object
            
        Returns:
            Extracted text from PDF
        """
        raise NotImplementedError("Method will be implemented by service providers")
    
    def extract_data(self, text: str) -> Dict[str, Any]:
        """Extract structured data from text using NLP.
        
        Args:
            text: Input text to process
            
        Returns:
            Dictionary containing extracted information
        """
        raise NotImplementedError("Method will be implemented by service providers")

__version__ = '0.1.0'
__all__ = ['TransformoDocs']