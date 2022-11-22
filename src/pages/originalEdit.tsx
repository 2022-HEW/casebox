import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
import Box from '../components/common/Box'
import { Button } from '../components/common/Button'
import Nav from '../components/common/Nav'
// import OriginalView from '../components/OriginalView'
const OriginalView = dynamic(() => import('../components/OriginalView'), { ssr: false })


 const originalEdit = () => {
  const router = useRouter()
  const goPay = ()=>{
    router.push({
      pathname:"/pay"
    })

  }

  return (
    <Box>
        <Nav>
            <OriginalView/>
            <Button label="次へ" onClick={goPay} situ_name="screen"/>
        </Nav>
    </Box>
  )
}
export default originalEdit