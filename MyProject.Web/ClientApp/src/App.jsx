import React from 'react';
import { Routes, Route } from 'react-router';
import { AuthContextComponent } from './Components/AuthContextComponent';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Layout from './Components/Layout';
import Logout from './Components/Logout';
import ProductsByCategory from './Pages/ProductsByCategory';
import ProductDetail from './Pages/ProductDetail';
import PrivateRoute from './Components/PrivateRoute';
import MyCart from './Pages/MyCart';

const App = () => {
    //i installed axios react-router-dom dayjs floating-ui (popper.js) react-bootstrap bootstrap-icons
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/logout' element={<Logout />} />
                    <Route exact path='/productsbycategory/:categoryId' element={<ProductsByCategory />} />
                    <Route exact path='/productdetail/:productId' element={<ProductDetail />} />
                    <Route exact path='/mycart' element={<MyCart/>} />
                </Routes>
            </Layout>
        </AuthContextComponent>
    )
}
export default App;