import { useEffect, useState } from "react";


const ExpenseList = () => {

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

    const list =  expenses.map((ele, index)=>{
        return <li key={index}>{ele.amount}, {ele.description}, {ele.category}</li>
     })
   
    return(
        <>
           {list}
        </>
    )
}

export default ExpenseList;