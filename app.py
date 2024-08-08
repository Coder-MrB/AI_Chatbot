from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import config


app = Flask(__name__)

genai.configure(api_key=config.GEMINI_API_KEY)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/message", methods=["POST"])
def message():
    message = request.form["message"]
    response = get_gemini_response(message)
    return jsonify({"message": response})


def get_gemini_response(query):
    prompt = f"Respond to the user's query: {query}"
    try:
        response = genai.generate_text(prompt=prompt)
        return f"{response.result}"
    except Exception as e:
        print(f"Error generating response: {e}")
        return "Sorry, I encountered an error. Please try again later."


if __name__ == "__main__":
    app.run(debug=True)
