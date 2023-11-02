'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
export default function FormPropsTextFields() {
    async function handleLogin () {
        console.log("login")
    }
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 'auto',
            }}
            noValidate
            autoComplete="off"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="10vh" // set the height to 100% of the viewport height

        >
            <LockIcon style={{color:'red',fontSize:50}}/>
            <div style={{ marginTop:10, flexDirection:"column" , borderStyle: 'groove' }}>
                
                <TextField
                    required
                    id="filled-required"
                    label="Required"
                    defaultValue="Email"
                    variant="filled"
                />
                <TextField
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                />
                <Button style={{ marginTop:20,marginRight:10}} variant="contained" onClick={handleLogin}>Log in</Button>
            </div>
            <div style={{ marginTop: 10 }}>
                <a style={{marginRight:10}}href="/register">Don't have an account? Sign Up</a>
                <a style={{marginLeft:10}}href="/recovery-password">Forgot password?</a>
            </div>
        </Box>
    );
}