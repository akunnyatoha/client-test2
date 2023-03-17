import axios from 'axios';
import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Navigation = () => {

    const navigate = useNavigate();

    const logout = async () => {
        await axios({
            method: 'get',
            url: 'http://localhost:8000/api/logout',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((data) => {
            localStorage.removeItem('token');
            navigate('/');
            alert(data.data.message);
        });
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Test Laravel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link className='active' href="/master-customers">Master Customers</Nav.Link>
                            <Nav.Link className='active' href="/master-products">Master Products</Nav.Link>
                            <Nav.Link className='active' href="/master-sales-orders">Master Sales Order</Nav.Link>
                            <Button onClick={logout} className='bg-transparent border-0' style={{ color: 'black' }}>Log Out</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation