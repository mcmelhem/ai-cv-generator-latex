import './App.css'
import Form from './components/Form'

function App() {


  return (
    <>
      <div className="nav-headline">

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
    </>
  )
}

export default App
