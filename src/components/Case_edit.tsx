import styles from '../styles/device_select.module.css';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
    setDevice:Dispatch<SetStateAction<string>>
}

const Case_edit =({setDevice}:Props) =>{
    const[step,setStep]  = useState(1)

    return(
        //  デバイスを選択するエリア(コンポーネントに分ける) 
        <div id={styles.case_edit}>
            <h1>商品</h1>
            
            <p>デバイスをお選びください</p>
            
            <div>
                <label htmlFor="iPhone">iPhone</label>
                <input type="radio" value="iPhone" name='device' id='iPhone' onChange={(e)=>setDevice(e.target.value)}/>
                <label htmlFor="Android">Android</label>
                <input type="radio" value="Android" name='device' id='Android' onChange={(e)=>setDevice(e.target.value)}/>
            </div>

            <p>次へ</p>
        </div>
    )
}

export default Case_edit