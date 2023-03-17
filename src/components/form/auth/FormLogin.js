import axios from 'axios';
import { React, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    // console.log([email, passwod]);

    const postLogin = async (e) => {
        e.preventDefault();
        // console.log([email, password]);
        await axios.post('http://localhost:8000/api/login', {
            email: email,
            password: password
        }).then((data) => {
            localStorage.setItem("token", data.data.data);
            // console.log(data.data);
            alert(data.data.message);
            setToken(data.data.data);
            navigate('/master-customers');
        });
    };

    return (
        <div>
            <Container className='mt-5 d-flex justify-content-center' >
                <Card style={{ width: '30rem' }}>
                    <Card.Title className='text-center mt-3'>Login</Card.Title>
                    <Card.Body>
                        <Form onSubmit={postLogin}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="email..." name='email' onChange={(e) => { setEmail(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Pasword</Form.Label>
                                <Form.Control type="password" placeholder="password..." name='password' onChange={(e) => { setPassword(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3 text-center">
                                <Button variant='primary' type='submit'>Login</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div >
    )
}

export default FormLogin