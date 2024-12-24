"""To Run the tests:

python -m unittest tests/TestEndpoints/OCR.py

"""

import unittest
from io import BytesIO
from flask import Flask
from flask.testing import FlaskClient
import sys
import os

# Add the directory containing 'app.py' to the system path
sys.path.append(r'C:\Users\Nishant Mohan\Desktop\SIH\python-backend')

# Now you can import the 'app' module
from app import app  # Assuming app.py is the Flask application module

class TestOCR(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Set up the Flask application for testing."""
        cls.client = app.test_client()
        cls.app = app

    def test_ocr_missing_pdf(self):
        """Test if OCR returns error when no PDF is provided."""
        response = self.client.post('/ocr')  # Send a POST request without any files
        self.assertEqual(response.status_code, 400)  # Expecting a 400 error
        self.assertIn('No PDF file provided', response.json['message'])  # Check if the error message matches

    def test_ocr_successful_pdf(self):
        """Test if OCR returns text from a valid PDF."""
        with open('Parth_Co.pdf', 'rb') as pdf_file:  # Replace with your actual PDF file path
            data = {
                'pdf': (BytesIO(pdf_file.read()), 'test.pdf')  # Simulating a PDF upload
            }
            response = self.client.post('/ocr', data=data)  # Send the PDF in the request
            self.assertEqual(response.status_code, 200)  # Expecting a 200 response
            self.assertIn('message', response.json)  # Check if the response contains the "message" key
            self.assertIn('text', response.json)  # Check if the response contains the "text" key
            print(response.json['text'])  # Print the response JSON

    def test_ocr_pdf_processing_error(self):
        """Test if OCR handles PDF processing errors correctly."""
        # Simulating an invalid file (non-PDF or corrupted PDF)
        data = {
            'pdf': (BytesIO(b"Invalid PDF content"), 'invalid.pdf')  # Simulating an invalid PDF
        }
        response = self.client.post('/ocr', data=data)  # Send the invalid file in the request
        self.assertEqual(response.status_code, 500)  # Expecting a 500 error (server-side issue)

if __name__ == '__main__':
    unittest.main()
