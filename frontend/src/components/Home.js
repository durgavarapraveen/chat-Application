import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Chat from './ChatView'
import Allchats from '../Allchats/Allchats';

function Home() {

  const [data, setData] = useState([]);
  console.log('data', data);
  const [display, setDisplay] = useState(false);
  const [room, setrooms] = useState('1_1');

  // useEffect(() => {
  //   if (data.room_Type === 2 || data.room_Type === 1) {
  //     handleClick();
  //   }
  // }, [data]);
  // console.log(data[0]['room_No']);
  function notify() {
    console.log(data)
    handleClick();
  }

  const handleClick = () => {
    setDisplay(!display)
    console.log(data)
    setrooms(data[0]['room_No'])
  }

  console.log(room);
  return (
        <Grid container sx={{display: 'flex', flexDirection: 'row', overflowY: 'hidden', overflowX: 'scroll', minWidth: '700px'}}>
            <Allchats setData={setData} setDisplay={setDisplay} setrooms={setrooms}/>
            <Chat data={data} visible={display} roomNo={room}/>
        </Grid>
  )
}

export default Home