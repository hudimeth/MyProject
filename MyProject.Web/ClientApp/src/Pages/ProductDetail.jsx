import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, Spinner, Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../Components/AuthContextComponent';

const ProductDetail = () => {

    //what to do when you add an item to cart that's already in the cart?

    const { productId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [product, setProduct] = useState({
        id: 0,
        categoryId: 0,
        title: '',
        description: '',
        price: 0,
        unitsInStock: 0,
    });
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        const loadProducts = async () => {
            const { data } = await axios.get(`/api/products/byid?productId=${productId}`);
            setProduct(data);
        }
        loadProducts();
    }, []);

    const handleAddToCart = async() => {
        await axios.post('/api/cart/addtocart', { productId: product.id, amount });
        navigate('/addedtocartconfirmation');
    }

    if (product.id == 0) {
        return (
            <Container className='container pt-5'>
                <Container className="text-center">
                    <Spinner animation="grow" variant="secondary" />
                    <h4>Loading content...</h4>
                </Container>
            </Container>
        )
    }

    return (
        <Container className='pt-5 row'>
            <Container className='offset-md-1 col-md-8'>
                <Card className=' rounded-4 border-3' style={{ backgroundColor: 'whitesmoke' }}>
                    <Card.Body>
                        <Container className='row'>
                            <Container className='col-6'>
                                <Container className="d-flex bg-secondary" style={{ height: 360 }} >
                                    <Container className="vr bg-secondary"></Container>
                                </Container>
                            </Container>
                            <Container className='col-6 mt-3'>
                                <h1 className='text-center'>{product.title}</h1>
                                <h4 className='text-center'>{product.description}</h4>
                                <h1 className='text-center'>${product.price.toFixed(2)}</h1>
                            </Container>
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
            <Container className='col-md-3 mt-4'>
                <Container>
                    <Card className='rounded-4 border-3' style={{ backgroundColor: 'whitesmoke' }}>
                        <Card.Body>
                            <Form className='pt-5 col-md-6 offset-md-3'>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type='number' value={amount} onChange={e => setAmount(e.target.value)} />
                            </Form>
                            <Container className='mt-3'>
                            {user ? <Button className='btn-lg w-100' variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
                                    : <Link to='/login' className='text-center' variant="secondary"><h5>Sign in to add this item to your cart</h5></Link>}
                            </Container>
                            <Button className='btn-lg w-100 mt-3' variant="success">Buy it Now</Button>
                        </Card.Body>
                    </Card>
                </Container>
            </Container>
        </Container>
    )
}

export default ProductDetail;