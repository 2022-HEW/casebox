import styles from "../styles/nav.module.css"
import { useRouter } from'next/router'
import Link from "next/link"

type Tab_type ={
    site_link:string,
    site_name:string,
}


const Nav =()=>{

    const router = useRouter()    

    // 戻るボタン
    const back =()=>{
        router.back()
    }
    
    return(
        <div id={styles.container}>
        <div id={styles.wrapper}>
        {/* <div id={styles.back}>
            <p onClick={back}>戻る</p>
        </div> */}
        <div id={styles.display_box}>
            {/* <img src="./Nav/disp.svg"/> */}
            <div id={styles.disp}></div>
            <div id={styles.service_select}>
                <Tab site_link={"./service_select"} site_name={"トップ"} />
                <Tab site_link={"./template_select"} site_name={"テンプレ"} />
                <Tab site_link={"./scan"} site_name={"オリジナル"} />
                <Tab site_link={"./type_select"} site_name={"手書き"} />
                <Tab site_link={"./site_qr"} site_name={"公式サイト"} />
                <Tab site_link={"./help"} site_name={"ヘルプ"} />
            </div>
            <div id={styles.back}>もどる</div>
        </div>
    </div>
    </div>
    )
} 

const Tab = ({site_link,site_name}:Tab_type) =>{
    return( 
        <Link href={site_link}>
            <div id={styles.btn}>
                {site_name}
            </div>
        </Link>
    )
}
export default Nav;