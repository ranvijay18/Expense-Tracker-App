import { useEffect, useRef, useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";


const ExpenseForm = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    const [expense, setExpense] = useState([]);


  useEffect(() => {
    if(props.onEditExpense.length > 0){
        setIsEdit(true);
        setExpense(props.onEditExpense[0])
    }
  })


    const amountRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    
  const handleSubmit = (e) => {

    e.preventDefault();
    const amount = amountRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;

    const data = {
      amount: amount,
      description: description,
      category: category,
    } 


    fetch('https://react-movie-8cf32-default-rtdb.firebaseio.com/expenses.json',{
        method:'POST',
        body:JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if(res.ok){
             res.json().then((data) => console.log(data))
        }else{
        
          return res.json().then(data => alert(data.error.message))
         
        }
      }).catch(err => {
        console.log(err);
      })
  }


  const handleEdit = (e) => {
    e.preventDefault();
    const id = expense.id

    const amount = amountRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;

    const data = {
      amount: amount,
      description: description,
      category: category,
    } 

        fetch(`https://react-movie-8cf32-default-rtdb.firebaseio.com/expenses/${id}.json`,{
            method:"PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
              }
        }).then(res => res.json())
        .then(data => console.log(data))
  }


  return(
    <>
        <div className= 'text-end'>
    <Link to='/complete-profile'>Complete your profile</Link>
    </div>
    <Form className="container card p-3">
      <Row>
        <Col xs={3}>
          <Form.Control type="number" placeholder="Amount" defaultValue={expense.amount} ref={amountRef}/>
        </Col>
        <Col  xs={6}>
          <Form.Control placeholder="Description" defaultValue={expense.description} ref={descriptionRef}/>
        </Col>
        <Col  xs={2}>
        <Form.Select aria-label="Category"  ref={categoryRef}>
      <option>Category</option>
      <option value="Food">Food</option>
      <option value="Travel">Travel</option>
      <option value="Medical">Medical</option>
      </Form.Select>
        </Col>
        <Col>
        {isEdit ? <Button variant="success" onClick={handleEdit}>Edit</Button> :
        <Button variant="success" onClick={handleSubmit}>Add</Button> }
        
        </Col>
      </Row>
    </Form>
    </>
  )
}


export default ExpenseForm;