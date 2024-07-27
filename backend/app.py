from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Load the summarization model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.route('/upload', methods=['POST'])
def upload_file():
    # Handle file upload
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the file locally
    filepath = f"./uploads/{file.filename}"
    file.save(filepath)

    return jsonify({'message': 'File uploaded successfully', 'filename': file.filename})

@app.route('/summarize', methods=['POST'])
def summarize():
    # Implement document summarization
    data = request.json
    text = data.get('text', '')

    # Check if the text is empty
    if not text:
        return jsonify({'error': 'No text provided for summarization'}), 400

    # Perform summarization using the model
    try:
        summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
        summary_text = summary[0]['summary_text']
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'summary': summary_text})

if __name__ == '__main__':
    app.run(debug=True)