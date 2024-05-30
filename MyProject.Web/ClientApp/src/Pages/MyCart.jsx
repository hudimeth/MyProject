import React, { useState, useEffect } from 'react';
import { useAuth } from '../Components/AuthContextComponent';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import CartItem from '../Components/CartItem';
import axios from 'axios';
import Cart from '../assets/icons/cart4.svg';

const MyCart = () => {

    //figure out where's the best place to calculate the subtotal
    //for the link to cart i calculated it on the backend
    //and here i did it on the frontend

    const { user } = useAuth();
    const [myCart, setMyCart] = useState({
        cartItems: [],
        savedForLaterItems: []
    });
    const [subtotalPrice, setSubtotalPrice] = useState(0);

    const loadCartItems = async () => {
        const { data } = await axios.get('/api/cart/mycart');
        console.log(data);
        await setMyCart(data);
        if (user) {
            if (data.cartItems[0]) {
                await loadSubtotalPrice(data.cartItems);
            }
            else {
                await setSubtotalPrice(0)
            }
        }
    };

    const loadSubtotalPrice = (data) => {
        const subtotalList = data.map(ci => {
            return ci.totalPriceForCartItem;
        })
        setSubtotalPrice(subtotalList.reduce((a, v) => a + v));
    }

    useEffect(() => {
        loadCartItems()
    }, []);

    const emptyCart = user && !myCart.cartItems[0] && !myCart.savedForLaterItems[0]

    if (!user || emptyCart) {
        return (
            <Container className='pt-5 col-8'>
                <Card className='rounded-4 border-3 pt-3' style={{ backgroundColor: 'whitesmoke' }}>
                    <Card.Body>
                        <Container className='text-center'>
                            <h1>Your Cart is empty</h1>
                            {user && <h2>Start Shopping!</h2>}
                            {user && <Link to='/' className='nav-link'><img src={Cart} width='100' height='100' /></Link> }
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
                <Container>
                    {myCart.cartItems.map(ci => <CartItem key={ci.productId} cartItem={ci} loadCartItems={loadCartItems} />)}
                </Container>
                <Container className='mt-5'>
                    <h3>Saved For Later:</h3>
                    {myCart.savedForLaterItems.map(ci => <CartItem key={ci.productId} cartItem={ci} loadCartItems={loadCartItems} />)}
                </Container>
            </Container>
            <Container className='col-5 mt-3'>
                <Card className='col-10 offset-md-2 rounded-4 border-3' style={{ backgroundColor: 'whitesmoke' }}>
                    <Card.Body>
                        <Container style={{ height: 200 }} >
                            <Container className='row'>
                                <Container className='col-6'>
                                    <h2>Subtotal:</h2>
                                </Container>
                                <Container className='col-6 text-end'>
                                    <h2>${subtotalPrice.toFixed(2)}</h2>
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