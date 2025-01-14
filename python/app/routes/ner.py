from flask_restful import Resource, request
from flask import jsonify
from app.services.pipelines import ner_pipeline
import numpy as np

class NamedEntityRecognition(Resource):
    def get(self):
        text = request.args.get('text')
        if not text:
            return {"error": "Missing 'text' parameter."}, 400
        
        raw_entities = ner_pipeline(text)
        entities = [
            {key: (float(value) if isinstance(value, np.float32) else value) for key, value in entity.items()}
            for entity in raw_entities
        ]

        return jsonify({
            "message": "NER analysis complete",
            "entities": entities
        })
