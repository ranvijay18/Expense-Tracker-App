import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ExpenseList from "../../components/Expenses/ExpenseList";
import ExpenseForm from "../../components/Expenses/ExpenseForm";


const Expense = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if(!(!!localStorage.getItem('token'))){
      return navigate('/auth')
  }
  },[navigate])



  return(
    <>
   <ExpenseForm/>
  <ExpenseList />
    </>
  )
}

export default Expense;