from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
import os   
load_dotenv()

openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
app = Flask(__name__)
CORS(app)
@app.route('/generateCV', methods=['POST'])
def generate_cv():
    data = request.get_json() 
    strPrompt = f"""
    You are an expert CV writer. 
    Generate a LaTeX CV based on the following information with focus on
    matching the given information with the job description:

    Name: {data.get('name')}
    Contact: {data.get('contact', '')}
    Education: {data.get('education', '')}
    Experience: {data.get('experience', '')}
    Projects: {data.get('projects', '')}
    Certificates: {data.get('certificates', '')}
    Skills: {data.get('skills', '')}
    Job Description:{data.get('jobDescription', '')}
    """
    response = openai.chat.completions.create(
        model="gpt-5-nano",
        messages=[{"role": "user", "content": strPrompt}],
        temperature=1
    )

    ai_reponse = response.choices[0].message.content

    return jsonify({"response": ai_reponse})
    

if __name__ == '__main__':
    app.run(debug=True)