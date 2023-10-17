import React, { useState } from 'react'


function Login() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );
    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();
        console.log("abo")
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}

export default Login;