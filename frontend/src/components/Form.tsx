import { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ClipLoader } from "react-spinners";
import { API_BASE_URL } from '../constants.js';
import './Form.css'


function Form({ showUpload }: { showUpload: boolean }) {
  const [jobDescription, setJobDescription] = useState('');
  const [cvResult, setCvResult] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [viewMode, setViewMode] = useState<"pdf" | "code">("code");
  const [openSection, setOpenSection] = useState<Section | null>("jobdescription");
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF or Word documents are allowed");
        event.target.value = "";
        return;
      }
      setFileName(file?.name || "");
    }
  };

  const handleFileBrowse = () => {
    fileInputRef.current?.click();
  };
  const allowedTypes = [
    "application/pdf",
    "application/msword",
  ];


  type Section = "personal" | "experience" | "skills" | "education" | "jobdescription";
  const toggleSection = (section: Section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const SectionHeader = ({ id, title }: { id: Section; icon: string; title: string }) => (
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

  const regenerateCV = () => {
    setPdfUrl("");
  }
  const compileLatex = async () => {
    const res = await fetch(`${API_BASE_URL}/getLatexPreview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latex: cvResult }),
    });

    const data = await res.json();
    setPdfUrl(data.pdf_url);
    console.log("PDF URL:", data.pdf_url);
    setViewMode("pdf");
  };

  async function handleGenerate() {
    const formError = validateForm();

    if (formError != "") {
      alert(formError);
      setError(formError);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/generateCV`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();

      setCvResult(data.response);



    } catch (error) {
      var message = error instanceof Error ? error.message : String(error);
      setError(message);

    } finally {
      setLoading(false)
    }
  }

  async function handleGenerateFromCV() {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      alert("Please upload a file");
      return;
    }
    if (jobDescription == "") {
      alert("Please enter a job description");
      return;
    }

    const bodyData = new FormData();
    bodyData.append("file", file);
    bodyData.append("job_description", formData.jobDescription);

    try {
      setLoading(true);
      setCvResult("");
      const response = await fetch("http://127.0.0.1:5000/generateCVFromFile", {
        method: "POST",
        body: bodyData,
      });
      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setCvResult(data.response);

    } catch (error) {
      var message = error instanceof Error ? error.message : String(error);
      setError(message);
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

        {/* Form */}
        <div className="col-lg-4">
          {!showUpload &&
            (<div className="card shadow-sm mb-4">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title d-flex align-items-center gap-2  text-color">
                  <img src=".\src\assets\form-img.png" className='img-form' alt="Icon" />
                  Start from Scratch
                </h5>
                <p className="subtext text-color">
                  Enter your details and job description to generate a tailored CV.
                </p>
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

                  {/* Education */}
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

                  {/* Experience */}
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

                  {/* Job Description */}
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

          {/* Upload Section (Hidden based on button) */}
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
                  accept=".pdf,.doc,.docx"
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

                {/*Job Description */}
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
                <button className="btn btn-primary btn-primary-custom align-self-center mt-2" onClick={handleGenerateFromCV}>
                  Enhance with AI
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Generated CV */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body cv-preview">
              <div className="d-flex justify-content-between flex-column mb-3">

                <div className='mt-1 d-flex flex-row align-items-center gap-2 '>
                  <h5 className="mb-0">CV Preview</h5>
                  <div className='ms-auto'>
                    <button className='btn preview-btn me-1 p-1' title='Latex Code' onClick={() => setViewMode("pdf")}>
                      <i className='bi bi-code-slash me-1'></i></button>
                    <button className='btn preview-btn  p-1' title='PDF Preview' onClick={() => setViewMode("code")}>
                      <i className='bi bi-file-earmark-pdf'></i></button>
                  </div>
                </div>


                {viewMode === "code" && (
                  cvResult ? (
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
                    </div>
                  ) : (
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
                  )
                )}
                {/* Preview */}
                {viewMode === "pdf" && (
                  pdfUrl ? (
                    <iframe
                      src={pdfUrl}
                      width="100%"
                      height="600px"
                      style={{ border: "none" }}
                    />
                  ) : (
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
                  )
                )}
              </div>



              {/* Actions */}
              <div className="mt-3 d-flex gap-2">
                <button className="btn btn-outline-secondary btn-sm" onClick={compileLatex}>
                  <i className='bi bi-download me-1'></i>
                  Download PDF
                </button>
                <button className="btn btn-outline-secondary btn-sm" onClick={copyToClipboard}>
                  <i className='bi bi-clipboard me-1'></i>
                  Copy LaTeX
                </button>
                <button className="btn btn-outline-secondary btn-sm" onClick={regenerateCV}>
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
