import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to='/'>My Job Applications</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/' >Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default Header