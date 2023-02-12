import React from 'react';
import './Login.css';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

function App() {
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100 '>
        <MDBCol col='12'>

          <MDBCard className='bg-white text-dark my-5 mx-auto border-0 no-borderr' style={{maxWidth: '500px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase heading">Login</h2>
              <p className="text-dark-50 mt-5 mb-5">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-dark' label='Email address' id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-dark' label='Password' id='formControlLg' type='password' size="lg"/>

              <p className="small mb-3 pb-lg-2"><a class="text-dark-50" href="#!">Forgot password?</a></p>
                <MDBBtn color='dark' className='login-button'>
                 LOGIN
                </MDBBtn>

              <div>
                <p className="mb-0">Don't have an account? <Link to="/register" class="text-dark-50 fw-bold">Register</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
   

  );
}

export default App;