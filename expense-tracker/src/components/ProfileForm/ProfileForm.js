import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const ProfileForm = () => {

    const [user , setUser] = useState([]);

    const nameRef = useRef();
    const photoUrlRef = useRef();

    useEffect(() => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAWnTSSM62-LxPcuSBx2HBV5wVcYcp6138',{
          method:'POST',
          body:JSON.stringify({ 
            idToken: localStorage.getItem('token'),
            returnSecureToken:true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
         }).then(res => {
          if(res.ok){
               res.json().then((data) =>{
                  setUser(data.users[0])
               })
          }else{
             return res.json().then(data => console.log(data))
          }
        }).catch(err => {
          console.log(err);
        })
     
    },[]);



    const handleSubmit = (e) => {
       e.preventDefault();

       const name = nameRef.current.value;
       const photoUrl = photoUrlRef.current.value;

       fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAWnTSSM62-LxPcuSBx2HBV5wVcYcp6138',{
        method:'POST',
        body:JSON.stringify({ 
          idToken: localStorage.getItem('token'),
          displayName: name,
          photoUrl: photoUrl,
          returnSecureToken:true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
       }).then(res => {
        if(res.ok){
          alert("Your Profile Updated!!!")
             res.json().then((data) =>{
                console.log(data);
             })
        }else{
          return res.json().then(data => alert(data.error.message))
        }
      }).catch(err => {
        console.log(err);
      })
    }
   return(
    <>
    <h1 className='text-center mt-5'>Complete Your Profile</h1>
    <div className='container mt-5'>
    <Form onSubmit={handleSubmit}>
       <Row>
      <Col>
      <label>Full Name: </label>
       <Form.Control placeholder="Enter Full Name" defaultValue={user.displayName} ref={nameRef} required/>
      </Col>
      <Col>
      <label >Profile Photo Url: </label>
        <Form.Control placeholder="Enter Url" defaultValue={user.photoUrl} ref={photoUrlRef} required/>
      </Col>
      </Row>
      <Button className='mt-3'  variant="primary" type="submit" >Update</Button>
    </Form>
    </div>
    
    </>
   
   )
}

export default ProfileForm;