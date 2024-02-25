import React, { useState, useRef } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios'

const CartItem = ({ cartItem, loadCartItems}) => {
    const { productId, title, description, pricePerUnit, amount, totalPriceForCartItem, savedForLater } = cartItem;

    const [realTimeAmount, setRealTimeAmount] = useState(amount);

    const amountInput = useRef(null);

    const handleAmountUpdate = async (newAmount) => {
        setRealTimeAmount(newAmount);
        await axios.post('/api/cart/updatecartitem', { productId, amount: newAmount, savedForLater });
        await amountInput.current.blur();
        await loadCartItems();
    }

    const handleDelete = async () => {
        console.log(productId);
        await axios.post('/api/cart/deleteitem', { productId });
        await loadCartItems();
    }

    return (
        <Card className='rounded-4 border-3 mt-3' style={{ backgroundColor: 'whitesmoke' }}>
            <Card.Body>
                <Container className='row'>
                    <Container className='col-4'>
                        <Container className="d-flex bg-secondary" style={{ height: 200 }} >
                            <Container className="vr bg-secondary"></Container>
                        </Container>
                    </Container>
                    <Container className='col-8'>
                        <Container className='row'>
                            <Container className='col-8 text-center'>
                                <h3>{title}</h3>
                                <h5>{description}</h5>
                            </Container>
                            <Container className='col-4 text-center' >
                                <Form className='col-md-6 offset-md-3'>
                                    <Form.Label>Amount:</Form.Label>
                                    <Form.Control type='number' value={realTimeAmount} min='1' ref={amountInput } onChange={e => handleAmountUpdate(e.target.value)} />
                                </Form>
                            </Container>
                            <Container className='row mt-4'>
                                <Container className='col-6 offset-md-2 text-end'>
                                    <h6>Price Per Item:</h6>
                                    <h5>Total:</h5>
                                </Container>
                                <Container className='col-4 text-center'>
                                    <h6>${pricePerUnit.toFixed(2)}</h6>
                                    <h5>${totalPriceForCartItem.toFixed(2)}</h5>
                                </Container>
                            </Container>
                        </Container>
                    </Container>
                    <Container className='row mt-3'>
                        <Container className=' offset-md-4 col-4'>
                            <Button className='w-100 text-center' variant='info'>Save For Later</Button>
                        </Container>
                        <Container className='col-4'>
                            <Button className='w-100 text-center' variant='danger' onClick={handleDelete }>Remove From Cart</Button>
                        </Container>
                    </Container>
                </Container>
            </Card.Body>
        </Card>
    )
}
export default CartItem;