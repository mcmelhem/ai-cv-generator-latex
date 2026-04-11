from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
from flask import send_file
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

    if not data.get("name") or not data.get("email") or not data.get("phone") or not data.get("experience") or not data.get("jobDescription"):
            return jsonify({"error": "Missing required fields"}), 400

    strPrompt = f"""
    You are an expert CV writer. 
    Generate a LaTeX CV based on the following information with focus on
    matching the given information with the job description:

    Name: {data.get('name')}
    Phone: {data.get('phone', '')}
    Address: {data.get('address', '')}
    Education: {data.get('education', '')}
    Experience: {data.get('experience', '')}
    Projects: {data.get('projects', '')}
    Certificates: {data.get('certificates', '')}
    Skills: {data.get('skills', '')}
    Job Description:{data.get('jobDescription', '')}

    Note that output:
    - Do NOT escape backslashes
    - Do NOT use \\n
    - Return raw LaTeX code
    - Do NOT wrap in markdown
    """
    try:
        response = openai.chat.completions.create(
            model = "gpt-5-nano",
            messages = [{"role": "user", "content": strPrompt}],
            temperature = 1
        )

        
        ai_reponse = response.choices[0].message.content.strip()
        ai_reponse = ai_reponse.replace("```latex", "").replace("\\n", "\n").replace("\\\\", "\\")
        with open("cv.tex", "w", encoding="utf-8") as f:
            f.write(ai_reponse)

     
        subprocess.run(["pdflatex", "cv.tex"], check=True)

      
        return send_file("cv.pdf", as_attachment=True)

       

    except Exception as e:
        return jsonify({"error": str(e)}), 500
   
    

if __name__ == '__main__':
    app.run(debug=True)