import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CartFill from '../assets/icons/cart-fill.svg';
import Cart from '../assets/icons/cart.svg';
import { Link } from 'react-router-dom';

const AddedToCartConfirmation = () => {
    return (
        <Container className='pt-5'>
            <Row className='pt-5'>
                <Col></Col>
                <Col className='text-center' xs={6}>
                    <h1>The item was added to your cart!</h1>
                    <img className='mx-2 my-3' src={CartFill} width='70' height='70' />
                    <img className='mx-2 my-3' src={Cart} width='70' height='70' />
                    <img className='mx-2 my-3' src={CartFill} width='70' height='70' />
                    <img className='mx-2 my-3' src={Cart} width='70' height='70' />
                    <Row className='mt-2'>
                        <Link className='btn btn-light' to='/mycart'><h3>Click here to view your cart</h3></Link>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
        </Container>
        )
}
export default AddedToCartConfirmation;