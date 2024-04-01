import { useRef } from 'react';
import './SignForm.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const SignForm = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleSubmit = () => {

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;


        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWnTSSM62-LxPcuSBx2HBV5wVcYcp6138',{
        method:'POST',
        body:JSON.stringify({ 
          email: email,
          password: password,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if(res.ok){
          setIsLoading(false);
        }else{
          setIsLoading(false);
          return res.json().then(data => alert(data.error.message))
         
        }
      }).catch(err => {
        console.log(err);
      })
    }
    return(
        <>
        <div>
            
        </div>
        <div className='d-flex justify-content-center align-items-center'>
        
        <div className='container card m-5' style={{ width: "30rem", marginLeft:'1000px' }}>
        <h1 className='text-center m-3'>Sign Up</h1>
        <Form className='m-3'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordRef}/>
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </div>
       
        </div>
        </>
    )
}

export default SignForm;