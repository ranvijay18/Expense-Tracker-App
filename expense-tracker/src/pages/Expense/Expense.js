import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ExpenseList from "../../components/Expenses/ExpenseList";
import ExpenseForm from "../../components/Expenses/ExpenseForm";


const Expense = (props) => {

  const navigate = useNavigate();

  const [expenseId, setExpenseId] = useState([])

  useEffect(() => {
    if(!(!!localStorage.getItem('token'))){
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