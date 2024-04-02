import { Link, useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/esm/Button";
import { useEffect, useRef, useState } from "react";


const Expense = () => {

  const navigate = useNavigate();



  const [expenses , setExpenses] = useState([])

  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  useEffect(() => {
    if(!(!!localStorage.getItem('token'))){
      return navigate('/auth')
  }
  },[navigate])


  const handleSubmit = () => {
    const amount = amountRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;

    const data = {
      amount: amount,
      description: description,
      category: category,
    } 
    console.log(data);

   setExpenses(prev => {
    return [...prev, data]
   })

   console.log(expenses)
  }

  return(
    <>
    <div className= 'text-end'>
    <Link to='/complete-profile'>Complete your profile</Link>
    </div>
    <Form className="container card p-3">
      <Row>
        <Col xs={3}>
          <Form.Control type="number" placeholder="Amount" ref={amountRef}/>
        </Col>
        <Col  xs={6}>
          <Form.Control placeholder="Description" ref={descriptionRef}/>
        </Col>
        <Col  xs={2}>
        <Form.Select aria-label="Category" ref={categoryRef}>
      <option>Category</option>
      <option value="Food">Food</option>
      <option value="Travel">Travel</option>
      <option value="Medical">Medical</option>
      </Form.Select>
        </Col>
        <Col>
        <Button variant="success" onClick={handleSubmit}>Add</Button>
        </Col>
      </Row>
    </Form>

    {expenses.map((ele, index)=>{
      return <li key={index}>{ele.amount}, {ele.description}, {ele.category}</li>
    })}
    </>
  )
}

export default Expense;