import styles from '../styles/device_select.module.css';
import Box from '../components/common/Box';
import Nav from '../components/common/Nav';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRecoilState,useRecoilValue } from "recoil";
import { tabState } from './atoms';
import { log } from 'console';

const iPhons ={
    iPhonX:"/iPhone/iPhoneX.svg"
}


const DeviceSelect = () => {
    
    return(
        <Box>
            <Nav>
                <div id={styles.wrap}>
                    <Case_view/>
                    <Case_edit/>
                </div>
            </Nav>
        </Box>
    )
}

const Case_view = () =>{
    return(
        //  ケース表示のエリア 
        <div id={styles.case_view}>
            <Image src={iPhons.iPhonX} alt="スマホ" width={500} height={579}/>
        </div>
    )
}

const Case_edit =() =>{
    return(
        //  デバイスを選択するエリア(コンポーネントに分ける) 
        <div id={styles.case_edit}>
            <h1>商品</h1>
            
            <p>デバイスをお選びください</p>
            
            <div>
                <div>iPhone</div>
                <div>android</div>
            </div>

            <p>次へ</p>
        </div>
    )
}

export default DeviceSelect;