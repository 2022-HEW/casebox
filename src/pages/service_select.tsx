// Linkタグのhref属性は要変更
// slick入れる

import styles from '../styles/service_select.module.css'
import Link from 'next/link'


const Service = () => {

    return(
        <div id={styles.wrap}>
            <div id={styles.cardbox}>
                <div className={styles.card}>
                    <Link href="./template_select.php">
                        <div className={styles.images}></div>
                        <div className={styles.content}>
                            <h3>テンプレートケース</h3>
                            <p>もう既にデザインが仕上がっているケース</p>
                        </div>
                    </Link>

                    {/* <a href="./template_select.php" >
                        <div className={styles.images}></div>
                        <div className={styles.content}>
                            <h3>テンプレートケース</h3>
                            <p>もう既にデザインが仕上がっているケース</p>
                        </div>
                    </a> */}
                </div>
                <div className={styles.card}>
                    <Link href="./product_edit.html">
                        <div className={styles.images}></div>
                        <div className={styles.content}>
                            <h3>オリジナルケース</h3>
                            <p>写真を自由に入れることができるオリジナルのケース</p>
                        </div>
                    </Link>

                    {/* <a href="./product_edit.html" >
                        <div className={styles.images}></div>
                        <div className={styles.content}>
                            <h3>オリジナルケース</h3>
                            <p>写真を自由に入れることができるオリジナルのケース</p>
                        </div>
                    </a> */}
                </div>

                <div className={styles.card}>
                    <Link href="./draw_edit.html">
                        <div className={styles.images}></div>
                        <div className={styles.content}>
                            <h3>手書きケース</h3>
                            <p>自販機で自分で書いたイラストをケースできる</p>
                        </div>
                    </Link>

                    {/* <a href="./draw_edit.html">
                        <div className={styles.images}></div>
                        <div className={styles.content}>
                            <h3>手書きケース</h3>
                            <p>自販機で自分で書いたイラストをケースできる</p>
                        </div>
                    </a> */}
                </div>
            </div>
        </div>
    )
}

export default Service;