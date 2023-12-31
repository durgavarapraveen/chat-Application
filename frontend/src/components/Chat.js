import { Box, Button, Grid, Paper, TextField, TextareaAutosize, Typography } from '@mui/material'
import React, {Component, useState} from 'react';
import {w3cwebsocket as W3Cwebsocket} from 'websocket';
import { makeStyles } from '@mui/styles';
import {AiOutlineSend} from 'react-icons/ai';
import './Chat.css'

const FormStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginTop: '20px',
      marginRight: theme.spacing(1),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    textarea: {
      width: '100%',
    },
}));


function Chat() {
    const classes = FormStyles;

    const [message, setMessage] = useState({
        filledForm: true,
        message: [],
        value: '',
        name: '',
        person: false,
        // false = we sent message
    })

  return (
    <Box>
        {
            message.filledForm ? (
                <Box sx={{position: 'relative', height: '100vh',overflow: 'hidden', width: '100%'}}>
                    <Grid className='Sender-profile'>
                        {/* To display name and photo of the person with who we are talking */}
                        <img src='photos/Praveen Profile Pic.png' className='photo-chat' />
                        <Grid sx={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>
                            <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '19px', fontWeight: 700}}>John</Typography>
                            <Typography sx={{fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0', fontSize: '12px'}}>select for more info</Typography>
                        </Grid>
                    </Grid>
                    <Grid className='backgroungImage'>
                        <Grid className='chat-scroll'>

                            <Grid sx={{display: 'flex', flexDirection: 'column', width: '100%', overflowY: 'scroll', overflowX: 'hidden', height: 'calc(100vh - 140px)'}}>
                                <Grid className={true ? 'message-recieve' : 'message-send'} >
                                    <Grid sx={{background: '#FFFFFF', width: 'auto', display: 'inline-block', padding: '5px 35px 5px 10px', borderRadius: '8px', maxWidth: '500px', }}>
                                        <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '16px', fontWeight: 700}} >Jack</Typography>
                                        <Typography sx={{maxWidth: '500px !important', fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0'}}>Hello Rosie how are you.</Typography>
                                    </Grid>
                                </Grid>                                
                                <Grid className= {message.person ? 'message-recieve' : 'message-send'} >
                                    <Grid sx={{background: '#FFFFFF', width: 'auto', display: 'inline-block', padding: '5px 35px 5px 10px', borderRadius: '8px', maxWidth: '500px' }}>
                                        <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '16px', fontWeight: 700}} >Rosie</Typography>
                                        <Typography sx={{maxWidth: '500px !important', fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0'}}>Hello Jack, I am fine.</Typography>
                                    </Grid>
                                </Grid>
                                <Grid className= {message.person ? 'message-recieve' : 'message-send'} >
                                    <Grid sx={{background: '#FFFFFF', width: 'auto', display: 'inline-block', padding: '5px 35px 5px 10px', borderRadius: '8px', maxWidth: '500px' }}>
                                        <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '16px', fontWeight: 700}} >Rosie</Typography>
                                        <Typography sx={{maxWidth: '500px !important', fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0'}}>How are you?</Typography>
                                    </Grid>
                                </Grid>
                                <Grid className= {message.person ? 'message-recieve' : 'message-send'} >
                                    <Grid sx={{background: '#FFFFFF', width: 'auto', display: 'inline-block', padding: '5px 35px 5px 10px', borderRadius: '8px', maxWidth: '500px' }}>
                                        <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '16px', fontWeight: 700}} >Rosie</Typography>
                                        <Typography sx={{maxWidth: '500px !important', fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0'}}>What are you doing?</Typography>
                                    </Grid>
                                </Grid>
                                <Grid className={true ? 'message-recieve' : 'message-send'} >
                                    <Grid sx={{background: '#FFFFFF', width: 'auto', display: 'inline-block', padding: '5px 35px 5px 10px', borderRadius: '8px', maxWidth: '500px', }}>
                                        <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '16px', fontWeight: 700}} >Jack</Typography>
                                        <Typography sx={{maxWidth: '500px !important', fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0'}}>yeah I am good.</Typography>
                                    </Grid>
                                </Grid>    
                                <Grid className={true ? 'message-recieve' : 'message-send'} >
                                    <Grid sx={{background: '#FFFFFF', width: 'auto', display: 'inline-block', padding: '5px 35px 5px 10px', borderRadius: '8px', maxWidth: '500px', }}>
                                        <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '16px', fontWeight: 700}} >Jack</Typography>
                                        <Typography sx={{maxWidth: '500px !important', fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0'}}>I am travelling to Bali for vacation.</Typography>
                                    </Grid>
                                </Grid>
                                <Grid className={true ? 'message-recieve' : 'message-send'} >
                                    <Grid sx={{background: '#FFFFFF', width: 'auto', display: 'inline-block', padding: '5px 35px 5px 10px', borderRadius: '8px', maxWidth: '500px', }}>
                                        <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '16px', fontWeight: 700}} >Jack</Typography>
                                        <Typography sx={{maxWidth: '500px !important', fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0'}}>yeah I am good.</Typography>
                                    </Grid>
                                </Grid>    
                                <Grid className={true ? 'message-recieve' : 'message-send'} >
                                    <Grid sx={{background: '#FFFFFF', width: 'auto', display: 'inline-block', padding: '5px 35px 5px 10px', borderRadius: '8px', maxWidth: '500px', }}>
                                        <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '16px', fontWeight: 700}} >Jack</Typography>
                                        <Typography sx={{maxWidth: '500px !important', fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0'}}>I am travelling to Bali for vacation.</Typography>
                                    </Grid>
                                </Grid>
                                <Grid className={true ? 'message-recieve' : 'message-send'} >
                                    <Grid sx={{background: '#FFFFFF', width: 'auto', display: 'inline-block', padding: '5px 35px 5px 10px', borderRadius: '8px', maxWidth: '500px', }}>
                                        <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '16px', fontWeight: 700}} >Jack</Typography>
                                        <Typography sx={{maxWidth: '500px !important', fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0'}}>yeah I am good.</Typography>
                                    </Grid>
                                </Grid>    
                                <Grid className={true ? 'message-recieve' : 'message-send'} >
                                    <Grid sx={{background: '#FFFFFF', width: 'auto', display: 'inline-block', padding: '5px 35px 5px 10px', borderRadius: '8px', maxWidth: '500px', }}>
                                        <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '16px', fontWeight: 700}} >Jack</Typography>
                                        <Typography sx={{maxWidth: '500px !important', fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0'}}>I am travelling to Bali for vacation.</Typography>
                                    </Grid>
                                </Grid>
                                <Grid className={true ? 'message-recieve' : 'message-send'} >
                                    <Grid sx={{background: '#FFFFFF', width: 'auto', display: 'inline-block', padding: '5px 35px 5px 10px', borderRadius: '8px', maxWidth: '500px', }}>
                                        <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '16px', fontWeight: 700}} >Jack</Typography>
                                        <Typography sx={{maxWidth: '500px !important', fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0'}}>yeah I am good.</Typography>
                                    </Grid>
                                </Grid>



                            </Grid> 
                        </Grid>
                    </Grid>
                    <Grid component='form' sx={{position: 'absolute', bottom: '0', width: '100%', backgroundColor: '#ffffff',}}>
                        <Grid sx={{position: 'relative'}}>
                            <TextareaAutosize className={classes.textarea} minRows={1} style={{width: '100%', padding: '3px 0px', border: 'none', backgroundColor: '#ffffff',outline: 'none', minHeight: '20px', maxHeight: '60px', fontSize: '16px', padding: '20px 50px', fontFamily: 'Mooli, sans-serif', marginBottom: '10px'}} placeholder='Type youe message' />
                            <button className='btn-send'><AiOutlineSend className='icon-send' /></button>
                        </Grid>
                    </Grid>

                </Box>
            ) : (
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <Typography sx={{fontFamily: 'Mooli, sans-serif', width: '400px', textAlign: 'center'}}>
                        This is a Chat Application which is used to connect with your friends
                    </Typography>
                </Box>
            )
        }
    </Box>
  )
}

export default Chat