import styles from "../styles/nav.module.css"
import { useRouter } from'next/router'
import Link from "next/link"

type Tab_type ={
    site_link:string,
    site_name:string,
}


const Nav =()=>{
    const router = useRouter()    

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
            <div id={styles.disp}></div>
            <div id={styles.service_select}>
                <Tab site_link={"./service_select"} site_name={"トップ"} />
                <Tab site_link={"./service_select"} site_name={"トップ"} />
                <Tab site_link={"./service_select"} site_name={"トップ"} />
                <Tab site_link={"./service_select"} site_name={"トップ"} />
                <Tab site_link={"./service_select"} site_name={"トップ"} />
                <Tab site_link={"./service_select"} site_name={"トップ"} />
            </div>
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