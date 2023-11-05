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
    id: string,
    email: string,
    createdAt: string,
    updatedAt: string,
) {
    return { id,email,createdAt,updatedAt };
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
    const auth = useAuth();
    useEffect(() => {
        if (auth && auth.auth && auth.auth.jwtToken) {
            const jwtTokenVerification = auth.auth.jwtToken;
            try {
                fetch("http://localhost:3001/user", {
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
                            rows.push(createData(results.id,results.email,results.createdAt,results.updatedAt))
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
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">EMAIL</TableCell>
                        <TableCell align="right">CREATED AT</TableCell>
                        <TableCell align="right">UPDATED AT</TableCell>
                    </TableRow>
                </TableHead>
                {canShows && (
                <TableBody>
                    
                        {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.createdAt}</TableCell>
                            <TableCell align="right">{row.updatedAt}</TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>
                )}
            </Table>
        </TableContainer>
        
        </div>
    );
}
