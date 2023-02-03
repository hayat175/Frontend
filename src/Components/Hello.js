import { Paper, TextField, Typography,Button } from '@mui/material'
import React, { useRef } from 'react'
import {Stack} from '@mui/system'

//useRef hook
function Hello() {
  const hello =useRef(null);
  const onSubmit=(e)=>{
    e.preventDefault();
    console.log(hello.current.value);
    hello.current.focus(); //you cursor will go on focus and make it mutale
    hello.current.style.color="green";  //change color of text hence make it more mutable
    // hello.current.value="My name is hayat"
    const name = hello.current.value;
    name==="" ? alert("enter your name") : alert(`your name is ${name}`) };

  const paperStyle= {
    width : 480,
    height : "45vh",

  }
  return (
    <>
      <Stack 
      justifyContent="center"
       alignItems="center"
        spacing = {0}
         direction="column"
          backgroundColor="#A4DBE8"
          style={{height : "100vh"}}>
          
        <Paper elavation={19} style = {paperStyle}>

          <Stack 
          justifyContent ="center"
          backgroundColor="pink"
          alignItems="center"
          style={{height : "100%"}} 
          >
          <Typography variant="h4" my={4}>Enter your name</Typography>
          <form onSubmit={onSubmit}>
              <Stack spacing={2}>
              <TextField label="enter name" variant ="outlined" inputRef={hello}></TextField>
              <Button variant="contained" type ="submit">submit</Button>
              </Stack>
          </form>
          </Stack>
        </Paper>
      </Stack>
    </>
  )
}
export default Hello
