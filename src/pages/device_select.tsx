import styles from '../styles/device_select.module.css';
import SetTab from './common/context';
import Box from '../components/common/Box';
import Nav from '../components/common/Nav';

const DeviceSelect = () => {
    
    return(
        <Box>
            <Nav tab={"テンプレ"}>

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
            </Nav>
        </Box>
    )
}

export default DeviceSelect;