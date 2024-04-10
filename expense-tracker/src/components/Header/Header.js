import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useSelector } from 'react-redux';


function Header() {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
   localStorage.removeItem('token')
  }
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/expenses">Expenses</Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated ? <Nav.Link href="/auth" onClick={handleLogout}>Logout</Nav.Link> :  
            <Nav.Link href="/auth">Login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;