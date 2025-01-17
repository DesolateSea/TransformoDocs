from flask_restful import Resource, request
from flask import make_response
from PyPDF2 import PdfReader

class OCR(Resource):
    def post(self):
        if 'pdf' not in request.files:
            return make_response({"message": "No PDF file provided"}, 400)

        pdf = request.files['pdf']
        if pdf.filename == '':
            return make_response({"message": "No selected file"}, 400)

        if not pdf.filename.lower().endswith('.pdf'):
            return make_response({"message": "Invalid file format. Only PDF is allowed."}, 400)

        try:
            reader = PdfReader(pdf)
            out = [page.extract_text() or "" for page in reader.pages]

            return make_response({"message": "Text extracted from PDF", "text": out}, 200)
        except Exception as e:
            return make_response({"message": f"Error reading PDF: {str(e)}"}, 500)
