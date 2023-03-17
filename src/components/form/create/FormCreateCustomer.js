import axios from 'axios';
import { React, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const FormCreateCustomer = () => {

    const [nama, setNama] = useState('');
    const [no_telepon, setNoTelepon] = useState('');
    const [email, setEmail] = useState('');
    const [alamat, setAlamat] = useState('');
    const navigate = useNavigate();

    const postCustomers = async (e) => {
        e.preventDefault();
        const data = {
            nama: nama,
            no_telepon: no_telepon,
            email: email,
            alamat: alamat,
        };

        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/master-customers/create',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data
        }).then((data) => {
            alert(data.data.message);
            navigate('/master-customers');
        }).catch((err) => {
            alert(err);
        });
    };

    return (
        <div>
            <Container className='mt-5 d-flex justify-content-center' >
                <Card style={{ width: '30rem' }}>
                    <Card.Title className='text-center mt-3'>Create Customer</Card.Title>
                    <Card.Body>
                        <Form onSubmit={postCustomers}>
                            <Form.Group className="mb-3" controlId="nama">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" placeholder="nama..." name='nama' onChange={(e) => { setNama(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="no_telepon">
                                <Form.Label>No Telepon</Form.Label>
                                <Form.Control type="text" placeholder="no telepon..." name='no_telepon' onChange={(e) => { setNoTelepon(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="email..." name='email' onChange={(e) => { setEmail(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="alamat">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text" placeholder="alamat..." name='alamat' onChange={(e) => { setAlamat(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button variant='primary' type='submit'>Submit</Button> <br />
                                <Card.Link className='btn btn-secondary mt-2' href='/master-customers'>Cancel</Card.Link>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div >
    )
}

export default FormCreateCustomer