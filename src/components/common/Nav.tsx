import styles from "../../styles/nav.module.css"
import { useRouter } from'next/router'
import Link from "next/link"
import { ReactNode, useState,useMemo,} from 'react';
import { useRecoilState,useRecoilValue } from "recoil";
import { tabState } from '../../atomes/atoms';
import { productState } from '../../atomes/atoms';
import { useEffect } from "react";
import { log } from "console";
import React from "react";






type Props = {
    children:ReactNode;
}

type Tab_type ={
    site_link:string;
    site_name:string;
}

const Nav =({children}:Props)=>{

    const router = useRouter()    
    const[tab,setTab] = useRecoilState(tabState);
    const [product,setProduct] = useRecoilState(productState);
    
    const back =()=>{
        router.back();
        
        console.log("error");
        setTab("テンプレ")
    }
    //     
    useEffect(() => {

      switch(router.pathname){
            case "/service_select":
                setTab("トップ")
                break;
            case "/template_select":
                setTab("テンプレ")
                break;
            case "/scan":
                    setTab("オリジナル")
                    break;
            case "/device_select":
                // designが空のとき
                if( product.product_name === ""){
                    setTab("手書き")
                }
                    break;
            case "/service_select":
                    setTab("公式サイト")
                    break;
            case "/service_select":
                setTab("ヘルプ")
                break;
            default:
                console.log("error");
        }
    
    }, [])
    
        // const back = ()=>{
        
    // }
    // const [tab,setTab] = useState("トップ");

    

    return(
        <div id={styles.container}>
        <div id={styles.wrapper}>
        {/* <div id={styles.back}>
            <p onClick={back}>戻る</p>
        </div> */}
        <div id={styles.display_box}>
            {/* <img src="./Nav/disp.svg"/> */}
            <div id={styles.disp}>{children}</div>
            <div id={styles.service_select}>
                <Tab site_link={"./service_select"} site_name={"トップ"}  />
                <Tab site_link={"./template_select"} site_name={"テンプレ"}  />
                <Tab site_link={"./scan"} site_name={"オリジナル"}  />
                <Tab site_link={"./device_select"} site_name={"手書き"} />
                <Tab site_link={"./site_qr"} site_name={"公式サイト"}  />
                <Tab site_link={"./help"} site_name={"ヘルプ"}  />
            </div>
            <div id={styles.back} onClick={back}>もどる</div>
        </div>
    </div>
    </div>
    )
} 

    const Tab = React.memo(function Memotab({site_link,site_name}:Tab_type){
    
        const[tab,setTab] = useRecoilState(tabState);
        
        return( 
            <Link href={site_link} as={site_link} passHref>
                <div id={styles.btn} className={`${tab === site_name && styles.select}`} onClick={()=>{setTab(site_name);}}>
                    {site_name}
                </div>
            </Link>
        )
    })

export default Nav;