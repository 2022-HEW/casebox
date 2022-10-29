import styles from '../styles/device_select.module.css';
import Image from 'next/image';
import React from 'react';
type Props = {
    device:string
}


const iPhons ={
    iPhonX:"/iPhone/iPhoneX.svg"
}

const Android = {
    Xperia:""
}


const Case_view = ({device}:Props) =>{
    console.log("afjvfink");
    
    return(
        //  ケース表示のエリア 
        <div id={styles.case_view}>
            <Image src={device == "iPhone" ? iPhons.iPhonX : Android.Xperia} alt="スマホ" width={500} height={579}/>
        </div>        
    )
}
export default React.memo(Case_view);