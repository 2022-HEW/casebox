import styles from '../styles/device_select.module.css';
import Box from '../components/common/Box';
import Nav from '../components/common/Nav';
import { SetStateAction, useEffect, useState } from 'react';
import { useRecoilState,useRecoilValue } from "recoil";
import { tabState } from '../atomes/atoms';
import { log } from 'console';
import Case_view from '../components/Case_view';
import Case_edit from '../components/Case_edit';
import { type } from 'os';
import { GetStaticProps, NextApiRequest, NextApiResponse } from 'next';
import mysql from "serverless-mysql"




const DeviceSelect = ({device}:any) => {
    // device.map((value:any)=>{
    //     console.log(value);
    // })
    
    const [select_device, setDevice] = useState("iPhone")  
    // console.log(product_types);

    const [sql_flg, setSql]= useState("device");
    const [iPhones,setiPhones] = useState([]);
    const [Androids,setAndroids] = useState([]);
    const [types,setTypes] = useState([]) 
    const [type_index,setType]  =useState(0)
    const[iPhone_colors,setiPhoneColors] = useState([]);
    const[Android_colors,setAndroidColors] = useState([]);
    const [color_index,setColor]  =useState(0)
    const iPhones_get:any=[]
    const Androids_get:any = []
    const iPhone_colors_get:any=[]
    const Android_colors_get:any = []
    

     // DBから取得
    //  useEffect(() => {
        // const fetchProduct = async () => {
        //     const response = await fetch(`/api/Sql?sql=${sql_flg}`)
        //     const data = await response.json()
                // setProduct(data)
                // for(let value of data){
                //     if(value.model_name.match("iPhone")){
                //         iPhones_get.push(value.model_name)
                //         iPhone_colors_get.push(value.color_name)
                //     }else{
                //         Androids_get.push(value.model_name)
                //         Android_colors_get.push(value.color_name)
                //     }
                    // console.log(value.model_name);
                // }
                // setiPhones(iPhones_get)
                // setiPhoneColors(iPhone_colors_get)
                // setAndroids(Androids_get)
                // setAndroidColors(Android_colors_get)

            // console.log(iPhones_get);
            // console.log(iPhone_colors_get);
            // console.log(Android_colors_get);

            // console.log(Androids_get);
            // console.log(product_types);
    //     }        
    //     fetchProduct()
    // },[])
    return(
        <Box>
            <Nav>
                <div id={styles.wrap}>
                    {/* <Case_view select_device={select_device} iPhones={iPhones} Androids={Androids} 
                    type_index={type_index} iPhone_colors={iPhone_colors} Android_colors={Android_colors}
                    color_index={color_index} types={types}
                    />

                    <Case_edit select_device={select_device} setDevice={setDevice} 
                                iPhones={iPhones} Androids={Androids} setType={setType}
                                // iPhone_colors={iPhone_colors} Android_colors={Android_colors}
                                // setiPhoneColors={setiPhoneColors}setAndroidColors={setAndroidColors}
                                /> */}
                </div>
            </Nav>
        </Box>
    )
}

export const getStaticProps: GetStaticProps = async() => {
    let device = await getDB()    

    return{
        props:{
            device,
        }
    }
}


const getDB = ()=>{
    // DB接続
    const db = mysql({
        config: {
          host: process.env.MYSQL_HOST,
          database: process.env.MYSQL_DATABASE,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
      
        }
      })
      
      exports.query = async (query: any) => {
        try {
          const results = await db.query(query)
          await db.end()
          return results
        } catch (error) {
          return error
        }
      
      }
      
       
      
        // const router = useRouter()
        // let sql = router.query   
        // //   console.log(sql);
        //   const a = context.query.sql
        //   console.log(a);
        let sql = "";
          sql = `SELECT model_name from t_stocks`     
          const result = db.query(sql);
          console.log(typeof result);
          if(result){
              return JSON.stringify(result)
          }
      }
    

export default DeviceSelect;