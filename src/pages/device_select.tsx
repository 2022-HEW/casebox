import styles from '../styles/device_select.module.css';
import Box from '../components/common/Box';
import Nav from '../components/common/Nav';
import Image from 'next/image';
import { SetStateAction, useEffect, useState } from 'react';
import { useRecoilState,useRecoilValue } from "recoil";
import { tabState } from './atoms';
import { log } from 'console';
import Case_view from '../components/Case_view';
import Case_edit from '../components/Case_edit';
import { type } from 'os';


const DeviceSelect = () => {
    
    const [select_device, setDevice] = useState("iPhone")  
    // console.log(product_types);

    const [sql_flg, setSql]= useState("device");
    const [iPhones,setiPhones] = useState([]);
    const [Androids,setAndroids] = useState([]);
    const [type_index,setType]  =useState(0)
    const iPhones_get:any=[]
    const Androids_get:any = []

     // DBから取得
     useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`/api/Sql?sql=${sql_flg}`)
            const data = await response.json()
                // setProduct(data)
                for(let value of data){
                    if(value.model_name.match("iPhone")){
                        iPhones_get.push(value.model_name)
                    }else{
                        Androids_get.push(value.model_name)
                    }
                    // console.log(value.model_name);
                }
                setiPhones(iPhones_get)
                setAndroids(Androids_get)
            // console.log(iPhones_get);
            // console.log(Androids_get);
            // console.log(product_types);
        }        
        fetchProduct()
    },[])
    return(
        <Box>
            <Nav>
                <div id={styles.wrap}>
                    <Case_view select_device={select_device} iPhones={iPhones} Androids={Androids} type_index={type_index}/>
                    <Case_edit select_device={select_device} setDevice={setDevice} 
                                iPhones={iPhones} Androids={Androids} setType={setType}/>
                </div>
            </Nav>
        </Box>
    )
}

export default DeviceSelect;