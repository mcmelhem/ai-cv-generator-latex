# 🚀 LaTeXGen AI

Generate **professional, AI-powered LaTeX CVs** tailored to job descriptions in seconds.

---

## ✨ Overview

LaTeXGen AI is a full-stack application that helps users create **customized CVs** by combining:

* 🧠 AI-generated content
* 📄 Structured user input
* 🎯 Job description matching

It outputs **clean LaTeX code** ready for compilation into a polished PDF resume.

---

## ⚡ Features

* ✍️ Generate CV from user inputs (experience, education, projects, etc.)
* 🎯 Tailor CV based on job description
* 📄 Output in LaTeX format
* 📋 Copy-to-clipboard functionality
* 📤 *(In progress)* Upload existing CV for data extraction
* 📥 *(In progress)* Export CV as PDF

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Bootstrap

### Backend

* Flask (Python)
* Flask-CORS

### AI

* OpenAI API

---

## 📁 Project Structure

```
ai-generator/
├── frontend/     # React application
├── backend/      # Flask API
├── README.md
├── .gitignore
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/latexgen-ai.git
cd latexgen-ai
```

---

### 2️⃣ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### 3️⃣ Run Backend

```bash
cd backend
venv\Scripts\activate     # Windows
# OR
source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt
python app.py
```

---

### 4️⃣ Environment Variables

Create a `.env` file in the backend:

```env
OPENAI_API_KEY=your_api_key_here
```

---

## ⚙️ How It Works

1. User enters CV information + job description
2. Data is sent to Flask backend
3. Backend calls OpenAI API
4. AI generates tailored LaTeX CV
5. User copies or downloads output

---

## 🔮 Future Improvements

* 📄 Upload and parse existing CV (PDF/DOCX)
* 📥 Export LaTeX to PDF
* 🎨 Multiple CV templates
* 🔐 User authentication
* 🌐 Deployment (live demo)

---



## 💡 Author

Built by **Marieclaire Melhem**

---

## ⭐ Why This Project

This project demonstrates:

* Full-stack development (React + Flask)
* API integration
* AI-powered applications
* Real-world product thinking

---

## 📬 Contact

Feel free to reach out or contribute!
