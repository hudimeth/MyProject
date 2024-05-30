import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Components/AuthContextComponent';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [isValidLogin, setIsValidLogin] = useState(true);

    const onTextChange = e => {
        const copy = { ...formData }
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        const { data } = await axios.post('/api/account/login', formData);
        const isValid = !!data;
        setIsValidLogin(isValid);
        setFormData({
            email: '',
            password: ''
        })
        if (isValid) {
            setUser(data);
            navigate('/');
        }
    }

    return (
        <div className='container' >
            <div className='row col-md-6 offset-md-3 pt-5'>
                <div className='card border border-secondary border-3 bg-secondary bg-opacity-10' style={{ width: 500 }}>
                    <h2 className='text-center mt-3'>My Account</h2>
                    <div className='card-body'>
                        <form onSubmit={onFormSubmit}>
                            <hr className='dropdown-divider' style={{ opacity: 1, color: 'grey' }} />
                            {!isValidLogin && <h6 className='text-danger text-center'>Invalid username/password. Please try again.</h6>}
                            <input className='form-control mt-3' type='text' placeholder='Email' name='email' onChange={onTextChange} value={formData.email} />
                            <input className='form-control mt-3' type='password' placeholder='Password' name='password' onChange={onTextChange} value={formData.password} />
                            <button className='btn btn-secondary w-100 mt-4 mb-2'>Login</button>
                            <Link className='link-dark' to='/signup'><h6 className='text-center'>Don't have an account with us? Click here to sign up!</h6></Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;