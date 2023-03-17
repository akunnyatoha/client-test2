import axios from 'axios';
import { React, useState, useEffect } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';

const FormUpdateProduct = () => {

    const [kode_product, setKodeProduct] = useState('');
    const [title, setTitle] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        await axios({
            method: 'get',
            url: 'http://localhost:8000/api/master-products/' + id,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((data) => {
            console.log(data.data);
            setKodeProduct(data.data.data.kode_product);
            setTitle(data.data.data.title);
            setQuantity(data.data.data.quantity);
            setPrice(data.data.data.price);
            alert(data.data.message);
        });
    };

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
            url: 'http://localhost:8000/api/master-products/' + id,
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
                    <Card.Title className='text-center mt-3'>Update Product</Card.Title>
                    <Card.Body>
                        <Form onSubmit={postProduct}>
                            <Form.Group className="mb-3" controlId="kode_product">
                                <Form.Label>Kode Product</Form.Label>
                                <Form.Control type="text" placeholder="kode product..." value={kode_product} name='kode_product' onChange={(e) => { setKodeProduct(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Nama Product</Form.Label>
                                <Form.Control type="text" placeholder="nama product..." value={title} name='title' onChange={(e) => { setTitle(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="quantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" placeholder="quantity..." value={quantity} name='quantity' onChange={(e) => { setQuantity(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="price..." value={price} name='price' onChange={(e) => { setPrice(e.target.value) }} />
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

export default FormUpdateProduct