import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import Auth from "./pages/Auth/Auth";
import Expense from "./pages/Expense/Expense";
import CompleteProfile from './pages/Profile/CompleteProfile';
import Header from './components/Header/Header';

function App() {

  return (
    <>
    <Header />
    <BrowserRouter>
    <Routes>
    <Route path='/auth' element={<Auth/>} />
    <Route path='/expenses' element={<Expense/>} />
    <Route path="/complete-profile" element={<CompleteProfile />} />
  </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;
