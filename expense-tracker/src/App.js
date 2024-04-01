import {  Routes, Route } from 'react-router-dom';
import Auth from "./pages/Auth/Auth";
import Expense from "./pages/Expense/Expense";

function App() {

  return (
    <Routes>
    <Route path='/auth' element={<Auth/>} />
    <Route path='/expenses' element={<Expense/>} />
  </Routes>
  );
}

export default App;
