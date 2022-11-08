import React from 'react'
import Box from '../components/common/Box';
import Nav from '../components/common/Nav';
import Image from 'next/image';

const Site = () => {
    return (
        <Box>
            <Nav>
                <QR/>
            </Nav>
        </Box>
    )
}

const QR = ()=>{

    return(
        <Image src={"/image/frame.png"} width={300} height={300} objectFit={"contain"}/>
    )
}

export default Site;