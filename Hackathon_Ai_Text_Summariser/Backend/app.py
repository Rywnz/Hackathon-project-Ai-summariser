from flask import Flask, request, jsonify
import requests

app = Flask(__name__)



API_KEY = "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"  
API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"

@app.route('/summarize', methods=['POST'])
def summarize_text():
    input_text = request.json.get('text')

    if not input_text:
        return jsonify({"error": "No text provided"}), 400

    prompt = f"Summarize this text in a chaotic, brainrot style: {input_text}"

    headers = {"Authorization": f"Bearer {API_KEY}"}
    payload = {"inputs": prompt}

    try:
        response = requests.post(API_URL, headers=headers, json=payload)

        if response.ok:
            summary = response.json()[0]['summary_text']
            return jsonify({"summary": summary})
        else:
            return jsonify({"error": "Error in summarization"}), 500

    except Exception as e:
        print(f"Request failed: {e}")
        return jsonify({"error": "Error in summarization"}), 500

if __name__ == '__main__':
    app.run(debug=True)
