import { Box } from '@material-ui/core'
import React from 'react'

const StripAdView = ({image,background}) => {
    return (
       <Box >
           <img src={image}
            style={{
               height:"100px", 
               width:"100%", 
               background:background,
               objectFit:"scale-down"
               }}  
     
               />
       </Box>
    )
}

export default StripAdView;
  