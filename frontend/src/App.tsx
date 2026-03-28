import './App.css'
import Form from './components/Form'

function App() {


  return (
    <>
      <div className="ticks">
        <nav className="site-header sticky-top py-1">
          <div className="container d-flex flex-column flex-md-row justify-content-between">           
              <h5 className="py-2">LaTeXGen CV</h5>
            <a className="py-2 d-none d-md-inline-block" href="#">Create Cv</a>
          </div>
        </nav>

        <div className="headline position-relative overflow-hidden p-3 p-md-5 mx-2 my-1 text-center">
          <div className="col-md-10 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal">Generate CV In Latex Format</h1>
            <p className="lead font-weight-normal">Add Your Personal Info To obtain a CV generated in Latex Format base don Job Description</p>
            <button className='btn btn-sm btn-start'>Start Now</button>
          </div>
        </div>
        <Form />
      </div>
    </>
  )
}

export default App
