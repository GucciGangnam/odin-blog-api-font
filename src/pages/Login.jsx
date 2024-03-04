
// Import React 
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
// Import Styles
import "./Login.css"

//Component 
export const Login = ({ setUserAccessToken}) => { 

    const navigate = useNavigate();
    // States 
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false)
    const [networkError, setNetworkError] = useState(false)

    // Handle submit 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name, password }),
                credentials: 'include'
            });
            if (response.ok) {
                setNetworkError(false)
                console.log("Response OK!");
                const authorizationHeader = response.headers.get('Authorization');
                const token = authorizationHeader.split(' ')[1];
                localStorage.setItem('UserAccessToken', token);
                setUserAccessToken(token);
                navigate('/');
            } else { 
                setNetworkError(false)
                setLoginError(true);
                console.log("not ok")
                setPassword("")
            }
        } catch (error) {
            console.error(error);
            setNetworkError(true)
        }
    };

    const handleNameChange = (e) => { 
        const newName = e.target.value;
        setName(newName);
    }

    const handlePasswordChnage = (e) => { 
        const newPassword = e.target.value;
        setPassword(newPassword);
    }

    return( 
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                value={name}
                onChange={handleNameChange}
                name="username"
                id="username"
                required
                />
                <label htmlFor="password">Password</label>
                <input
                value={password}
                onChange={handlePasswordChnage}
                type="password"
                name="password"
                id="password"
                required
                />
                
                <button type="submit">Log in</button>
            </form>
            {loginError && <div style={{ color: 'red' }}>Username and password combination dont match</div>}
            {networkError && <div style={{ color: 'red' }}>Network error, please try again later</div>}
        </div>
    )
}