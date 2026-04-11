import { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ClipLoader } from "react-spinners";
import './Form.css'

function Form({ showUpload }) {
  const [jobDescription, setJobDescription] = useState('');
  const [cvResult, setCvResult] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const handleFileBrowse = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();

    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file?.name || "");
    console.log(file);
  };
  const [formData, setFormData] = useState(
    {
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      address: '',
      skills: '',
      experience: '',
      company: '',
      education: '',
      projects: '',
      jobDescription: ''
    }
  );
  const [openSection, setOpenSection] = useState("jobdescription");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  const SectionHeader = ({ id, icon, title }) => (
    <div
      onClick={() => toggleSection(id)}
      className="d-flex justify-content-between align-items-center p-2 border-bottom"
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex align-items-center gap-2  text-color">
        <i className={`bi bi-plus icon-color`}></i>
        <strong>{title}</strong>
      </div>

      {/* Arrow Icon */}
      <i
        className={`icon-color bi ${openSection === id ? "bi-chevron-up" : "bi-chevron-down"
          }`}
      ></i>
    </div>
  );
  function validateForm() {

    var strError = "";
    if (formData.name == "") {
      strError = strError == "" ? "Name is Required" : strError + " and Name is Required";
    }
    if (formData.email == "") {
      strError = strError == "" ? "Email is Required" : strError + " and Email is Required";
    }
    if (formData.phone == "") {
      strError = strError == "" ? "Phone is Required" : strError + " and Phone is Required";
    }
    if (formData.experience == "") {
      strError = strError == "" ? "Experience is Required" : strError + " and Experience is Required";
    }
    if (formData.jobDescription == "") {
      strError = strError == "" ? "Job Description is Required" : strError + " and Job Description is Required";
    }
    console.log(strError)
    return strError;
  }
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cvResult);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);

    }
  };


  async function handleGenerate() {
    const formError = validateForm();

    if (formError != "") {
      setError(formError);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/generateCV", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();

      setCvResult(data.response);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cv.pdf";
      a.click();


    } catch (error) {
      setError(error)

    } finally {
      setLoading(false)
    }
  }
  async function handleGenerateCV() {
    const formError = validateForm();

    if (formError != "") {
      setError(formError);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/generateCV", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();

      setCvResult(data.response);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cv.pdf";
      a.click();


    } catch (error) {
      setError(error)

    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Layout */}
      <div className="row g-4 shadow-sm main-card p-4">
        {loading && (
          <div className="d-flex justify-content-center align-items-center mt-4">
            <ClipLoader color="rgb(37 38 62 / 85%);" size={50} />
          </div>
        )}
        {/* LEFT SIDE */}
        <div className="col-lg-4">

          {/* Manual Form */}
          {!showUpload &&
            (<div className="card shadow-sm mb-4">
              <div className="card-body d-flex flex-column">
                {/* Title with Icon */}
                <h5 className="card-title d-flex align-items-center gap-2  text-color">
                  <img src=".\src\assets\form-img.png" className='img-form' alt="Icon" />
                  Start from Scratch
                </h5>
                <p className="subtext text-color">
                  Enter your details and job description to generate a tailored CV.
                </p>

                {/* Accordion */}
                <div className="accordion mt-1" id="cvAccordion">
                  {/* Personal Info */}
                  <SectionHeader
                    id="personal"
                    icon="bi-person"
                    title="Personal Info"
                  />
                  {openSection === "personal" && (
                    <div className="accordion-body">
                      <input className="form-control mb-2" placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                      <input className="form-control mb-2" placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                      <input className="form-control mb-2" placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Github"
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })} />

                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Linkedin"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} />
                    </div>
                  )}
                  {/* Skills */}
                  <SectionHeader
                    id="education"
                    icon="bi-graduation-cap"
                    title="Education"
                  />
                  {openSection === "education" && (
                    <div className="accordion-body">
                      <textarea
                        className="form-control"
                        placeholder="Education"
                        value={formData.education}
                        onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      />
                    </div>

                  )}
                  <SectionHeader
                    id="experience"
                    icon="bi-briefcase"
                    title="Experience"
                  />

                  {openSection === "experience" && (
                    <div className="accordion-body">
                      <input
                        className="form-control mb-2"
                        placeholder="Job Title"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      />
                      <input
                        className="form-control mb-2"
                        placeholder="Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />


                    </div>

                  )}
                  {/* Skills */}
                  <SectionHeader
                    id="skills"
                    icon="bi-tools"
                    title="Skills"
                  />
                  {openSection === "skills" && (
                    <div className="accordion-body">
                      <textarea
                        className="form-control"
                        placeholder="e.g. React, Python, SQL"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      />
                    </div>

                  )}
                  <SectionHeader
                    id="jobdescription"
                    icon="bi-briefcase"
                    title="Job Description"
                  />

                  {openSection === "jobdescription" && (
                    <div className="accordion-body">
                      <textarea
                        name="job-description"
                        className="job-description form-control"
                        id="job-description"
                        placeholder='Job Description...'
                        cols={30}
                        rows={2}
                        value={formData.jobDescription}
                        onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                      ></textarea>
                    </div>
                  )}
                </div>
                <button className="btn btn-primary-custom mx-0 align-self-center mt-2" onClick={() => handleGenerate()}>
                  Generate CV
                </button>

              </div>
            </div>
            )}
          {/* Upload Section (Hidden) */}
          {showUpload && (
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column gap-2">
                <h5 className="card-title text-color">
                  <img src=".\src\assets\upload-img.png" className='img-upload' alt="Icon" />
                  Upload Your CV</h5>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                {fileName ? (
                  <div className="border border-2 border-dashed p-4 text-center rounded">
                    <span>📄 {fileName}</span>
                  </div>
                ) : (
                  <div className="border border-2 border-dashed p-4 text-center rounded">
                    <p className="mb-2">Drag & Drop your CV</p>
                    <button className="btn btn-primary btn-sm" onClick={handleFileBrowse}>
                      Browse Files
                    </button>
                  </div>
                )}

                {/* Extracted Info */}
                <div className="mt-3 small">
                  <p><strong>Name:</strong> </p>
                  <p><strong>Experience:</strong> </p>
                  <p><strong>Skills:</strong> </p>
                </div>

                <button className="btn btn-primary btn-primary-custom align-self-center mt-2" onClick={handleGenerateWithCV}>
                  Enhance with AI
                </button>
              </div>
            </div>
          )}
        </div>
        {/* RIGHT SIDE */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body cv-preview">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">CV Preview</h5>
                <div className='mt-1'>
                  {cvResult != '' ? (
                    <div className="result">
                      <textarea
                        name="cv-result"
                        className="cv-result form-control"
                        id="cv-result"
                        placeholder='Generated CV LaTeX will appear here...'
                        cols={30}
                        rows={20}
                        value={cvResult}
                        readOnly
                      ></textarea>
                      <button className="btn btn-secondary mt-1" onClick={copyToClipboard}>Copy</button>

                    </div>
                  )
                    :
                    ''
                  }
                </div>
              </div>
              {/* Preview */}
              <div className="border rounded p-3 bg-light">
                <h4>Name</h4>
                <p className="text-muted">
                  Professional summary goes here...
                </p>

                <h6 className="mt-3">Experience</h6>
                <ul>
                  <li>Worked on frontend applications</li>
                  <li>Improved performance by 30%</li>
                </ul>
                <h6 className="mt-3">Skills</h6>
                <p>React, JavaScript, CSS</p>
              </div>
              {/* Actions */}
              <div className="mt-3 d-flex gap-2">
                <button className="btn btn-outline-secondary btn-sm">
                  <i className='bi bi-download me-1'></i>
                  Download PDF
                </button>
                <button className="btn btn-outline-secondary btn-sm">
                  <i className='bi bi-clipboard me-1'></i>
                  Copy LaTeX
                </button>
                <button className="btn btn-outline-secondary btn-sm">
                  <i className='bi bi-arrow-repeat me-1'></i>
                  Regenerate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
export default Form
