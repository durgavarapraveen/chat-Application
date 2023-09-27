import { Box, Button, Grid, Paper, TextField, TextareaAutosize, Typography } from '@mui/material'
import React, {Component, useState, useEffect} from 'react';
import {w3cwebsocket as W3Cwebsocket, client} from 'websocket';
import { makeStyles } from '@mui/styles';
import {AiOutlineSend} from 'react-icons/ai';
import './Chat.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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


function Chat({filledform}) {
    const classes = FormStyles;
    const navigate = useNavigate();
    const [cookie] = useCookies(['access_token']);
    const [info, setInfo] = useState([]);
    const [message, setMessage] = useState({
        filledForm: true,
        text: '',
        name: '',
        person: false,
        room: '1_1',
    });
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const client = new W3Cwebsocket('ws://127.0.0.1:8000/ws/chat/' + message.room + '/');
        client.onopen = () => {
            console.log("WebSocket Client Connected");
        };

        client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        if (dataFromServer) {
            setMessages((prevMessages) => [
            ...prevMessages,
            {
                msg: dataFromServer.text,
                name: dataFromServer.sender,
            },
            ]);
        }
        };

        return () => {
        client.close();
        };
    }, []);

    const handleMessageSend = (e) => {
        client.send(
            JSON.stringify({
                type: "message",
                text: messages,
            })
        );
        messages = "";
        e.preventDefault();
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMessage({...messages, [name]: value})
    }


  return (
    <Box className='viewtop'>
        {
            message.filledForm ? (
                <Box sx={{position: 'relative', height: '100vh',overflow: 'hidden', width: '100%'}}>
                    <Grid className='Sender-profile'>
                        {/* To display name and photo of the person with who we are talking */}
                        <img src='photos/Praveen Profile Pic.png' className='photo-chat' />
                        <Grid sx={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>
                            <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '19px', fontWeight: 700}}>John</Typography>
                            <Typography className='p' sx={{fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0', fontSize: '12px'}}>select for more info</Typography>
                        </Grid>
                    </Grid>


                    <Grid className='backgroungImage'>
                        <Grid className='chat-scroll'>

                            <Grid sx={{display: 'flex', flexDirection: 'column', width: '100%', overflowY: 'scroll', overflowX: 'hidden', height: 'calc(100vh - 140px)'}}>

                                {
                                    messages.map((mess) => {
                                        <>
                                            <Grid className={true ? 'message-recieve' : 'message-send'} >
                                                <Grid sx={{background: '#FFFFFF', width: 'auto', display: 'inline-block', padding: '5px 35px 5px 10px', borderRadius: '8px', maxWidth: '500px', }}>
                                                    <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '16px', fontWeight: 700}} >Jack</Typography>
                                                    <Typography className='p' sx={{maxWidth: '500px !important', fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0'}}>{mess.text}</Typography>
                                                </Grid>
                                            </Grid>
                                        </>
                                    })
                                }

                            </Grid> 
                        </Grid>
                    </Grid>


                    <Grid component='form' sx={{position: 'absolute', bottom: '0', width: '100%', backgroundColor: '#ffffff',}}>
                        <Grid sx={{position: 'relative'}}>
                            <TextareaAutosize name='text' className={classes.textarea} minRows={1} style={{width: '100%', padding: '3px 0px', border: 'none', backgroundColor: '#ffffff',outline: 'none', minHeight: '20px', maxHeight: '60px', fontSize: '16px', padding: '20px 50px', fontFamily: 'Mooli, sans-serif'}} placeholder='Type youe message' value={message.text} onChange={handleChange}/>
                            <button className='btn-send' onClick={handleMessageSend}><AiOutlineSend className='icon-send' /></button>
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