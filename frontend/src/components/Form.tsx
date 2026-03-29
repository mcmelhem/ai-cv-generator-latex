import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ClipLoader } from "react-spinners";
import './Form.css'

function Form() {
  const [jobDescription, setJobDescription] = useState('')
  const [cvResult, setCvResult] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
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
      education: '',
      projects: '',
      jobDescription: ''
    }
  )
  function validateForm() {
    var strError = "";
    if (!formData.name) {
      strError = strError == "" ? strError : strError + " and Name is Required";
    }
    if (!formData.email) {
      strError == "" ? strError : strError + " and Email is Required";
    }
    if (!formData.phone) {
      strError == "" ? strError : strError + " and Phone is Required";
    }
    if (!formData.experience) {
      strError == "" ? strError : strError + " and Experience is Required";
    }
    if (!formData.jobDescription) {
      strError == "" ? strError : strError + " and Job Description is Required";
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


    } catch (error) {
      setError(error)

    } finally {
      setLoading(false)
    }
  }

  function openPanel() {
    var panel = document.getElementById('info');
    if (panel) {
      if (panel.style.display == 'none') {
        panel.style.display = 'block';
      } else {
        panel.style.display = 'none';
      }
    }

  }
  return (
    <>

      <div className='generate-section container'>
        <div className='cv-building row mb-2'>
          <div className='cv-options col-1 ps-1 pe-0'>
            <div className='option-item fill-info' onClick={() => openPanel()}>
              <button title='Add Info' className='btn btn-sm' >
                <FontAwesomeIcon icon={faAddressCard} />
              </button>
              <span className='text-center'>Fill Personal Info </span>
            </div>
            <div className='option-item import-cv'>
              <button title='Import cv' className='btn btn-sm'>
                <FontAwesomeIcon icon={faUser} />
              </button>
              <span className='text-center'>Import Existing</span>
            </div>
          </div>
          <div className='col-11'>
            <div className='collapsible-info p-2' id='info' style={{ display: 'none' }}>
              <div className='row mb-1'>
                <div className='col'>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className='col'>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>
              <div className='row mb-1'>
                <div className='col'>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className='col'>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Linkedin"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} />
                </div>
              </div>

              <div className='row mb-1'>
                <div className='col-6'>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Github"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })} />
                </div>
                <div className='col-6'>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>

              </div>
              <div className='row mb-1'>
                <div className='col'>
                  <textarea
                    className="form-control"
                    placeholder="Skills"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
                </div>
                <div className='col'>
                  <textarea
                    className="form-control"
                    placeholder="Experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
                </div>
                <div className='col'>
                  <textarea
                    className="form-control"
                    placeholder="Education"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })} />
                </div>
              </div>
              <div className='row mb-1'>
                <div className='col'>
                  <textarea
                    className="form-control"
                    placeholder="Projects"
                    value={formData.projects}
                    onChange={(e) => setFormData({ ...formData, projects: e.target.value })} />
                </div>
              </div>
            </div>
            <textarea
              name="job-description"
              className="job-description form-control"
              id="job-description"
              placeholder='Job Description...'
              cols={30}
              rows={8}
              value={formData.jobDescription}
              onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
            ></textarea>
          </div>
        </div>
        <div className='generate'>
          <button className="btn btn-secondary mx-auto" onClick={() => handleGenerate()}>Generate</button>
        </div>

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
        {loading && (
          <div className="d-flex justify-content-center align-items-center mt-4">
            <ClipLoader color="rgb(37 38 62 / 85%);" size={50} />
          </div>
        )}
      </div>

    </>
  )
}

export default Form
