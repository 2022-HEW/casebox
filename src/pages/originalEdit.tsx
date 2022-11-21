import dynamic from 'next/dynamic'
import React from 'react'
import Box from '../components/common/Box'
import Nav from '../components/common/Nav'
// import OriginalView from '../components/OriginalView'
const OriginalView = dynamic(() => import('../components/OriginalView'), { ssr: false })


 const originalEdit = () => {
  return (
    <Box>
        <Nav>
            <OriginalView/>
        </Nav>
    </Box>
  )
}
export default originalEdit