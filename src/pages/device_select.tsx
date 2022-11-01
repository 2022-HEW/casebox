import styles from '../styles/device_select.module.css';
import Box from '../components/common/Box';
import Nav from '../components/common/Nav';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState,useRecoilValue } from "recoil";
import { tabState } from './atoms';
import { log } from 'console';
import Case_view from '../components/Case_view';
import Case_edit from '../components/Case_edit';


const DeviceSelect = () => {
    const [device, setDevice] = useState("iPhone")    
    return(
        <Box>
            <Nav>
                <div id={styles.wrap}>
                    <Case_view device={device}/>
                    <Case_edit setDevice={setDevice}/>
                </div>
            </Nav>
        </Box>
    )
}

export default DeviceSelect;