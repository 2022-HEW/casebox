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
import useSWR from 'swr';





const DeviceSelect = () => {
    interface Color{
        [props:string]:any
    }
    
    async function fetcher(url: string): Promise<boolean | null > {
        const response = await fetch(url);
        return response.json();
    }

    /**
     * DBから取得
     * @returns model_names,model_colors
     */
    const getProduct =()=>{
        const { data } = useSWR<any>(`/api/Sql?sql=color`,fetcher) 
        const model_names:Array<string> = []
        const model_colors:Color = new Object 
        let i:number = 2 

        if(data){
            for(let value of data){
                // 機種が重複しているとき
                if(!model_names.includes(value.model_name)){
                    model_names.push(value.model_name)
                    model_colors[value.model_name] = value.color_name
                }else{
                    model_colors[value.model_name + `.${i}`] = value.color_name
                    i++;
                }
            }
        }
        
        return{
            model_names:model_names,
            model_colors:model_colors
        }
        
    }

    const {model_names,model_colors}= getProduct()   
    console.log(model_names);
    console.log(model_colors);
      
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
    
    return(
        <Box>
            <Nav>
                <div id={styles.wrap}>
                    <Case_view select_device={select_device} model_names={model_names} model_colors={model_colors} />

                    <Case_edit select_device={select_device} setDevice={setDevice} 
                                iPhones={iPhones} Androids={Androids} setType={setType}
                                 iPhone_colors={iPhone_colors} Android_colors={Android_colors}
                                 setiPhoneColors={setiPhoneColors}setAndroidColors={setAndroidColors}
                    />
                </div>
            </Nav>
        </Box>
    )
}

// export const getStaticProps: GetStaticProps = async() => {
//     let device = await getDB()    

//     return{
//         props:{
//             device,
//         }
//     }
// }


// const getDB = ()=>{
//     // DB接続
//     const db = mysql({
//         config: {
//           host: process.env.MYSQL_HOST,
//           database: process.env.MYSQL_DATABASE,
//           user: process.env.MYSQL_USER,
//           password: process.env.MYSQL_PASSWORD,
      
//         }
//       })
      
//       exports.query = async (query: any) => {
//         try {
//           const results = await db.query(query)
//           await db.end()
//           return results
//         } catch (error) {
//           return error
//         }
      
//       }
      
       
      
//         // const router = useRouter()
//         // let sql = router.query   
//         // //   console.log(sql);
//         //   const a = context.query.sql
//         //   console.log(a);
//         let sql = "";
//           sql = `SELECT model_name from t_stocks`     
//           const result = db.query(sql);
//           console.log(typeof result);
//           if(result){
//               return JSON.stringify(result)
//           }
//       }
    

export default DeviceSelect;