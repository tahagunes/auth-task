import React, { useState } from 'react'


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();
        console.log("client submit")
        //getHello
        // fetch("http://localhost:3001", {
        //     method: "GET",
        //     mode: 'cors' // 'no-cors' değil, 'cors' olarak ayarlayın
        // })
        //     .then((response) => response.text()) // response.text() kullanarak içeriği alın
        //     .then((data) => {console.log("data", data); })
        //     .catch((error) => console.log(error));
        //http://localhost:3001/auth/login
        fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                // email: 'sabin@adams.com',
                // password: 'password-sabin'
                email: email,
                password: password
            })
        })
            .then((response) => response.json()) // response.text() kullanarak içeriği alın
            .then((data) => { console.log("accesToken ", data.accessToken); })
            .catch((error) => {console.log(error); return;});
            

    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="text"
                     value={email} 
                     onChange={e => setEmail(e.target.value)} 
                    required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="text"
                     value={password} 
                     onChange={e => setPassword(e.target.value)} 
                    required />
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}

export default Login;