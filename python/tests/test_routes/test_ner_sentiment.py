import unittest
from app import create_app

class TestNERAndSentiment(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.app = create_app()
        cls.client = cls.app.test_client()

    def test_ner_missing_text(self):
        response = self.client.get('/ner')
        self.assertEqual(response.status_code, 400)
        self.assertIn('Missing \'text\' parameter', response.json['error'])

    def test_ner_successful(self):
        text = "Barack Obama was born in Hawaii."
        response = self.client.get(f'/ner?text={text}')
        self.assertEqual(response.status_code, 200)
        self.assertIn('entities', response.json)
        self.assertGreater(len(response.json['entities']), 0)

    def test_ner_error_processing(self):
        text = "invalid input"
        response = self.client.get(f'/ner?text={text}')
        self.assertEqual(response.status_code, 200)
        self.assertIn('entities', response.json)
        self.assertEqual(len(response.json['entities']), 0)

    def test_sentiment_missing_text(self):
        response = self.client.get('/sentiment')
        self.assertEqual(response.status_code, 400)
        self.assertIn('Missing \'text\' parameter', response.json['error'])

    def test_sentiment_successful(self):
        text = "I love the weather today!"
        response = self.client.get(f'/sentiment?text={text}')
        self.assertEqual(response.status_code, 200)
        self.assertIn('sentiment', response.json)
        self.assertIn('label', response.json['sentiment'][0])
        self.assertIn('score', response.json['sentiment'][0])

    def test_sentiment_error_processing(self):
        text = "invalid input"
        response = self.client.get(f'/sentiment?text={text}')
        self.assertEqual(response.status_code, 200)
        self.assertIn('sentiment', response.json)
        self.assertEqual(response.json['sentiment'][0]['label'], 'NEGATIVE')

if __name__ == '__main__':
    unittest.main()
