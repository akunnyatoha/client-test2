import axios from 'axios';
import { React, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const FormCreateProduct = () => {

    const [kode_product, setKodeProduct] = useState('');
    const [title, setTitle] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const postProduct = async (e) => {
        e.preventDefault();
        const data = {
            kode_product: kode_product,
            title: title,
            quantity: parseInt(quantity),
            price: parseInt(price),
        };

        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/master-products',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data
        }).then((data) => {
            alert(data.data.message);
            navigate('/master-products');
        }).catch((err) => {
            alert(err);
        });
    };

    return (
        <div>
            <Container className='mt-5 d-flex justify-content-center' >
                <Card style={{ width: '30rem' }}>
                    <Card.Title className='text-center mt-3'>Create Product</Card.Title>
                    <Card.Body>
                        <Form onSubmit={postProduct}>
                            <Form.Group className="mb-3" controlId="kode_product">
                                <Form.Label>Kode Product</Form.Label>
                                <Form.Control type="text" placeholder="kode product..." name='kode_product' onChange={(e) => { setKodeProduct(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Nama Product</Form.Label>
                                <Form.Control type="text" placeholder="nama product..." name='title' onChange={(e) => { setTitle(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="quantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" placeholder="quantity..." name='quantity' onChange={(e) => { setQuantity(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="price..." name='price' onChange={(e) => { setPrice(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button variant='primary' type='submit'>Submit</Button> <br />
                                <Card.Link className='btn btn-secondary mt-2' href='/master-products'>Cancel</Card.Link>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div >
    )
}

export default FormCreateProduct