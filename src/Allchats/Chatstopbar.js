import { Box, Drawer, Grid, Typography } from '@mui/material'
import React from 'react'
import './allchats.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCommentIcon from '@mui/icons-material/AddComment';
import GroupIcon from '@mui/icons-material/Group';
import Addfriend from './Addfriend';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function Chatstopbar() {
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => () => {
    setState(open);
  };

  return (
    <Box className='header'>
        <Grid container sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Grid item>
                <Typography className='heading'>Chats</Typography>
            </Grid>
            <Grid item sx={{display:'flex',flexDirection:'row',gap:'7px'}}>
                  <Grid item className='icon'>
                    <GroupIcon />
                 </Grid>
                 <Grid item className='icon' >
                 <AddCommentIcon onClick={toggleDrawer(true)}/>
                 <React.Fragment>
                    <Drawer open={state} onClose={toggleDrawer(false)} className='toggle-bar' >
                      <Addfriend toggleDrawer={toggleDrawer}/>
                    </Drawer>
                 </React.Fragment>
                 </Grid>
                 <Grid item className='icon'>
                    <MoreVertIcon />
                 </Grid>
            </Grid>
        </Grid>
    </Box>
  )
}
