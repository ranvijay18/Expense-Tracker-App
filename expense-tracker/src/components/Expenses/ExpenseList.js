import { useEffect, useState } from "react";


const ExpenseList = (props) => {

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetch('https://react-movie-8cf32-default-rtdb.firebaseio.com/expenses.json')
        .then(res =>  res.json())
        .then((data) => {
           
            let loadedData = []
       
            for( let key in data){
              loadedData.push({
                id:key,
                amount: data[key].amount,
                description: data[key].description,
                category: data[key].category
              })
            }
            setExpenses(loadedData);
            console.log(expenses);
        });
    },[]);

    const handleDelete = (e) => {
        e.preventDefault();
        const id = e.target.id

        fetch(`https://react-movie-8cf32-default-rtdb.firebaseio.com/expenses/${id}.json`,{
            method: "DELETE"
        }).then(res => res.json())
        .then(data => console.log(data))
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const id = e.target.id

        const editExpense = expenses.filter((ele) => ele.id === id);

        props.onEdit(editExpense)

        // fetch(`https://react-movie-8cf32-default-rtdb.firebaseio.com/expenses/${id}.json`,{
        //     method: "PUT"
        // }).then(res => res.json())
        // .then(data => console.log(data))
    }

   
    return(
        <>
           {expenses.map((ele, index)=>{
        return <div className='d-flex  align-items-center mt-3' key={index}>
                 <li >{ele.amount}, {ele.description}, {ele.category}</li>
                 <button className="btn btn-outline-success" id={ele.id} onClick={handleEdit}>Edit</button>
                 <button className="btn btn-outline-danger" id={ele.id} onClick={handleDelete}>Delete</button>
            </div>
     })}
        </>
    )
}

export default ExpenseList;