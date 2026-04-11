from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI
from langchain_classic.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate
from flask import send_file
from dotenv import load_dotenv
from openai import OpenAI
import subprocess
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

   
def load_file(file_path):
    if file_path.endswith(".pdf"):
        loader = PyPDFLoader(file_path)
    elif file_path.endswith(".docx"):
        loader = Docx2txtLoader(file_path)
    else:
        raise ValueError("Unsupported file format")

    documents = loader.load()
    return documents

def split_file(documents):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )
    return splitter.split_documents(documents)

def create_vectordb(chunks):
    embedding = OpenAIEmbeddings()
    vectordb = Chroma.from_documents(chunks, embedding)
    return vectordb

def get_retriever(vectordb):
    return vectordb.as_retriever(search_kwargs={"k": 4})

def build_chain(retriever, prompt):
    llm = ChatOpenAI(temperature=0)

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt}
    )
    return qa_chain

def generate_cv_rag(file_path, job_description, prompt):
    docs = load_file(file_path)
    chunks = split_file(docs)
    vectordb = create_vectordb(chunks)
    retriever = get_retriever(vectordb)
    chain = build_chain(retriever, prompt)
    
    print(chain)
    result = chain.run(job_description)
    return result    

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/generateCVFromFile', methods=['POST'])
def generate_cv_from_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    job_description = request.form.get('job_description', '')
 
    print("Received job description:", job_description)
    file_path = os.path.join("uploads", file.filename)
    os.makedirs("uploads", exist_ok=True)

    file.save(file_path)
    
    template = """
            You are a professional CV writer.

           Your task is to rewrite a CV to MAXIMALLY match the job description using the provided context.

            - Tailor experience to match the job
            - Use strong action verbs
            - Keep it concise
            - Do NOT invent fake experience

            OUTPUT MUST BE VALID LATEX ONLY.

            Job Description:
            {question}

            Context:
            {context}
            If the context is not relevant to the job description, 
            Send a message saying "The provided CV does not contain relevant information for the job description." 
            and do NOT attempt to generate a CV.
            Note that output:
            - Do NOT escape backslashes
            - Do NOT use \\n
            - Return raw LaTeX code
            - Do NOT wrap in markdown
            """

    prompt = PromptTemplate(
        template=template,
        input_variables=["context", "question"]
    )

    try:
        latex = generate_cv_rag(file_path, job_description, prompt)
        return jsonify({"response": latex})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)