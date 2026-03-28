import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import './Form.css'

function Form() {
  const [jobDescription, setJobDescription] = useState('')
  const [cvResult, setCvResult] = useState('')
  const [formData, setFormData] = useState(
    {
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      skills: '',
      experience: '',
      education: '',
      projects: '',
      jobDescription: ''
    }
  )
  async function handleGenerate() {

    try {
      const response = await fetch("http://127.0.0.1:5000/generateCV", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      // store result
      setCvResult(data.latex);

    } catch (error) {
      console.error("Error:", error);
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

      <div className='form container-fluid'>
        <div className='header'>
        </div>
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
              <span className='text-center'>Import Existing CV</span>
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
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className='generate'>
          <button className="btn btn-secondary mx-auto" onClick={() => handleGenerate()}>Generate Latex</button>
        </div>
      </div>

      <div className="result" style={{ display: 'none' }}>

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
        <button className="btn btn-secondary mt-1">Copy</button>
      </div>
    </>
  )
}

export default Form
