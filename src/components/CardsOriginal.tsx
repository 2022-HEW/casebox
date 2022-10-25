import styles from '../styles/service_select.module.css'
import Link from 'next/link'

const CardsOriginal = () => {
    return(
        <>
            <Link href="./product_edit.html">
                <div>
                    <div className={styles.images}></div>
                    <div className={styles.content}>
                        <h3>オリジナルケース</h3>
                        <p>写真を自由に入れることができるオリジナルのケース</p>
                    </div>
                </div>
            </Link>

            {/* <a href="./product_edit.html" >
                <div className={styles.images}></div>
                <div className={styles.content}>
                    <h3>オリジナルケース</h3>
                    <p>写真を自由に入れることができるオリジナルのケース</p>
                </div>
            </a> */}
        </>
    )
}

export default CardsOriginal;