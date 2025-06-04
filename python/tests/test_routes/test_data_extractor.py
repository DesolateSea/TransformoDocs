import os
import sys
import unittest
import json
from io import BytesIO
from pathlib import Path
from app import create_app

class TestDataExtractorRoute(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        self.test_data_dir = os.path.join(os.path.dirname(__file__), 'test_data')
        
        # Create test_data directory if it doesn't exist
        os.makedirs(self.test_data_dir, exist_ok=True)
        
        # Create a simple test text file
        self.test_text_path = os.path.join(self.test_data_dir, 'test_resume.txt')
        with open(self.test_text_path, 'w') as f:
            f.write("""John Doe
Email: john.doe@example.com
Phone: (123) 456-7890

EDUCATION
University of Example, Bachelor of Science in Computer Science
2018-2022
GPA: 3.8/4.0

EXPERIENCE
Software Engineer, Tech Company Inc.
June 2022 - Present
- Developed and maintained web applications using React and Node.js
- Implemented CI/CD pipelines using GitHub Actions""")

    def test_data_extractor_with_text_file(self):
        # Test with a text file
        with open(self.test_text_path, 'rb') as f:
            response = self.client.post(
                '/data-extractor',
                data={'file': (BytesIO(f.read()), 'test_resume.txt')}
            )
        print(response.status_code)
        print(response.data)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('message', data)
        self.assertIn('data', data)
        self.assertEqual(data['message'], 'Data extracted successfully')
        
        # Check that the extracted data contains expected fields for a resume
        extracted_data = data['data']
        self.assertIn('personal_info', extracted_data)
        self.assertIn('name', extracted_data['personal_info'])
        self.assertEqual(extracted_data['personal_info']['name'], 'John Doe')

    def test_analyze_only_mode(self):
        # Test with analyze_only=true
        with open(self.test_text_path, 'rb') as f:
            response = self.client.post(
                '/data-extractor',
                data={
                    'file': (BytesIO(f.read()), 'test_resume.txt'),
                    'analyze_only': 'true'
                }
            )
            
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('message', data)
        self.assertIn('context', data)
        self.assertEqual(data['message'], 'Document context analyzed')
        
        # Check that the context contains expected fields
        context = data['context']        
        self.assertIn('document_type', context)
        self.assertEqual(context['document_type'], 'resume')

    def test_with_document_type_specified(self):
        # Test with document_type specified
        with open(self.test_text_path, 'rb') as f:
            response = self.client.post(
                '/data-extractor',
                data={
                    'file': (BytesIO(f.read()), 'test_resume.txt'),
                    'document_type': 'resume'
                }
            )
            
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('message', data)
        self.assertIn('data', data)
        self.assertEqual(data['message'], 'Data extracted successfully')

    def test_no_file_provided(self):
        # Test with no file provided
        response = self.client.post('/data-extractor')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'No file provided')

    def tearDown(self):
        # Clean up test files
        if os.path.exists(self.test_text_path):
            os.remove(self.test_text_path)

if __name__ == '__main__':
    unittest.main()