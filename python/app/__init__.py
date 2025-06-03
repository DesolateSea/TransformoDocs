from flask import Flask
from flask_restful import Api
from app.routes.ner import NamedEntityRecognition
from app.routes.sentiment import SentimentAnalysis
from app.routes.ocr import OCR
from app.routes.data_extractor import DataExtractor

def create_app():
    app = Flask(__name__)
    
    api = Api(app)
    
    # Add routes
    api.add_resource(NamedEntityRecognition, '/ner')
    api.add_resource(SentimentAnalysis, '/sentiment')
    api.add_resource(OCR, '/ocr')
    api.add_resource(DataExtractor, '/data-extractor')
    
    # Health check route
    @app.route('/health')
    def health():
        return {"status": "healthy"}
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {"error": "Resource not found"}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return {"error": "Internal server error"}, 500
    
    return app
