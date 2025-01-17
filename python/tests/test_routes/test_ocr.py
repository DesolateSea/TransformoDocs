"""Run tests with: python -m unittest tests/test_routes/test_ocr.py"""

import unittest
from io import BytesIO
from app import create_app

PDF_PATH = 'Parth_Co.pdf'  # Path to a valid PDF file for testing

class TestOCR(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.app = create_app()
        cls.client = cls.app.test_client()

    def test_ocr_missing_pdf(self):
        response = self.client.post('/ocr')  # No file sent
        self.assertEqual(response.status_code, 400)
        self.assertIn('No PDF file provided', response.json['message'])

    def test_ocr_successful_pdf(self):
        with open(PDF_PATH, 'rb') as pdf_file:
            data = {'pdf': (BytesIO(pdf_file.read()), 'test.pdf')}
            response = self.client.post('/ocr', data=data)
            self.assertEqual(response.status_code, 200)
            self.assertIn('message', response.json)
            self.assertIn('text', response.json)
            print(response.json['text'])

    def test_ocr_pdf_processing_error(self):
        data = {'pdf': (BytesIO(b"Invalid PDF content"), 'invalid.pdf')}
        response = self.client.post('/ocr', data=data)
        self.assertEqual(response.status_code, 500)

if __name__ == '__main__':
    unittest.main()
