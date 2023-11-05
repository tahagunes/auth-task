'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import { useAuth } from '@/hooks/useAuth';
export default function FormPropsAddUserFields() {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const router = useRouter()
    async function handleSubmit() {
        if (email && password) {
            const data = { email:email,password:password }
            
            
                try {
                    fetch("http://localhost:3001/user", {
                        method: "POST", // or 'PUT'
                        headers: {                            
                            'Content-Type': 'application/json', // Adjust as needed
                        },
                        body: JSON.stringify(data),
                    })
                        .then(async (response: any) => {
                            const result = await response.json()
                            console.log("res", result)
                            router.push('/users')
                        }).catch((err: any) => {
                            console.log("err", err)
                        });

                } catch (error) {
                    console.error("Error:", error);
                }
            
        }
        else { if(!email) console.log("email boş olamaz")    
else console.log("password boş olamaz")
return;}

    }
    function handleCancel() {
        router.push('/users');
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch', height: '10ch' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            noValidate
            autoComplete="off"
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
                    required
                    id="filled-required"
                    label="Email"
                    //defaultValue="Email"
                    variant="filled"
                    onChange={(e) => { setEmail(e.target.value); }}
                />
                <TextField
                    required
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    onChange={(e) => { setPassword(e.target.value); }}

                />
                <div>
                    <Button style={{ marginTop: 20, marginRight: 10 }} variant="contained" onClick={handleCancel}>Cancel</Button>
                    <Button style={{ marginLeft: 15, marginTop: 20, marginRight: 10 }} variant="contained" onClick={handleSubmit}>Add User</Button>
                </div>
            </div>
        </Box>
    );
}