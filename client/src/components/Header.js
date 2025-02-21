import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavItem, NavbarBrand, NavbarToggle, NavbarCollapse } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
        console.log('User data in Header:', storedUser); // Debugging line
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg">
            <Container>
                <NavbarBrand as={Link} to='/' className="ps-2">
                    My Job Applications
                </NavbarBrand>

                <NavbarToggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />

                <NavbarCollapse id="basic-navbar-nav" in={menuOpen}>
                    <Nav className="ms-auto" navbar>
                        <NavItem>
                            <NavLink className='nav-link' to='/' >
                                <i className='fa fa-home fa-lg' /> Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/addApplication' >
                                <i className='fa fa-info fa-lg' /> Add Application
                            </NavLink>
                        </NavItem>
                    </Nav>
                    {user && (
                        <Nav className="ml-auto align-items-center">
                            <img 
                                src={user.profilePicture} 
                                alt="avatar" 
                                className="rounded-circle" 
                                style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    marginRight: '10px' 
                                }} 
                            />
                            <span>{user.username}</span>
                        </Nav>
                    )}
                </NavbarCollapse>
            </Container>
        </Navbar>
    );
};

export default Header;