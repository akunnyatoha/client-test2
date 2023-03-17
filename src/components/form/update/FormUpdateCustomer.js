import axios from 'axios';
import { React, useState, useEffect } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';

const FormUpdateCustomer = () => {

    const [nama, setNama] = useState('');
    const [no_telepon, setNoTelepon] = useState('');
    const [email, setEmail] = useState('');
    const [alamat, setAlamat] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log(alamat);

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = async () => {
        await axios({
            method: 'get',
            url: 'http://localhost:8000/api/master-customers/' + id,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((data) => {
            console.log(data.data);
            setNama(data.data.data.nama);
            setNoTelepon(data.data.data.no_telepon);
            setEmail(data.data.data.email);
            setAlamat(data.data.data.alamat);
        });
    };

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
            url: 'http://localhost:8000/api/master-customers/' + id,
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
                    <Card.Title className='text-center mt-3'>Update Customer</Card.Title>
                    <Card.Body>
                        <Form onSubmit={postCustomers}>
                            <Form.Group className="mb-3" controlId="nama">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" value={nama} name='nama' onChange={(e) => { setNama(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="no_telepon">
                                <Form.Label>No Telepon</Form.Label>
                                <Form.Control type="text" value={no_telepon} name='no_telepon' onChange={(e) => { setNoTelepon(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} name='email' onChange={(e) => { setEmail(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="alamat">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text" value={alamat} name='alamat' onChange={(e) => { setAlamat(e.target.value) }} />
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

export default FormUpdateCustomer