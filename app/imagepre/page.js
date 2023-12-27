'use client'
import { CheckBox } from '@mui/icons-material';
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import imageMap from "../../public/upload/1703346222311p4.png"
import Image from 'next/image';

const page = () => {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState({
    title: '',
    desc: '',
    image: ''
  });
  const createHandler = async () => {
    const { title, desc, image } = todo;
    if (title && desc && image) {
      try {
        let formData = new FormData;
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('image', image);
        const res = await axios.post("/api/todo", formData);
        console.log(res.data);
        callTodos();
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    }
    else {
      alert('Fill The Form Properly!!!')
    }
  }
  const callTodos = async () => {
    try {
      const res = await axios.get('/api/todo');
      console.log(res.data.resp);
      setData(res.data.resp)
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  useEffect(() => {
    callTodos()
  }, [])

  return (
    <>
      <Container>
        <Typography variant='h2' textAlign={'center'} fontWeight={800}>To-Do App with Image</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 4 }}>
          <TextField label="To-Do Title" name='title' onChange={(e) => { setTodo({ ...todo, title: e.target.value }) }} value={todo.title} />
          <TextField label="To-Do Description" name='desc' onChange={(e) => { setTodo({ ...todo, desc: e.target.value }) }} value={todo.desc} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <input type='file' onChange={(e) => { setTodo({ ...todo, image: e.target.files[0] }) }} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button onClick={createHandler} disabled={!(todo.title && todo.desc && todo.image) ? true : false} variant='contained'>Create To-Do</Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }} component={'div'}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Is Completed?</TableCell>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data.map((item) => {
                    return (
                      <TableRow
                      key={item._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {item.title}
                        </TableCell>
                        <TableCell align="right">{item.desc}</TableCell>
                        <TableCell align="right"><input checked={item.isCompleted} type='checkbox'/></TableCell>
                        <TableCell align="right"><Image src={require(`../../public/upload/${item.image}`)} height={50} width={50} /></TableCell>
                        <TableCell align="right"><Button variant='contained' color='error'>Delete</Button></TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>


      </Container>
    </>
  )
}

export default page