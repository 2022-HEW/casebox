import styles from "../../styles/box.module.css"
import { ReactNode, useEffect } from 'react';
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from '../../pages/atoms';

const Box = ({ children}:{children:ReactNode}) =>{
    // 開きっぱなしのモーダルを閉じる
    const[modal,setModal] = useRecoilState(modalState) 
    useEffect(() => {
        if(modal){
            setModal(false)
        }
    }, [])
    
    
    return (
        <>
        <div id={styles.box} >
            <div id={styles.screen_on}>
                {children}
            </div>
        </div>
        </>
    )
}

export default Box;