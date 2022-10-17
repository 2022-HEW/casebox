import styles from "../styles/nav.module.css"

const Nav =()=>{
    
    return(
        <div id={styles.container}>
        <div id={styles.wrapper}>
        <div id={styles.back}>
            <p>戻る</p>
        </div>
        <div id={styles.display_box}>
            <div id={styles.disp}></div>
            <div id={styles.service_select}>
                <div id={styles.select}><a href="./service_select.html">トップ</a></div>
                <div id={styles.btn1}><a href="./template_select.php">テンプレ</a></div>
                <div id={styles.btn2}><a href="./product_edit.html">オリジナル</a></div>
                <div id={styles.btn3}><a href="./draw_edit.html">手書き</a></div>
                <div id={styles.btn4}><a href="./rank.php">ランキング</a></div>
                <div id={styles.btn5}><a href="./site_qr.html">サイト</a></div>
                <div id={styles.btn6}><a href="./help.html">ヘルプ</a></div>
            </div>
        </div>
    </div>
    </div>
    )
} 
export default Nav;