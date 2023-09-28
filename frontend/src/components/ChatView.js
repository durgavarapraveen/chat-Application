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


function Chat({data, visible, roomNo}) {
    const classes = FormStyles;
    const navigate = useNavigate();
    const [cookie] = useCookies(['access_token']);
    const [info, setInfo] = useState([]);
    const [message, setMessage] = useState({
        display: visible,
        room: '1_1',
    });
    const username = localStorage.getItem('username');
    const [msg, setMsg] = useState('');
    const [room, setRoom] = useState('');

    const [chats, setChats] = useState([]);
    const [jsMsg, setJsMsg] = useState([]);
    const [roomName, setRoomname] = useState('');
      

    useEffect(() => {
        if(visible == true){
            console.log(data);
            const Getdata = async() => {
                const id = cookie.access_token;
                const res = await axios.get(`http://127.0.0.1:8000/chat/get_chats/${data[0]['room_id']}/`, {
                    headers: {
                        Authorization: 'Bearer ' + id,
                    },
                });
                const chat_data = res.data.chats;
                console.log(chat_data);
                setChats(chat_data)
                setRoomname(res.data.room_name);
            }
            Getdata();
        }
    }, [])

    console.log(visible);
    console.log(data);
    if(visible){
        const client = new W3Cwebsocket('ws://127.0.0.1:8000/ws/chat/' + data[0]['room_id'] + '/');
    }
    useEffect(() => {
        if(visible){
            client.onopen = () => {
                console.log("WebSocket Client Connected");
            };
            client.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                if (dataFromServer) {
                    setJsMsg((prevMessages) => [
                        ...prevMessages,
                        {
                            message: dataFromServer.message,
                            username: dataFromServer.username,
                        },
                    ]);
                }
                console.log("msh", jsMsg)
            };
        }
    }, []);

    const handleChange = (e) => {
        setMsg(e.target.value);
    }

    const handleMessageSend = (e) => {
        const chatMessege = JSON.stringify({
                                'message': msg,
                                'username': username,
                                'room_name': roomName,         
                            })
        if(visible){
            client.send(chatMessege)
        }
        if(msg != "") {
            const value = "";
            setMsg(value);
            console.log('msg send')
        }
        e.preventDefault();

    }

  return (
    <Box className='viewtop'>
        {
            visible ? (
                <Box sx={{position: 'relative', height: '100vh',overflow: 'hidden', width: '100%'}}>
                    <Grid className='Sender-profile'>
                        {/* To display name and photo of the person with who we are talking */}
                        {/* <i class="fa-solid fa-arrow-left back-icon" onClick={handleBack}></i> */}
                        <img src='photos/Praveen Profile Pic.png' className='photo-chat' />
                        <Grid sx={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>
                            <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '19px', fontWeight: 700}}>{data.name} </Typography>
                            <Typography className='p' sx={{fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0', fontSize: '12px'}}>select for more info</Typography>
                        </Grid>
                    </Grid>


                    <Grid className='backgroungImage'>
                        <Grid className='chat-scroll'>

                            <Grid sx={{display: 'flex', flexDirection: 'column', width: '100%', overflowY: 'scroll', overflowX: 'hidden', height: 'calc(100vh - 140px)'}}>


                                {
                                    chats.map((chat, index) => (
                                        <Grid key={index} className={username !== chat.username ? 'message-recieve' : 'message-send'}   >
                                            <Grid sx={{background: '#FFFFFF', width: 'auto', display: 'inline-block', padding: '5px 35px 5px 10px', borderRadius: '8px', maxWidth: '500px', }}>
                                                <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '16px', fontWeight: 700}} >{chat.username}</Typography>
                                                <Typography className='p' sx={{maxWidth: '500px !important', fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0'}}>{chat.message}</Typography>
                                            </Grid>
                                        </Grid>
                                    ))
                                }

                                {jsMsg.map((message, index) => (
                                    <Grid key={index} className={username !== message.username ? 'message-recieve' : 'message-send'}   >
                                        <Grid sx={{background: '#FFFFFF', width: 'auto', display: 'inline-block', padding: '5px 35px 5px 10px', borderRadius: '8px', maxWidth: '500px', }}>
                                            <Typography sx={{fontFamily: 'Mooli, sans-serif', fontSize: '16px', fontWeight: 700}} >{message.username}</Typography>
                                            <Typography className='p' sx={{maxWidth: '500px !important', fontFamily: 'Poppins, sans-serif', color: ' #4C4646', margin: '2px 0'}}>{message.message}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}



                            </Grid> 
                        </Grid>
                    </Grid>


                    <Grid component='form' sx={{position: 'absolute', bottom: '0', width: '100%', backgroundColor: '#ffffff',}}>
                        <Grid sx={{position: 'relative'}}>
                            <TextareaAutosize name='text' className={classes.textarea} minRows={1} style={{width: '100%', padding: '3px 0px', border: 'none', backgroundColor: '#ffffff',outline: 'none', minHeight: '20px', maxHeight: '60px', fontSize: '16px', padding: '20px 50px', fontFamily: 'Mooli, sans-serif'}} placeholder='Type youe message' value={msg} onChange={handleChange}/>
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