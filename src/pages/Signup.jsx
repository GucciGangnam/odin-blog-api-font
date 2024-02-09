import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

export const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        nameError: '',
        username: '',
        usernameError: '',
        email: '',
        password: '',
        confirmPassword: '',
        confirmPasswordError: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            confirmPasswordError: name === 'confirmPassword' && value !== formData.password ? 'Passwords do not match' : ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setFormData(prevState => ({
                ...prevState,
                confirmPasswordError: 'Passwords do not match'
            }));
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Success - handle accordingly
                console.log('User created successfully!');
            } else {
                console.error('Failed to create user:', response.statusText);
                // Handle error responses
                console.log(response.json().errors)
                const errorData = response.json(); // Assuming error response contains JSON data
                if (errorData && errorData.message) {
                    console.log('errors')
                    setFormData(prevState => ({
                        ...prevState,
                        confirmPasswordError: errorData.message
                    }));
                }
            }
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
    };

    return (
        <div className='Signup'>
            <div className='Signup-Form-Container'>
                <div className='Form-Title'>
                    Sign Up
                </div>
                <form method='POST' className='Signup-Form' onSubmit={handleSubmit}>
                    <div className='Input-section'>
                        <label htmlFor="name">Name:{formData.nameError}</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='Input-section'>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='Input-section'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='Input-section'>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='Input-section'>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {formData.confirmPasswordError && <span className="Signup-Error">{formData.confirmPasswordError}</span>}
                    </div>
                    <button className='Signup-Form-Button' type='submit'>Sign up</button>
                    <span>Already have an account? <Link to={`/login`} >login</Link></span>
                </form>
            </div>
        </div>
    );
};
