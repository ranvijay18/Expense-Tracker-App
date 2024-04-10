import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ExpenseList from "../../components/Expenses/ExpenseList";
import ExpenseForm from "../../components/Expenses/ExpenseForm";
import {useSelector } from 'react-redux';


const Expense = (props) => {

  const token = useSelector(state => state.auth.token)

  const navigate = useNavigate();

  const [expenseId, setExpenseId] = useState([])

  useEffect(() => {
//   //   if(!(!!localStorage.getItem('token'))){
//   //     return navigate('/auth')
//   // }
  if(!(!!token)){
    return navigate('/auth')
}
  },[navigate])

const handleEdit = (expense) => {
 setExpenseId(expense);
}

  return(
    <>
    <ExpenseForm onEditExpense={expenseId}/>
  <ExpenseList onEdit={handleEdit} />
    </>
  )
}

export default Expense;