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
export default function FormPropsAddPostFields() {
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [body, setBody] = React.useState<string>('');
    const [value, setValue] = React.useState('yes');
    const [published, setPublished] = React.useState(true);

    const auth = useAuth();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };
    //auth && auth.auth && auth.auth.jwtToken
    const router = useRouter()
    async function handleSubmit() {
        if (title && description && body) {
            if (value == 'yes') { console.log("yesgeldi"); setPublished(true); }
            else setPublished(false);
            const data = { title: title, description: description, body: body, published: published }
            if (auth && auth.auth && auth.auth.jwtToken) {
                const jwtTokenVerification = auth.auth.jwtToken;
                try {
                    fetch("http://localhost:3001/posts", {
                        method: "POST", // or 'PUT'
                        headers: {
                            'Authorization': `Bearer ${jwtTokenVerification}`,
                            'Content-Type': 'application/json', // Adjust as needed
                        },
                        body: JSON.stringify(data),
                    })
                        .then(async (response: any) => {
                            const result = await response.json()
                            console.log("res", result)
                            router.push('/posts')
                        }).catch((err: any) => {
                            console.log("err", err)
                        });

                } catch (error) {
                    console.error("Error:", error);
                }
            }
        }
        else { if(!title) console.log("title boş olamaz")
    else if(!description) console.log("description boş olamaz")
else console.log("body boş olamaz")
return;}

    }
    function handleCancel() {
        router.push('/posts');
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
                <div>

                    <TextField
                        required
                        id="filled-required"
                        label="Title"
                        //defaultValue="Title"
                        variant="filled"
                        onChange={(e) => { setTitle(e.target.value); }}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="filled-required"
                        label="Description"
                        //defaultValue="Description"
                        variant="filled"
                        onChange={(e) => { setDescription(e.target.value); }}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="filled-multiline-static"
                        label="Body"
                        multiline
                        rows={4}
                        //defaultValue="Post content"
                        variant="filled"
                        onChange={(e) => { setBody(e.target.value); }}
                    />

                </div>
                <div >
                    <FormControl style={{ marginTop: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Do you want to publish?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={handleChange}
                            defaultValue={'yes'}
                        >
                            <FormControlLabel value='yes' control={<Radio />} label="Yes" />
                            <FormControlLabel value='no' control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div>
                    <Button style={{ marginTop: 20, marginRight: 10 }} variant="contained" onClick={handleCancel}>Cancel</Button>
                    <Button style={{ marginLeft: 15, marginTop: 20, marginRight: 10 }} variant="contained" onClick={handleSubmit}>Add Post</Button>
                </div>
            </div>
        </Box>
    );
}