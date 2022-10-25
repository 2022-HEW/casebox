import styles from '../styles/service_select.module.css'
import Link from 'next/link'

const CardsCreated = ()=> {
    return(
        <>
            <Link href="./draw_edit.html">
                <div>
                    <div className={styles.images}></div>
                    <div className={styles.content}>
                        <h3>手書きケース</h3>
                        <p>自販機で自分で書いたイラストをケースできる</p>
                    </div>
                </div>
            </Link>

            {/* <a href="./draw_edit.html">
            <div className={styles.images}></div>
            <div className={styles.content}>
                <h3>手書きケース</h3>
                <p>自販機で自分で書いたイラストをケースできる</p>
            </div>
            </a> */}
        </>
    )
}

export default CardsCreated;