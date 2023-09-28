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

function Login() {
    const navigate = useNavigate();
    const [click, setClick] = useState(false);
    const [cookie, setCookies] = useCookies(["access_token"]);
    const [refreshcookie, setrefreshCookies] = useCookies(["refresh_token"]);
    const [logindata, setLogindata] = useState({
        username: '',
        password: '',
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
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLogindata({...logindata, [name]: value })
    }

    const handleSubmit = async(e) => {
        
        try {
            const res = await axios.post('http://127.0.0.1:8000/users/token/', {'username': logindata['username'], 'password': logindata['password']}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = res.data.refresh;
            setCookies('access_token', res.data.access)
            setrefreshCookies('refresh_token', res.data.refresh)
    
            console.log(res.data);
            localStorage.setItem('username', logindata.username)
            navigate('/home')

            // toast.success('Login Success !')
        }catch(error) {
            console.error(error)
        }
    }

  return (
    <Box sx={{width:'100vw', height: '100vh' , display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3}>
            <Grid component='form' autoComplete="off" container sx={{display: 'flex', flexDirection: 'column', padding: '50px 50px'}}>
                <Typography sx={{margin: '5px 10px', fontFamily: 'Roboto Slab, serif',fontSize: '30px', width: '300px'}}>Login</Typography>
                <TextField name='username'  value={logindata.username} onChange={handleChange} sx={{margin: '10px'}} label='Username' type='text' />
                <TextField name='password' value={logindata.password} onChange={handleChange} sx={{margin: '10px'}} label='Password' type={click ? 'text' : 'password'} InputProps={{endAdornment: (<InputAdornment sx={{cursor: 'pointer', fontSize: '22px'}} position='end' onClick={handlePassword}>{click ? <BsEyeSlash/>: <BsEye/>} </InputAdornment>)}} />
                <Button variant='contained' onClick={handleSubmit} sx={{margin: '0 10px 10px 10px'}} >Create an account</Button>
                {/* <Grid sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '5px 10px'}}>
                    <Divider sx={{height: '0px', background: '#C5C5C5', width: '65px'}} />
                    <Typography sx={{margin: '0px 20px', fontFamily: 'Poppins sans-serif', fontSize: '16px', color:'#C5C5C5'}}>Or with google account</Typography>
                    <Divider sx={{height: '0px', background: '#C5C5C5', width: '65px'}}/>
                </Grid>
                <Grid sx={{padding: '10px'}}>
                    <GoogleLoginOption name={'Login with Google'} />
                </Grid> */}
                <Link to='/signup' style={{textDecoration: 'none'}}>
                    <Typography sx={{margin: '5px 10px',fontSize: '14px', color: '#000000' }}>Don't have an account <span style={{color: 'blue'}}>Create account</span></Typography>
                </Link> 
                <Toast />
            </Grid>
        </Paper>
    </Box>
  )
}

export default Login