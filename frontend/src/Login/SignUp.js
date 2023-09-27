import { Box, Button, Divider, Grid, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import GoogleLoginOption from './GoogleLoginOption';
import { gapi } from 'gapi-script';
import {BsEye, BsEyeSlash} from 'react-icons/bs';
import Toast from '../global/Toast';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

const Client_id = "290081485876-km2aepfp9ajsmskkhettq5tlhubn6vk2.apps.googleusercontent.com";

function SignUp() {
    const navigate = useNavigate();
    const [click, setClick] = useState(false);
    const [logindata, setLogindata] = useState({
        email: '',
        password: '',
        cpassword: '',
        username: '',
        image: '',
    })

    const handlePassword = (e) => {
        setClick(!click);
    }

    useEffect(() => {
        function start() {
            gapi.client.init ({
                client: Client_id,
                scope: 'https://www.googleapis.com/auth/userinfo.profile'
            })
        };
        gapi.load('client:auth2', start)
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLogindata({...logindata, [name]: value })
    }

    const handleImage = (e) => {
        const selectedphoto = e.target.files[0]
        setLogindata({...logindata, image: selectedphoto})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(logindata);
        if(logindata.password === logindata.cpassword) {
            try {
                const res = await axios.post('http://127.0.0.1:8000/users/create/', {'username': logindata['username'], 'email': logindata['email'] ,'password': logindata['password'], 'profile_photo': logindata['image']}, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                const data = res.data;
        
                console.log(data);
                navigate('/')
                toast.success('Successfully created!')
            }catch(error) {
                console.error(error)
            }
        } else {
            toast.error("Password != Confirm password")
        }
    }

  return (
    <Box sx={{width:'100vw', height: '100vh' , display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3}>
            <Grid component='form' autoComplete="off" container sx={{display: 'flex', flexDirection: 'column', padding: '30px 30px'}}>
                <Typography sx={{margin: '5px 10px', fontFamily: 'Roboto Slab, serif',fontSize: '30px', width: '300px'}}>Sign Up</Typography>
                <TextField required name='email'  value={logindata.email} onChange={handleChange} sx={{margin: '10px',}} label='Email' type='email' />
                <TextField required name='username'  value={logindata.username} onChange={handleChange} sx={{margin: '10px',}} label='Username' type='text' />
                <TextField required name='password' value={logindata.password} onChange={handleChange} sx={{margin: '10px'}} label='Password' type={click ? 'text' : 'password'} InputProps={{endAdornment: (<InputAdornment sx={{cursor: 'pointer', fontSize: '22px'}} position='end' onClick={handlePassword}>{click ? <BsEyeSlash/>: <BsEye/>} </InputAdornment>)}} />
                <Typography sx={{margin: '0 10px',fontFamily: 'Roboto Slab, serif', fontSize: '12px', }}>minimun 8 letters</Typography>
                <TextField required name='cpassword' value={logindata.cpassword} onChange={handleChange} sx={{margin: '10px'}} label='Confirm Password' type='password'/>
                <Typography required sx={{margin: '0 10px', color: 'gray'}}>Upload your profile picture</Typography>
                <input required name='photo' onChange={handleImage} type='file' accept='image/*' className='input-photo' />

                <Button variant='contained' onClick={handleSubmit} sx={{margin: '0 10px 10px 10px'}} >Create an account</Button>

                <Link to='/' style={{textDecoration: 'none'}}>
                    <Typography sx={{margin: '5px 10px',fontSize: '14px', color: '#000000' }}>Already had an account? <span style={{color: 'blue'}}>Login</span></Typography>
                </Link> 
                <Toast />
            </Grid>
        </Paper>
    </Box>
  )
}

export default SignUp;