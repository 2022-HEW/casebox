import styles from '../styles/device_select.module.css';
import Box from '../components/common/Box';
import Nav from '../components/common/Nav';
import Image from 'next/image';
import { SetStateAction, useEffect, useState } from 'react';
import { useRecoilState,useRecoilValue } from "recoil";
import { tabState } from './atoms';
import { log } from 'console';
import Case_view from '../components/Case_view';
import Case_edit from '../components/Case_edit';
import { type } from 'os';


const DeviceSelect = () => {
    
    const [select_device, setDevice] = useState("iPhone")  
    // console.log(product_types);
    return(
        <Box>
            <Nav>
                <div id={styles.wrap}>
                    <Case_view select_device={select_device} />
                    <Case_edit setDevice={setDevice}/>
                </div>
            </Nav>
        </Box>
    )
}

export default DeviceSelect;