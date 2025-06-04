from flask_restful import Resource, request
# from flask import jsonify
import PyPDF2
from app.agents.DataExtractor.agent import extract_document_data, analyze_document_context
import traceback
import json
from app.utility.deep_jsonify import deep_jsonify
class DataExtractor(Resource):
    def post(self):
        # Check if file is provided
        if 'file' not in request.files:
            return {"message": "No file provided"}, 400

        file = request.files['file']
        if file.filename == '':
            return {"message": "No selected file"}, 400

        # Get optional parameters
        analyze_only = request.form.get('analyze_only', 'false').lower() == 'true'
        document_type = request.form.get('document_type', None)

        try:
            # Extract text based on file type
            text = ""
            if file.filename.lower().endswith('.pdf'):
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text() or ""
            elif file.filename.lower().endswith(('.txt', '.md')):
                text = file.read().decode('utf-8')
            else:
                return {"message": "Unsupported file format. Only PDF, TXT, and MD files are allowed."}, 400

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
