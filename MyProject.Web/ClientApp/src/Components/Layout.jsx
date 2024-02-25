import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContextComponent';
import axios from 'axios';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cart from '../assets/icons/cart-fill.svg';
/*import Offcanvas from 'react-bootstrap/Offcanvas';*/

const Layout = ({ children }) => {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const { data } = await axios.get('/api/categories/allcategories');
            setCategories(data)
        };
        loadCategories();
    }, [])


    //const [show, setShow] = useState(false);

    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-light fixed-top bg-info">
                    <div className="container">

                        <Link className="navbar-brand navbar" to='/'>My Company</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                {categories.map(c => <li key={c.id} className='nav-item'><Link to={`/productsbycategory/${c.id}`} className='nav-link'>{c.name}</Link></li>)}
                            </ul>
                            <ul className="navbar-nav justify-content-end flex-grow-1">
                                {user && <NavDropdown title={`Hi ${user.firstName}`} id="basic-nav-dropdown" drop='down-centered'>
                                    <NavDropdown.Item as={Link} to='/myorders'>My Orders</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to='/logout'>Log Out</NavDropdown.Item>
                                </NavDropdown>}
                                {!user && <li className='nav-item'><Link to='/signup' className='nav-link'>Sign Up</Link></li>}
                                {!user && <li className='nav-item'><Link to='/login' className='nav-link'>Login</Link></li>}
                                <li className='nav-item'>
                                    <Link to='/mycart' className='nav-link'><img src={Cart} width='25' height='25'/></Link>
                                </li>
                                {/*<li className='nav-item'><img src={Cart} width='25' height='25' onMouseEnter={handleShow} onMouseLeave={handleClose} /></li>*/}
                            </ul>
                        </div>
                    </div>
                </nav>

            </header>
            <div className='container' style={{ marginTop: 80 }}>
                {children}
            </div>
            {/*<Offcanvas show={show} placement='end'>*/}
            {/*    <Offcanvas.Header closeButton>*/}
            {/*        <Offcanvas.Title>Offcanvas</Offcanvas.Title>*/}
            {/*    </Offcanvas.Header>*/}
            {/*    <Offcanvas.Body>*/}
            {/*        Some text as placeholder. In real life you can have the elements you*/}
            {/*        have chosen. Like, text, images, lists, etc.*/}
            {/*    </Offcanvas.Body>*/}
            {/*</Offcanvas>*/}
        </div>
    )
}

export default Layout;