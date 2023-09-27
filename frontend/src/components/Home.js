import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import Chat from './ChatView'
import Allchats from '../Allchats/Allchats'

function Home() {

  const [data, setData] = useState([]);
  console.log('data', data);

  const handleClick = () => {
    console.log('alert')
  }

  return (
        <Grid container sx={{display: 'flex', flexDirection: 'row', overflowY: 'hidden', overflowX: 'scroll', minWidth: '700px'}}>
            <Allchats setData={setData} />
            <Chat data={data} />
        </Grid>
  )
}

export default Home