from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from transformers import pipeline

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
            return jsonify({"error": "Missing 'text' parameter."})

        entities = ner_pipeline(text)
        
        return jsonify({
            "message": "NER analysis complete",
            "entities": entities
        })

class SentimentAnalysis(Resource):
    def get(self):
        text = request.args.get('text')
        if not text:
            return jsonify({"error": "Missing 'text' parameter."})

        sentiment = sentiment_pipeline(text)
        
        return jsonify({
            "message": "Sentiment analysis complete",
            "sentiment": sentiment
        })


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

if __name__ == '__main__':
    app.run(debug=True)
