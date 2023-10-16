
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { Table, TableHead, TableCell, TableRow, TableBody} from '@mui/material'
import { getStudent } from '../Service/api';

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;
const Student = () => {

    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const {Roll_No} = user;
    
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const addUserDetails = async() => {
        let response=await getStudent(user);
        setUsers(response.data);
        console.log(response.data);
        // navigate('/StudentData');
    }
  return (
    <>
    <Container>
            <Typography variant="h4">Search Student</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Roll_No</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='Roll_No' value={Roll_No} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addUserDetails()}>Search</Button>
            </FormControl>
        </Container>
       
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Roll_No</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell></TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TRow key={user.id}>
                        <TableCell>{user._id}</TableCell> {/* change it to user.id to use JSON Server */}
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.Roll_No}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                    </TRow>
                ))}
            </TableBody>
        </StyledTable>
        </>
  )
}

export default Student
