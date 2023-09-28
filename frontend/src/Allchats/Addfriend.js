import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Search from './Search';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chat from './Chat';


export default function Addfriend({toggleDrawer, notify}) {
    const navigate = useNavigate();
    const [findFriend,setFindfriend]=useState('')
    const [cookie] = useCookies(['access_token']);
    const [info, setInfo] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredChatDetails, setFilteredChatDetails] = useState([]);


    useEffect(() => {
      if (!cookie.access_token) {
        navigate('/');
      }
    }, [cookie.access_token]);

    useEffect(() => {
      const getData = async () => {
        const id = cookie.access_token;
        try {
          const res = await axios.get('http://127.0.0.1:8000/users/all/', {
            headers: {
              Authorization: 'Bearer ' + id,
            },
          });
          const data = res.data;
          setInfo(data);
        } catch (error) {
          console.error(error);
        }
      };
      getData();
    }, []);
    console.log(info)
    
    useEffect(() => {
      const filteredDetails = info.filter((chatDetail) =>
        chatDetail.username &&
        chatDetail.username.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredChatDetails(filteredDetails);
    }, [info, searchText]);

    const handleClicked = async() => {
      
      try {
        // const res = await axios.post('')
      } catch(error) {
        console.error(error)
      }
    }
    

  return (
    <Box sx={{backgroundColor:'#fff',width:400}} role="presentation" >
        <Grid container>
            <Grid item sx={{backgroundColor:'#667781',width:'100%',height:'70px', padding:'20px',alignItems:'center',display:'flex',flexDirection:'row'}}>
              <ArrowBackIcon sx={{cursor:'pointer',color:'#fff'}} onClick={toggleDrawer(false)}/>
              <Typography sx={{color:'#fff',fontSize:'20px',fontWeight:'520 !important',marginLeft:'20px'}}>
                New Chat
              </Typography>
            </Grid>
            <Grid item sx={{width:'100%'}}>
                <Search searchText={findFriend} setSearchtext={setFindfriend}/>
            </Grid>
        </Grid> 

        <div
          style={{
            backgroundColor: '#fff',
            padding: '0 5px',
            overflowY: 'scroll',
            height: '100%',
          }}
          className="custom-scrollbar"
        >
          {filteredChatDetails.map((chatDetail, index) => (
            <div key={index}>
              <div>
                <button onClick={handleClicked} className='btn-clicked'>
                  <Chat name={chatDetail.username} />
                </button>
              </div>
            </div>
          ))}
        </div>
    </Box>
  )
}
