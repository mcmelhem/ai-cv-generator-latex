import { useState } from 'react';
import './App.css'
import Form from './components/Form'
import 'bootstrap-icons/font/bootstrap-icons.css';
function App() {
  const [showUpload, setShowUpload] = useState(false);
  return (
    <>
     <div className="m-1">
        <img src=".\src\assets\logo.png" className='img-logo mt-2' alt="Logo"/>
     </div>
      <div className="container py-3">
      
        <div className="text-center mb-5">
          <h1 className="fw-bold  text-color">Create a Job-Winning CV in Seconds</h1>
          <p className="text-muted  text-color">
            Start from scratch or upload your existing CV. Get AI-powered Latex Resume.
          </p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-primary-custom px-4"
              onClick={() => setShowUpload(showUpload)}>
                 <i className='bi bi-pencil-square me-1'></i>
              Start from Scratch
            </button>

            <button
              className="btn btn-secondary-custom px-4"
              onClick={() => setShowUpload(!showUpload)}
            >
                <i className='bi  bi-upload me-1'></i>
              {showUpload ? "Hide Upload" : "Upload Existing CV"}
            </button>
          </div>

          <small className="text-muted d-block mt-2">
            Already have a CV? Upload it.
          </small>
        </div>

        <div className="form-section">
          <Form showUpload={showUpload} />
        </div>
      </div>
    </>
  )
}

export default App
