import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Search from './Search';
export default function Addfriend({toggleDrawer}) {
    const [findFriend,setFindfriend]=useState('')
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
    </Box>
  )
}
