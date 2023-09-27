import { Box } from '@mui/material'
import React, { useState } from 'react'
import './allchats.css'
import Chatstopbar from './Chatstopbar'
import Search from './Search'
import Chats from './Chats'
export default function Allchats() {
  const [searchText,setSearchtext]=useState('');
  return (
    <Box className='chatsbox' >
      <Chatstopbar />
      <Search searchText={searchText} setSearchtext={setSearchtext} set={true}/>
      <Chats searchText={searchText} />
    </Box>
  )
}
