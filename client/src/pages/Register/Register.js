import React from 'react';
import {Link}  from "react-router-dom"
import registerlogo  from "../images/register.jpg"
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import "./Register.css"

function App() {
  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5 border-0 no-borderr' >
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center' id='form-card'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Your Name' id='form1' type='text' className='w-100'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput label='Your Email' id='form2' type='email'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password' id='form3' type='password'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Confirm password' id='form4' type='password'/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="person-booth" size='lg' className="voterid"/>
                <MDBInput label='VoterID' id='form4' type='text'/>
              </div>
          

              <MDBBtn className='mb-4' size='lg'>Register</MDBBtn>


         
            <div className="already-registered-row">
               <Link to="/login" className="already-registered">Already Registerd? Login Here</Link>
              </div>
              
            </MDBCol>
            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src={registerlogo} className="registerlogo" fluid/>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default App;