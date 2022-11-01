import React from 'react'
import Box from '../components/common/Box'
import Nav from '../components/common/Nav'
import Camera from '../components/Camera'
import Movie from '../components/common/Movie' 
const Scan = () => {
  return (
    <Box>
        <Nav>
            <Movie movieUrl={""}/>
            <Camera/>
            <div>scan</div>
        </Nav>
    </Box>
  )
}
export default Scan
