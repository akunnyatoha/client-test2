import axios from 'axios';
import { React, useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const FormCreateSO = () => {

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [id_customer, setIdCustomer] = useState('');
    const [id_product, setIdProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getProduct();
        getCustomer();
    }, []);

    const getCustomer = async () => {
        await axios({
            method: 'get',
            url: 'http://localhost:8000/api/master-customers',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((data) => {
            // console.log(data);
            setCustomers(data.data.data);
        });
    };

    const getProduct = async () => {
        await axios({
            method: 'get',
            url: 'http://localhost:8000/api/master-products',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((data) => {
            // console.log(data);
            setProducts(data.data.data);
        });
    };

    const postSO = async (e) => {
        e.preventDefault();
        const data = {
            id_customer: parseInt(id_customer),
            id_product: parseInt(id_product),
            quantity: parseInt(quantity),
        };

        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/master-sales-orders',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data
        }).then((data) => {
            alert(data.data.message);
            navigate('/master-sales-orders');
        }).catch((err) => {
            alert(err);
        });
    }

    return (
        <div>
            <Container className='mt-5 d-flex justify-content-center' >
                <Card style={{ width: '30rem' }}>
                    <Card.Title className='text-center mt-3'>Create Sales Order</Card.Title>
                    <Card.Body>
                        <Form onSubmit={postSO}>
                            <Form.Group className="mb-3">
                                <Form.Label>Customer</Form.Label>
                                <Form.Select aria-label="Default select example" name='id_customer' onChange={(e) => { setIdCustomer(e.target.value) }}>
                                    <option selected>----- Select Customer -----</option>
                                    {customers.map((item) => (
                                        <option key={item.id} value={item.id}>{item.nama}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Product</Form.Label>
                                <Form.Select aria-label="Default select example" name='id_product' onChange={(e) => { setIdProduct(e.target.value) }}>
                                    <option selected>----- Select Product -----</option>
                                    {products.map((item) => (
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="quantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" placeholder="quantity..." name='quantity' onChange={(e) => { setQuantity(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button variant='primary' type='submit'>Submit</Button> <br />
                                <Card.Link className='btn btn-secondary mt-2' href='/master-sales-orders'>Cancel</Card.Link>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default FormCreateSO