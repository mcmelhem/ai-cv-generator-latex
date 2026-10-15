import { useState } from 'react';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Form from './components/Form';
import logo from "../src/assets/logo.png";

function App() {


  return (
    <>
      <div className="m-1">
        <img src={logo} className='img-logo mt-2' alt="Logo" />
      </div>
      <div className="container py-3">

        <div className="text-center mb-5">
          <h1 className="fw-bold  text-color">Create a Job-Winning CV in Seconds</h1>
          <p className="text-muted  text-color">
            Start from scratch or upload your existing CV. Get AI-powered Latex Resume.
          </p>

          <div className="site-header sticky-top py-1">
            <div className="container d-flex flex-column flex-md-row justify-content-between">
              <h5 className="headline-text py-2">LaTeXGen CV</h5>
            </div>
          </div>

          <div className="headline position-relative overflow-hidden p-3 p-md-2 mx-2 my-1 text-center">
            <div className="col-md-8 p-lg-5 mx-auto my-5">
              <h1 className="font-weight-bolder headline-text">Generate CV In Latex Format</h1>
              <p className="lead font-weight-normal">Add Your Personal Info To obtain a CV generated in Latex Format based on Job Description</p>
              <div className="container d-flex flex-column flex-md-row justify-content-between">
                <p className="more-info">1. Enter Information Or Import Existing CV</p>
                <p className="more-info">2. Enter Job Description</p>
                <p className="more-info">3. Click on Generate to obtain Latex format CV</p>
              </div>

            </div>
          </div>

          <div className="form-section">
            <Form />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
