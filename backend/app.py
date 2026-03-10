from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    language = data.get("language")
    level = data.get("level")

    prompt = f"Generate a {level} coding challenge in {language}. Only return the question."

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role":"user","content":prompt}]
    )

    question = response.choices[0].message.content

    return jsonify({"question": question})

if __name__ == "__main__":
    app.run(port=5000, debug=True)