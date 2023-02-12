import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
import Box from '../components/main/common/Box'
import { Button } from '../components/main/common/Button'
import Nav from '../components/main/common/Nav'
import styles from "../styles/draw.module.css"

// import OriginalView from '../components/OriginalView'
const OriginalView = dynamic(() => import('../components/OriginalView'), { ssr: false })


const originalEdit:NextPage = () => {
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
            <div className={styles.button}>
              <Button label="次へ" onClick={goPay} situ_name="screen"/>
            </div>
        </Nav>
    </Box>
  )
}
export default originalEdit