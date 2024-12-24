from PyPDF2 import PdfReader
from flask import Flask, request, jsonify,make_response
from flask_restful import Resource, Api
from transformers import pipeline
from werkzeug.utils import secure_filename

import numpy as np
app = Flask(__name__)
api = Api(app)
# Named Entity Recognition (NER) pipeline
ner_pipeline = pipeline("ner", model="dbmdz/bert-large-cased-finetuned-conll03-english")

# Sentiment Analysis pipeline
sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")


class NamedEntityRecognition(Resource):
    def get(self):
        text = request.args.get('text')
        if not text:
            return {"error": "Missing 'text' parameter."}, 400  # Explicit HTTP 400 for bad request

        # Get entities from the NER pipeline
        raw_entities = ner_pipeline(text)

        # Convert float32 to float for JSON serialization
        entities = [
            {key: (float(value) if isinstance(value, np.float32) else value) for key, value in entity.items()}
            for entity in raw_entities
        ]

        return jsonify({
            "message": "NER analysis complete",
            "entities": entities
        })
class SentimentAnalysis(Resource):
    def get(self):
        text = request.args.get('text')
        if not text:
            return {"error": "Missing 'text' parameter."}, 400  # Explicit HTTP 400 for bad request
        
        app.logger.info(f"Received text for sentiment analysis: {text}")
        
        try:
            sentiment = sentiment_pipeline(text)
        except Exception as e:
            app.logger.error(f"Error during sentiment analysis: {e}")
            return {"error": "Sentiment analysis failed", "details": str(e)}, 500  # HTTP 500 for server error
        
        # Return JSON response
        return {
            "message": "Sentiment analysis complete",
            "sentiment": sentiment
        }, 200  # Explicit HTTP 200

class OCR(Resource):
    def post(self):
        # Check if 'pdf' is part of the request
        if 'pdf' not in request.files:
            return make_response({"message": "No PDF file provided"}, 400)
        
        pdf = request.files['pdf']

        # Check if the file is empty
        if pdf.filename == '':
            return make_response({"message": "No selected file"}, 400)

        # Ensure the file is a valid PDF
        if not pdf.filename.lower().endswith('.pdf'):
            return make_response({"message": "Invalid file format. Only PDF is allowed."}, 400)

        try:
            # Converting PDF to text
            reader = PdfReader(pdf)

            # Extract text, replace None with empty string
            out = [page.extract_text() or "" for page in reader.pages]

            response = make_response({"message": "Text extracted from PDF", "text": out})
            response.status_code = 200
            return response
        except Exception as e:
            # Catch any error related to PDF reading
            return make_response({"message": f"Error reading PDF: {str(e)}"}, 500)


@app.route('/health')
def health():
    return jsonify({"status": "healthy"})

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500



# Add resources to the API
api.add_resource(NamedEntityRecognition, '/ner')           # Example: GET /ner?text=SomeText
api.add_resource(SentimentAnalysis, '/sentiment')          # Example: GET /sentiment?text=SomeText
api.add_resource(OCR, '/ocr')                             # Example: POST /ocr
if __name__ == '__main__':
    app.run(debug=True)
