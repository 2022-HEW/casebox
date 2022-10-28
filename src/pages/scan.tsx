import React from 'react'
import Box from '../components/common/Box'
import Nav from '../components/common/Nav'
import Tutorial_movie from '../components/Tutorial_movie'
import Camera from '../components/Camera'
 
const Scan = () => {
  return (
    <Box>
        <Nav>
            <Tutorial_movie/>
            {/* <Camera/> */}
            <div>scan</div>
        </Nav>
    </Box>
  )
}
export default Scan
