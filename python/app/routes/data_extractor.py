from flask_restful import Resource, request
# from flask import jsonify
import PyPDF2
from app.agents.DataExtractor.agent import extract_document_data, analyze_document_context
import traceback
import json
from app.utility.deep_jsonify import deep_jsonify
class DataExtractor(Resource):
    def get(self):
        try:
            text = request.args.get('text')
            # Get optional parameters
            print("Text: " + text)
            analyze_only = request.args.get('analyze_only', 'false').lower() == 'true'
            document_type = request.args.get('document_type', None)

            # Analyze only mode
            if analyze_only:
                result = analyze_document_context(text)
                # Deep jsonify the result to ensure it's a JSON-serializable object
                return {"message": "Document context analyzed", "context": deep_jsonify(result)}, 200

            # If document_type not provided, infer it first
            if not document_type:
                context = analyze_document_context(text)
                context_info = json.loads(context)
                document_type = context_info.get('document_type', None)
                if not document_type:
                    return {"message": "Unable to determine document type for extraction"}, 400

            # Extract data using the determined document_type
            result = extract_document_data(text, document_type=document_type)
            # Safely convert string to dict if needed
            if isinstance(result, str):
                try:
                    result = json.loads(result)
                except json.JSONDecodeError:
                    return {"message": "Failed to parse extracted data."}, 500

            # Return JSON response
            return {"message": "Data extracted successfully", "data": deep_jsonify(result)}, 200
        except Exception as e:
            traceback.print_exc()  # This logs the full traceback to your console/logs
            return {"message": f"Error processing file: {str(e)}"}, 500
