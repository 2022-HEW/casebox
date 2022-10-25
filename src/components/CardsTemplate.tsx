import styles from '../styles/service_select.module.css'
import Link from 'next/link'

const CardsTemplate = () => {
    return(
        <>
            <Link href="./template_select.php">
                <div>
                    <div className={styles.images}></div>
                    <div className={styles.content}>
                        <h3>テンプレートケース</h3>
                        <p>もう既にデザインが仕上がっているケース</p>
                    </div>
                </div>
            </Link>

            {/* <a href="./template_select.php" >
                <div className={styles.images}></div>
                <div className={styles.content}>
                    <h3>テンプレートケース</h3>
                    <p>もう既にデザインが仕上がっているケース</p>
                </div>
                </a> */}
        </>
    )
}

export default CardsTemplate;