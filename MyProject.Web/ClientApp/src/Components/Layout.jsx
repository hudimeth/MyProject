import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContextComponent';
import axios from 'axios';
import { NavDropdown} from 'react-bootstrap';
import Cart from '../assets/icons/cart-fill.svg';
import { HubConnectionBuilder } from '../../node_modules/@microsoft/signalr/dist/esm/HubConnectionBuilder';

const Layout = ({ children }) => {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [cartItemsLink, setCartItemsLink] = useState({
        itemsCount: 0,
        subtotal:0
    });

    const connectionRef = useRef(null);

    useEffect(() => {
        const loadCategories = async () => {
            const { data } = await axios.get('/api/categories/allcategories');
            setCategories(data)
        };
        loadCategories();
    }, []);

    useEffect(() => {
        const loadCartItemsLink = async () => {
            const { data } = await axios.get('/api/cart/cartitemslink');
            setCartItemsLink(data);
        }
        loadCartItemsLink();
    }, []);

    useEffect(() => {
        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl('/api/cartitems').build();
            await connection.start();
            connectionRef.current = connection;

            connection.on('updatedcartitemscount', async (data) => {
                await setCartItemsLink(data);
                console.log(data);
            })
        }
        connectToHub();
    }, []);

    //const [show, setShow] = useState(false);

    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-light fixed-top bg-info">
                    <div className="container">

                        <Link className="navbar-brand navbar" to='/'>Babies Galore</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                {categories.map(c => <li key={c.id} className='nav-item'><Link to={`/productsbycategory/${c.id}`} className='nav-link'>{c.name}</Link></li>)}
                            </ul>
                            <ul className="navbar-nav justify-content-end">
                                {user && <NavDropdown title={`Hi ${user.firstName}`} id="basic-nav-dropdown" drop='down-centered'>
                                    <NavDropdown.Item as={Link} to='/myorders'>My Orders</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to='/logout'>Log Out</NavDropdown.Item>
                                </NavDropdown>}
                                {!user && <li className='nav-item'><Link to='/signup' className='nav-link'>Sign Up</Link></li>}
                                {!user && <li className='nav-item'><Link to='/login' className='nav-link'>Login</Link></li>}
                                <li className='nav-item'>
                                    <Link to='/mycart' className='nav-link'><img src={Cart} width='30' height='30' /></Link>
                                </li>
                                <li><p className='me-2'><strong>{cartItemsLink.itemsCount}</strong></p></li>
                                {/*<li><p onMouseEnter={handleShow} onMouseLeave={handleClose} className='me-2'><strong>{cartItemsCount}</strong></p></li>*/}
                                {!!cartItemsLink.subtotal && <li className='nav-item'><Link className='nav-link'></Link><h5><strong>${cartItemsLink.subtotal.toFixed(2)}</strong></h5></li>}
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