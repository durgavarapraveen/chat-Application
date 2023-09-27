import { Box, Grid } from '@mui/material'
import React from 'react'
import Chat from './ChatView'
import Allchats from '../Allchats/Allchats'

function Home() {
  return (
        <Grid container sx={{display: 'flex', flexDirection: 'row', overflowY: 'hidden', overflowX: 'scroll', minWidth: '700px'}}>
            <Allchats  />
            <Chat />
        </Grid>
  )
}

export default Home