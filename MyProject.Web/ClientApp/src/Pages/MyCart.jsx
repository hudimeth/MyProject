import React, { useState, useEffect } from 'react';
import { useAuth } from '../Components/AuthContextComponent';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import CartItem from '../Components/CartItem';
import axios from 'axios';

const MyCart = () => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [priceBeforeShipping, setPriceBeforeShipping] = useState(0);
    const [shippingPrice, setShippingPrice] = useState(50);

    const subtotal = priceBeforeShipping + shippingPrice;

    const loadSubtotalPrice = (data) => {
        const subtotalList = data.map(ci => {
            return ci.totalPriceForCartItem;
        })
        setPriceBeforeShipping(subtotalList.reduce((a, v) => a + v));
    }

    const loadCartItems = async () => {
        const { data } = await axios.get('/api/cart/mycart');
        await setCartItems(data);
        await loadSubtotalPrice(data);
    };

    useEffect(() => {
        loadCartItems()
    }, []);


    if (!user || !cartItems[0]) {
        return (
            <Container className='pt-5 col-8'>
                <Card className='rounded-4 border-3 pt-3' style={{ backgroundColor: 'whitesmoke' }}>
                    <Card.Body>
                        <Container className='text-center'>
                            <h1>Your Cart is empty</h1>
                            {user && <h2>Start Shopping!</h2>}
                            {!user && <h2>Sign in to add items to your cart!</h2>}
                            {!user && <Container className='row'>
                                <Container className='col-6'>
                                    <Link to='/login' className='btn btn-info w-100'>Login</Link>
                                </Container>
                                <Container className='col-6'>
                                    <Link to='/signup' className='btn btn-secondary w-100'>Sign up for an account</Link>
                                </Container>
                            </Container>}
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        )
    }

    return (
        <Container className='row pt-2'>
            <h1>Shopping Cart</h1>
            <Container className='col-7'>
                {cartItems.map(ci => <CartItem key={ci.productId} cartItem={ci} loadCartItems={loadCartItems} />)}
            </Container>
            <Container className='col-5 mt-3'>
                <Card className='col-10 offset-md-2 rounded-4 border-3' style={{ backgroundColor: 'whitesmoke' }}>
                    <Card.Body>
                        <Container style={{ height: 200 }} >
                            <Container className='row'>
                                <Container className='col-6'>
                                    <h6>Items</h6>
                                    <h6>Shipping</h6>
                                    <h2>Subtotal:</h2>
                                </Container>
                                <Container className='col-6 text-end'>
                                    <h6>${priceBeforeShipping.toFixed(2)}</h6>
                                    <h6>${shippingPrice.toFixed(2)}</h6>
                                    <h2>${subtotal.toFixed(2)}</h2>
                                </Container>
                                <Container className='mt-5'>
                                    <Button variant='secondary' className='w-100'>Proceed to Checkout</Button>
                                </Container>
                            </Container>
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        </Container>
    )
}

export default MyCart;