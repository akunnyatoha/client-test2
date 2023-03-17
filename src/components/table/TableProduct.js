import axios from 'axios';
import { React, useEffect, useState } from 'react'
import { Button, Card, Container, Table } from 'react-bootstrap'
// import { products } from '../../dummy'

const TableProduct = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {

        // console.log(config);
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
    }

    const deleteProduct = async (paramsId) => {
        console.log(paramsId);
        await axios({
            method: 'get',
            url: 'http://localhost:8000/api/master-products/destroy/' + paramsId,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((data) => {
            getProducts();
            alert(data.data.message);
        });
    };

    return (
        <div>
            <Container className='mt-5'>
                <Card>
                    <Card.Title className='text-center mt-3'>
                        <span className='fs-3'>Master Products</span>
                    </Card.Title>
                    <Card.Body>
                        <Table bordered responsive='sm' className='text-center' style={{ border: '10px' }}>
                            <thead>
                                <tr>
                                    <th>Kode Product</th>
                                    <th>Nama Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.kode_product}</td>
                                        <td>{item.title}</td>
                                        <td>{item.quantity}</td>
                                        <td>Rp. {item.price}</td>
                                        <td>
                                            <Card.Link href={`/master-products/update/${item.id}`} className='btn btn-primary'>Edit</Card.Link>
                                            <Button onClick={() => deleteProduct(item.id)} className='btn btn-secondary'>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className='mt-3'>
                            <Card.Link className='btn btn-primary' href='/master-products/create'>Tambah Data</Card.Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container >
        </div>
    )
}

export default TableProduct