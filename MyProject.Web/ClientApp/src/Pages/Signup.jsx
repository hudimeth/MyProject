import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });
    const [userExistsForThisEmail, setUserExistsForThisEmail] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const canSubmit = formData.firstName && formData.lastName && formData.email && formData.password && formData.passwordConfirmation

    const onTextChange = e => {
        const copy = { ...formData }
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        const { data } = await axios.post('/api/account/signup', formData);
        const userExists = data.userExistsForThisEmail;
        setUserExistsForThisEmail(userExists);
        const passwordsMatch = data.passwordsMatch;
        setPasswordsMatch(passwordsMatch);
        if (!userExists & passwordsMatch) {
            navigate('/login')
        }
    }
    return (
        <div className='container'>
            <div className='row col-md-6 offset-md-3 pt-5'>
                <div className='card border border-secondary border-3 bg-secondary bg-opacity-10' style={{ width: 500, backgroundColor: 'pink' }}>
                    <h2 className='text-center mt-3'>New Account</h2>
                    <div className='card-body'>
                        <form onSubmit={onFormSubmit}>
                            <hr className='dropdown-divider' style={{ opacity: 1, color: 'grey' }} />
                            {userExistsForThisEmail && <h6 className='text-danger text-center'>An account exists with this email address. Please try again.</h6>}
                            {!passwordsMatch && <h6 className='text-danger text-center'>Passwords don't match. Please try again.</h6>}
                            <input className='form-control' placeholder='First Name' name='firstName' onChange={onTextChange} value={formData.firstName} />
                            <input className='form-control mt-3' placeholder='Last Name' name='lastName' onChange={onTextChange} value={formData.lastName} />
                            <input className='form-control mt-3' placeholder='Email' name='email' onChange={onTextChange} value={formData.email} />
                            <input className='form-control mt-3' type='password' placeholder='Password' name='password' onChange={onTextChange} value={formData.password} />
                            <input className='form-control mt-3' type='password' placeholder='Confirm Password' name='passwordConfirmation' onChange={onTextChange} value={formData.passwordConfirmation} />
                            <button className='btn btn-secondary w-100 mt-4' disabled={!canSubmit}>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;