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
export default function FormPropsAddPostFields() {
    const [title, setTitle] = React.useState<string>('Title');
    const [description, setDescription] = React.useState<string>('Description');
    const [body, setBody] = React.useState<string>('Body');

    const router = useRouter()
    // async function handleLogin() {
    //     const data = { email: email, password: password }
    //     try {
    //         const response = await fetch("http://localhost:3001/auth/login", {
    //             method: "POST", // or 'PUT'
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(data),
    //         });
    //         const result = await response.json();
    //         const jwtToken = result.accessToken;
    //         const userId = result.userID;
    //         if (!result.error) {
    //             const res = await fetch("/api/login", {
    //                 method: "POST",
    //                 body: JSON.stringify({ email, jwtToken, userId }),
    //                 headers: { "Content-Type": "application/json" },
    //             });
    //             const { success } = await res.json();

    //             if (success) {
    //                 // router.push('/')
    //                 router.push('/');
    //                 location.reload();
    //             } else {
    //                 // Make your shiny error handling with a great user experience
    //                 alert("Login failed");
    //             }
    //             //router.push('/')
    //         }
    //         else {
    //             console.log("error :", result)
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }

    // }
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <div style={{ flexDirection: 'column' }}>
                <div>
                    <TextField
                        required
                        id="filled-required"
                        label="Required"
                        defaultValue="Title"
                        variant="filled"
                        onChange={(e) => { setTitle(e.target.value); }}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="filled-required"
                        label="Required"
                        defaultValue="Description"
                        variant="filled"
                        onChange={(e) => { setDescription(e.target.value); }}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="filled-required"
                        label="Required"
                        defaultValue="body"
                        variant="filled"                                           
                        onChange={(e) => { setBody(e.target.value); }}
                    />
                </div>
                <div>
                    <FormControl style={{ paddingLeft: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Do you want to publish?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="publishYes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="publishNo" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <Button style={{marginLeft:20,marginTop: 20, marginRight: 10 }} variant="contained">Cancel</Button>
                <Button style={{marginLeft:15,marginTop: 20, marginRight: 10 }} variant="contained">Add Post</Button>
            </div>
        </Box>
    );
}