import styles from "../../styles/nav.module.css"
import { useRouter } from'next/router'
import Link from "next/link"
import { ReactNode } from 'react';


type Props = {
    children:ReactNode;
    tab:string;
}

type Tab_type ={
    site_link:string,
    site_name:string,
    tab:string;
}

const Nav =({children,tab}:Props)=>{

    const router = useRouter()    

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
                <Tab site_link={"./service_select"} site_name={"トップ"} tab={tab}/>
                <Tab site_link={"./template_select"} site_name={"テンプレ"} tab={tab}/>
                <Tab site_link={"./scan"} site_name={"オリジナル"} tab={tab}/>
                <Tab site_link={"./device_select"} site_name={"手書き"} tab={tab}/>
                <Tab site_link={"./site_qr"} site_name={"公式サイト"} tab={tab}/>
                <Tab site_link={"./help"} site_name={"ヘルプ"} tab={tab}/>
            </div>
            <div id={styles.back} onClick={()=>router.back()}>もどる</div>
        </div>
    </div>
    </div>
    )
} 

const Tab = ({site_link,site_name,tab}:Tab_type) =>{
    return( 
        <Link href={site_link}>
            <div id={styles.btn} className={`${tab === site_name && styles.select}`}>
                {site_name}
            </div>
        </Link>
    )
}
export default Nav;