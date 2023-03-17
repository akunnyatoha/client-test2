import axios from 'axios';
import { React, useState, useEffect } from 'react'
import { Button, Card, Container, Table } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom';
// import { customers } from '../../dummy'


const TableCustomer = () => {

    const [customers, setCustomers] = useState([]);
    // const navigate = useNavigate();

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = async () => {

        // console.log(config);
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
    }

    const deleteCustomer = async (paramsId) => {
        console.log(paramsId);
        await axios({
            method: 'get',
            url: 'http://localhost:8000/api/master-customers/destroy/' + paramsId,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((data) => {
            getCustomers();
            alert(data.data.message);
        });
    };

    return (
        <div>
            <Container className='mt-5'>
                <Card>
                    <Card.Title className='text-center mt-3'>
                        <span className='fs-3'>Master Customer</span>
                    </Card.Title>
                    <Card.Body>
                        <Table bordered responsive='sm' className='text-center' style={{ border: '10px' }}>
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>No. Telepone</th>
                                    <th>Email</th>
                                    <th>Alamat</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.nama}</td>
                                        <td>{item.no_telepon}</td>
                                        <td>{item.email}</td>
                                        <td>{item.alamat}</td>
                                        <td>
                                            <Card.Link href={`/master-customers/update/${item.id}`} className='btn btn-primary'>Edit</Card.Link>
                                            <Button onClick={() => deleteCustomer(item.id)} className='btn btn-secondary'>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className='mt-3'>
                            <Card.Link className='btn btn-primary' href='/master-customers/create'>Tambah Data</Card.Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container >
        </div>
    )
}

export default TableCustomer