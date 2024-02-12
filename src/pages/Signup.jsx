
// Import React 
import React, { useState, useEffect} from 'react';



// Import Styles 
import "./Signup.css"

export const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Form validity states
    const [nameValid, setNameValid] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [formErrors, setFormErrors] = useState([])
    const [formValid, setFormValid] = useState(false)
    useEffect(() => {
        if (nameValid && usernameValid && emailValid && passwordValid && passwordMatch) {
            setFormValid(true);
        } else {
            setFormValid(false)
        }
    }, [nameValid, usernameValid, emailValid, passwordValid, passwordMatch,])





    //Handlers 
    // Function to handle name change
    const handleNameChange = (e) => {
        const newName = e.target.value.trim();
        setName(newName);
        // Perform validation
        const isThere = newName.length > 0;
        const isValid = /^[a-zA-Z ]+$/.test(newName); // Check if newName matches the pattern
        // Array of validation conditions and corresponding error messages
        const validationChecks = [
            { condition: !isThere, message: 'Required' },
            { condition: !isValid, message: 'Name can only contain letters' }
        ];
        // Filter out conditions that are true and extract their error messages
        const errors = validationChecks.filter(check => check.condition).map(check => check.message);
        // Update setNameValid based on combined validation checks
        setNameValid(isValid && isThere);
        // Set formErrors to the array of error messages
        setFormErrors(errors);

    };
    // Function to handle username change
    const handleUsernameChange = (event) => {
        const newUsername = event.target.value.trim();
        setUsername(newUsername);
        const isThere = newUsername.length > 0;
        const isLength = newUsername.length >= 3 && newUsername.length <= 20;
        const containsIllegals = !/^[a-zA-Z0-9._-]+$/.test(newUsername);
        // Array of validation conditions and corresponding error messages
        const validationChecks = [
            { condition: !isThere, message: 'Required' },
            { condition: !(newUsername.length >= 3 && newUsername.length <= 20), message: 'Username must be between 3 and 20 characters' },
            { condition: containsIllegals, message: 'Username can only contain letters, numbers, underscores, periods, and hyphens.' }
        ];
        // Filter out conditions that are true and extract their error messages
        const errors = validationChecks.filter(check => check.condition).map(check => check.message);
        // Update setUsernameValid based on combined validation checks
        setUsernameValid(isThere && isLength && !containsIllegals);
        // Set formErrors to the array of error messages
        setFormErrors(errors);
    };
    // Function to handle email change
    const handleEmailChange = (event) => {
        const newEmail = event.target.value.trim();
        setEmail(newEmail);
        const isThere = newEmail.length > 0;
        const isEmail = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(newEmail);
        const containsSpace = /\s/.test(newEmail); // Check if the email contains spaces
        // Array of validation conditions and corresponding error messages
        const validationChecks = [
            { condition: !isThere, message: 'Required' },
            { condition: !isEmail, message: 'Must be a valid email address' },
            { condition: containsSpace, message: 'Email address cannot contain spaces' } // Add condition for spaces
        ];
        // Filter out conditions that are true and extract their error messages
        const errors = validationChecks.filter(check => check.condition).map(check => check.message);
        // Update setEmailValid based on combined validation checks
        setEmailValid(isThere && isEmail && !containsSpace);
        // Set formErrors to the array of error messages
        setFormErrors(errors);
    };
    // Function to handle password change
    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        const isThere = newPassword.length > 0;
        const isLength = newPassword.length >= 8;
        const ContainsSpace = /\s/.test(newPassword);
        const containsLowerCase = /[a-z]/.test(newPassword);
        const containsUpperCase = /[A-Z]/.test(newPassword);
        const containsNumber = /\d/.test(newPassword);
        // Array of validation conditions and corresponding error messages
        const validationChecks = [
            { condition: !isThere, message: 'Required' },
            { condition: ContainsSpace, message: 'Must not contain spaces' },
            { condition: !containsLowerCase, message: 'Must contain at least 1 lowercase letter' },
            { condition: !containsUpperCase, message: 'Must contain at least 1 uppercase letter' },
            { condition: !containsNumber, message: 'Must contain at least one number' },
            { condition: !isLength, message: 'Must be at least 8 characters' }
        ];
        // Filter out conditions that are true and extract their error messages
        const errors = validationChecks.filter(check => check.condition).map(check => check.message);
        // Update setPasswordValid based on combined validation checks
        setPasswordValid(isThere && isLength && !ContainsSpace && containsLowerCase && containsUpperCase && containsNumber);
        // Set formErrors to the array of error messages
        setFormErrors(errors);
    };
    // Function to handle confirmation password change
    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value;
        // Your validation logic here
        // For simplicity, let's assume the confirmation password is valid if it matches the original password
        setConfirmPassword(newConfirmPassword);
        setPasswordMatch(newConfirmPassword === password);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        
    
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, username, email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Response OK!", data);
            } else { 
                const data = await response.json();
                setFormErrors([data.error])
                if (data.error == "Email already in use"){ 
                    setEmailValid(false);
                }
                if (data.error == "This username is already in use"){ 
                    setUsernameValid(false);
                }
                
            }
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className='Signup'>
            <form className='SignupForm' onSubmit={handleSubmit}>
                <div className='SignupMessage'>Sign Up</div>
                <label className='SignupFormLabel' htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name.trim()}
                    onChange={handleNameChange}
                    required
                    maxLength="50"
                    pattern="^[a-zA-Z ]+$" // Existing pattern allows only letters and spaces
                    className={nameValid ? "ValidInput" : "InvalidInput"}
                />

                <label className='SignupFormLabel' htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    minLength={3}
                    maxLength={20}
                    required
                    className={usernameValid ? "ValidInput" : "InvalidInput"}
                />

                <label className='SignupFormLabel' htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+" // Basic email format regex
                    className={emailValid ? "ValidInput" : "InvalidInput"}
                />

                <label className='SignupFormLabel' htmlFor="password">Password:</label>
                <input
                    type="password" // Use type="password" for security
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    minLength="8"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$"
                    className={passwordValid ? "ValidInput" : "InvalidInput"}
                />

                <label className='SignupFormLabel' htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password" // Use type="password" for security
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    disabled={!passwordValid}
                    required
                    className={passwordMatch ? "ValidInput" : "InvalidInput"}
                />

                <div className='FormErrors'>
                    <ul className='SignupFormUL'>
                        {formErrors.map((err, index) => (
                            <li className='SignupErrorList' key={index}>{err}</li>
                        ))}
                    </ul>
                </div>

                <button type="submit" className={formValid ? 'FormSubmitShow' : 'FormSubmitHide'}>
                    Submit
                </button>
            </form>
        </div>
    );
};



