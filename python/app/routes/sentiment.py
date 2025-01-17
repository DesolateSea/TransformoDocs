from flask_restful import Resource, request
from flask import current_app
from app.services.pipelines import sentiment_pipeline

class SentimentAnalysis(Resource):
    def get(self):
        text = request.args.get('text')
        if not text:
            return {"error": "Missing 'text' parameter."}, 400

        current_app.logger.info(f"Received text for sentiment analysis: {text}")
        try:
            sentiment = sentiment_pipeline(text)
        except Exception as e:
            current_app.logger.error(f"Error during sentiment analysis: {e}")
            return {"error": "Sentiment analysis failed", "details": str(e)}, 500

        return {"message": "Sentiment analysis complete", "sentiment": sentiment}, 200
