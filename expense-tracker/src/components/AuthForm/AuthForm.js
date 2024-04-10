import { useState } from "react";
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import './AuthForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from "../../store/auth";



const AuthForm = () => {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  console.log(isAuthenticated, token)

    const [isLogin, setIsLogin] = useState(false);
    const [isForgetPassword, setIsForgetPassword] = useState(false);
    const navigate = useNavigate() 

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const emailForgetPasswordRef = useRef();


    const switchAuthModeHandler = () => {
      setIsLogin((prevState) => !prevState);
    };

  
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
             res.json().then((data) => {
              localStorage.setItem('token',data.idToken);
              dispatch(authActions.login(data.idToken))
              navigate('/expenses')
            })
        }else{
        
          return res.json().then(data => alert(data.error.message))
         
        }
      }).catch(err => {
        console.log(err);
      })
   }


    }


    const forgetPasswordHandler = (e) => {

      e.preventDefault();

         const email = emailForgetPasswordRef.current.value;
         fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAWnTSSM62-LxPcuSBx2HBV5wVcYcp6138',{
          method:'POST',
          body:JSON.stringify({ 
            requestType:"PASSWORD_RESET",
            email: email,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          if(res.ok){
               res.json().then((data) => alert('Reset Paaword Link is sent to your email please check'))
          }else{
          
            return res.json().then(data => alert(data.error.message))
           
          }
        }).catch(err => {
          console.log(err);
        })
    }


    return(
        <>
        {!isForgetPassword && 
        <div>
        <div className='d-flex justify-content-center align-items-center'>
        
        <div className='container card m-5' style={{ width: "30rem"}}>
        <h1 className='text-center m-3'>{isLogin ? 'Log In' : 'Sign Up'}</h1>
        <Form className='m-3'>
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
       <div className='extra-actions'>
      <button
            type='button'
            className='toggle'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
       </button>
       {isLogin &&
       <button
            type='button'
            className='toggle'
            onClick={() => setIsForgetPassword(true)}
          >
            Forget Password
       </button>}
       </div>
      <div className="text-center">
      <Button variant="primary" onClick={handleSubmit} className="action-btn px-5 mt-1">
      {isLogin ? 'Login' : 'Sign Up'}
      </Button>
      </div>
    </Form>
        </div>
       
        </div>
        </div>
        }
        
        {isForgetPassword && 
        <div>
          <div className='d-flex justify-content-center align-items-center'>
          <div className='container card m-5' style={{ width: "30rem"}}>
                <h1 className='text-center m-3'>Forget Password</h1>
                  <Form className='m-3'>
                  <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" ref={emailForgetPasswordRef}/>
                  </Form.Group>

          <div className="text-center">
                      <Button variant="primary" onClick={forgetPasswordHandler} className="action-btn px-5 mt-1">
                    Send Link
                </Button>
           </div>
              </Form>
               </div>
          </div>
          </div>
        }
        </>
    )
}

export default AuthForm;




