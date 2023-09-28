import { Box } from '@mui/material'
import React, { useState } from 'react'
import './allchats.css'
import Chatstopbar from './Chatstopbar'
import Search from './Search'
import Chats from './Chats'
export default function Allchats({setData, setDisplay,setrooms}) {
  const [searchText,setSearchtext]=useState('');
  const [searchFrnd, setSearchFrnd] = useState('');

  return (
    <Box className='chatsbox' >
      <Chatstopbar searchText={searchFrnd} setSearchFrnd={setSearchFrnd} set={true} />
      <Search searchText={searchText} setSearchtext={setSearchtext} set={true}/>
      <Chats searchText={searchText} setDisplay={setDisplay} setData={setData} setrooms={setrooms}/>
    </Box>
  )
}
