import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Table } from 'react-bootstrap'
// import { salesOrder } from '../../dummy'

const TableSalesOrder = () => {

    const [salesOrders, setSalesOrders] = useState([]);

    useEffect(() => {
        getSalesOrder();
    }, []);

    const getSalesOrder = async () => {

        // console.log(config);
        await axios({
            method: 'get',
            url: 'http://localhost:8000/api/master-sales-orders',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((data) => {
            // console.log(data);
            setSalesOrders(data.data.data);
        });
    }

    const deleteSO = async (paramsId) => {
        console.log(paramsId);
        await axios({
            method: 'get',
            url: 'http://localhost:8000/api/master-customers/destroy/' + paramsId,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((data) => {
            getSalesOrder();
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
                                    <th>Customer</th>
                                    <th>No_Telepone</th>
                                    <th>Alamat</th>
                                    <th>Kode Product</th>
                                    <th>Title Product</th>
                                    <th>Quantity</th>
                                    <th>Harga Satuan</th>
                                    <th>Harga Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesOrders.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.nama}</td>
                                        <td>{item.no_telepon}</td>
                                        <td>{item.alamat}</td>
                                        <td>{item.kode_product}</td>
                                        <td>{item.title}</td>
                                        <td>{item.quantity}</td>
                                        <td>Rp. {item.price}</td>
                                        <td>Rp. {item.total_price}</td>
                                        <td>
                                            <Button onClick={() => deleteSO(item.id)} className='btn btn-secondary'>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className='mt-3'>
                            <Card.Link className='btn btn-primary' href='/master-sales-orders/create'>Tambah Data</Card.Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container >
        </div>
    )
}

export default TableSalesOrder