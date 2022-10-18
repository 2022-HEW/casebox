import styles from "../styles/nav.module.css"
import { useRouter } from'next/router'
import Link from "next/link"

const Nav =()=>{
    const router = useRouter()    

    const back =()=>{
        router.back()
    }
    return(
        <div id={styles.container}>
        <div id={styles.wrapper}>
        <div id={styles.back}>
            <p onClick={back}>戻る</p>
        </div>
        <div id={styles.display_box}>
            <div id={styles.disp}></div>
            <div id={styles.service_select}>
                <Link href="/service_select">
                    <div id={styles.select}><a href="./service_select.html">トップ</a></div>
                </Link>
                <Link href="/template_select">
                    <div id={styles.btn1}><a >テンプレ</a></div>
                </Link>
                    <div id={styles.btn2}><a>オリジナル</a></div>
                    <div id={styles.btn3}><a>手書き</a></div>
                    <div id={styles.btn4}><a>ランキング</a></div>
                    <div id={styles.btn5}><a>サイト</a></div>
                    <div id={styles.btn6}><a>ヘルプ</a></div>
            </div>
        </div>
    </div>
    </div>
    )
} 
export default Nav;