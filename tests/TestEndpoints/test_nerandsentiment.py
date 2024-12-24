"""To Run the tests:

python -m unittest tests/TestEndpoints/test_nerandsentiment.py

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

class TestNERAndSentiment(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Set up the Flask application for testing."""
        cls.client = app.test_client()
        cls.app = app

    def test_ner_missing_text(self):
        """Test if NER returns error when no 'text' parameter is provided."""
        response = self.client.get('/ner')  # Send GET request without 'text' parameter
        self.assertEqual(response.status_code, 400)  # Expecting a 400 error
        self.assertIn('Missing \'text\' parameter', response.json['error'])  # Check if the error message matches

    def test_ner_successful(self):
        """Test if NER successfully processes text and returns entities."""
        text = "Barack Obama was born in Hawaii."
        response = self.client.get(f'/ner?text={text}')  # Send GET request with 'text' parameter
        self.assertEqual(response.status_code, 200)  # Expecting a 200 response
        self.assertIn('entities', response.json)  # Check if the response contains the "entities" key
        self.assertGreater(len(response.json['entities']), 0)  # Ensure that entities are detected

    def test_ner_error_processing(self):
        """Test if NER handles errors during processing."""
        # Simulate an error in NER processing
        text = "invalid input"
        response = self.client.get(f'/ner?text={text}')
        self.assertEqual(response.status_code, 200)  # Expecting a 200, but handle the NER logic failure gracefully
        self.assertIn('entities', response.json)  # Check if the response contains the "entities" key
        self.assertEqual(len(response.json['entities']), 0)  # Ensure no entities are detected

    def test_sentiment_missing_text(self):
        """Test if Sentiment Analysis returns error when no 'text' parameter is provided."""
        response = self.client.get('/sentiment')  # Send GET request without 'text' parameter
        self.assertEqual(response.status_code, 400)  # Expecting a 400 error
        self.assertIn('Missing \'text\' parameter', response.json['error'])  # Check if the error message matches

    def test_sentiment_successful(self):
        """Test if Sentiment Analysis successfully processes text and returns sentiment."""
        text = "I love the weather today!"
        response = self.client.get(f'/sentiment?text={text}')  # Send GET request with 'text' parameter
        self.assertEqual(response.status_code, 200)  # Expecting a 200 response
        self.assertIn('sentiment', response.json)  # Check if the response contains the "sentiment" key
        self.assertIn('label', response.json['sentiment'][0])  # Sentiment response should contain a 'label' (positive/negative)
        self.assertIn('score', response.json['sentiment'][0])  # Sentiment response should also contain a 'score'

    def test_sentiment_error_processing(self):
        """Test if Sentiment Analysis handles errors during processing."""
        # Simulate an error in sentiment analysis processing
        text = "invalid input"
        response = self.client.get(f'/sentiment?text={text}')
        self.assertEqual(response.status_code, 200)  # Expecting a 200, handle the sentiment analysis logic gracefully
        self.assertIn('sentiment', response.json)  # Check if the response contains the "sentiment" key
        self.assertEqual(response.json['sentiment'][0]['label'], 'NEGATIVE')  # Expect a fallback sentiment

if __name__ == '__main__':
    unittest.main()
