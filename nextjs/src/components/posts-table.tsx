'use client'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

function createData(
    title: string,
    description: string,
    body: string,
    updatedAt: string,
    author: string,
) {
    return { title, description, body, updatedAt, author };
}

const rows = [
    // createData('Frozen yoghurt', "159", "6.0", "24", "a"),
    // createData('Ice cream sandwich', "237", "9.0", "37", "s"),
    // createData('Eclair', "262", "16.0", "24", "as"),
    // createData('Cupcake', "305", "3.7", "67", "asd"),
    // createData('Gingerbread', "356", "16.0", "49", "321"),
];

export default function PostsTable() {
    const [canShows,setCanShows] = useState(false);
    //auth.auth.jwtToken
    const auth = useAuth();
    useEffect(() => {
        if (auth && auth.auth && auth.auth.jwtToken) {
            const jwtTokenVerification = auth.auth.jwtToken;
            try {
                fetch("http://localhost:3001/posts", {
                    method: "GET", // or 'PUT'
                    headers: {
                        'Authorization': `Bearer ${jwtTokenVerification}`,
                        'Content-Type': 'application/json', // Adjust as needed
                    },
                })
                    .then(async (response: any) => {
                        const result = await response.json()
                        console.log("res", result)
                       
                        result.map((results: any) => (                            
                            rows.push(createData(results.title,results.description,results.body,results.updatedAt,results.author.email))
                        ))
                        console.log("rows", rows)
                        setCanShows(true);
                    }).catch((err: any) => {
                        console.log("err", err)
                    });

            } catch (error) {
                console.error("Error:", error);
            }
        }
    }, [auth])


    return (
        <div>            
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Body</TableCell>
                        <TableCell align="right">Updated At</TableCell>
                        <TableCell align="right">Author</TableCell>
                    </TableRow>
                </TableHead>
                {canShows && (
                <TableBody>
                    
                        {rows.map((row) => (
                        <TableRow
                            key={row.title}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.body}</TableCell>
                            <TableCell align="right">{row.updatedAt}</TableCell>
                            <TableCell align="right">{row.author}</TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>
                )}
            </Table>
        </TableContainer>
        
        </div>
    );
}
