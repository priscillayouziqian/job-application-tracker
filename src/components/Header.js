import { Navbar, Container, Nav, NavItem, NavbarBrand, NavbarToggle, NavbarCollapse } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    console.log("zhaoyi")
    const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <NavbarBrand as={Link} to='/'>
          My Job Applications
          </NavbarBrand>

          <NavbarToggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />

          <NavbarCollapse id="basic-navbar-nav" in={menuOpen}>
            <Nav className="me-auto" navbar>
                <NavItem>
                    <NavLink className='nav-link' to='/' >Home
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='nav-link' to='/addApplication' >Add Application
                    </NavLink>
                </NavItem>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
  )
}

export default Header