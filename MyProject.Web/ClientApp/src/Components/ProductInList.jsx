import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const ProductInList = ({ product }) => {
    const { id, title, description, price } = product;

    return (
        <Link to={`/productdetail/${id}`} style={{textDecoration:'none'} }>
            <Card className='col-10 offset-md-2 mt-4 rounded-4 border-3' style={{ backgroundColor: 'whitesmoke' }}>
                <Card.Body>
                    <div className='row'>
                        <div className='col-4'>
                            <div className="d-flex bg-secondary" style={{ height: 200 }} >
                                <div className="vr"></div>
                            </div>
                        </div>
                        <div className='col-8' >
                            <h2>{title}</h2>
                            <h4>{description}</h4>
                            <h1>${price.toFixed(2)}</h1>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default ProductInList;