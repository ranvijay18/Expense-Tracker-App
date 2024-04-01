import { useState } from "react";
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";



const AuthForm = () => {

    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate() 

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

  
    const handleSubmit = (e) => {

     e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    
    if(!isLogin){
        const confirmPassword = confirmPasswordRef.current.value;

        if(password !== confirmPassword){
           return alert("Password Mismatch")
        }
   }

   if(!isLogin){
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
            setIsLogin(true)
             res.json().then((data) =>{
                localStorage.setItem('token',data.idToken);
             })
        }else{
        
          return res.json().then(data => alert(data.error.message))
         
        }
      }).catch(err => {
        console.log(err);
      })
   }else{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWnTSSM62-LxPcuSBx2HBV5wVcYcp6138',{
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
             res.json().then((data) => navigate('/expenses'))
        }else{
        
          return res.json().then(data => alert(data.error.message))
         
        }
      }).catch(err => {
        console.log(err);
      })
   }


    }


    return(
        <>
        <div>
            
        </div>
        <div className='d-flex justify-content-center align-items-center'>
        
        <div className='container card m-5' style={{ width: "30rem"}}>
        <h1 className='text-center m-3'>{isLogin ? 'Log In' : 'Sign Up'}</h1>
        <Form className='m-3' onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
      </Form.Group>

      {!isLogin ? <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordRef}/>
      </Form.Group> : ''}

      
     
      <Button variant="primary" type="submit" >
      {isLogin ? 'Login' : 'Sign Up'}
      </Button>
    </Form>
        </div>
       
        </div>
        </>
    )
}

export default AuthForm;