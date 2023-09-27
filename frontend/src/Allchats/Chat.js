import { Grid, Typography } from '@mui/material'
import React from 'react'
import Avatar from '@mui/material/Avatar';
export default function Chat({name,status,imagesrc}) {
  return (
      <Grid container sx={{borderBottom:'1px solid #e9edef',padding:'8px 10px',display:'flex'}} className='chatdiv'>
        <Grid item sx={{marginRight:'10px'}}>
             <Avatar alt={name} className="profile-image"  src={imagesrc} sx={{height:'45px',width:'45px'}} />
        </Grid>
        <Grid item sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Typography sx={{color:'#000',fontSize:'17px',fontWeight:'600 !important'}}>
           {name}
          </Typography>
        </Grid>
        <Grid item sx={{display:'flex',alignItems:'center',marginLeft:'auto'}}>
           <Typography sx={{color:'#000',fontSize:'15px',fontWeight:'500 !important'}}>
            {status}
          </Typography>
        </Grid>
      </Grid>
  )
}
