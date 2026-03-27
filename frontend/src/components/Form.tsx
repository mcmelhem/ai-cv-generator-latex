import { useState } from 'react'


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
    }
  )
  async function handleGenerate(){
    
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
  return (
    <>
     
        <h5>Input A Job Description Below</h5>
        <div className='container'>
        <div className='row mb-1'>
          <div className='col'>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}/>
          </div>
            <div className='col'>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}/>
          </div>
        </div>
        <div className='row mb-1'>
          <div className='col'>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Phone" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
          </div>
            <div className='col'>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Linkedin" 
              value={formData.linkedin}
              onChange={(e) => setFormData({...formData, linkedin: e.target.value})}/>
          </div>
        </div>
        
        <div className='row mb-1'>
          <div className='col'>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Github" 
              value={formData.github}
              onChange={(e) => setFormData({...formData, github: e.target.value})}/>
          </div>
            <div className='col'>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Linkedin" 
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}/>
          </div>
        </div>
        <div className='row mb-1'>
          <div className='col'>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Experience" 
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}/>
          </div>
          <div className='col'>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Education" 
              value={formData.education}
              onChange={(e) => setFormData({...formData, education: e.target.value})}/>
          </div>
        </div>
         <div className='row mb-1'>
          <div className='col'>
            <textarea 
              className="form-control" 
              placeholder="Projects" 
              value={formData.projects}
              onChange={(e) => setFormData({...formData, projects: e.target.value})}/>
          </div>
       
        </div>
        <textarea 
          name="job-description" 
          className="job-description form-control"
          id="job-description" 
          placeholder='Job Description...'
          cols={30} 
          rows={10} 
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>
       <button className="btn btn-secondary mt-1" onClick={()=> handleGenerate()}>Generate Latex</button>
      </div>
      <div className="result">
        <h2>Generated LaTeX CV</h2>
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
