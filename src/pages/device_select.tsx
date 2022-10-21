import styles from '../styles/device_select.module.css';

import Box from '.';
import Nav from '../components/nav';

const deviceSelect = () => {
    return(
        <>
            <div id={styles.wrapper}>
                {/* ケース表示のエリア */}
                <div id={styles.case_area}>
                    <img src="" alt="" />
                </div>

                {/* デバイスを選択するエリア(コンポーネントに分ける) */}
                <div id={styles.device_area}>

                    <h1>商品</h1>
                    <p>デバイスをお選びください</p>

                    <div>
                        <div>iPhone</div>
                        <div>android</div>
                    </div>

                    <p>次へ</p>
                </div>
            </div>
            <Box/>
            <Nav/>
        </>
    )
}

export default deviceSelect;