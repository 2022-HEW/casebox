import styles from "../styles/product_check.module.css";
import Image from "next/image";
import { Button } from "./common/Button";
import { useRouter } from'next/router'
import { useRecoilState} from "recoil";

type Props = {
    // product:[],
    product:{
        product_place:string,
        product_name:string,
        m_product_category:string,
        m_product_price:string,
    },    
}

const Product_check = (props:Props) => {
    const router = useRouter();
    // console.log(props.product);
    // 画面遷移
        const go_type_select=()=>{
            router.push({
                pathname:"/device_select",
                query:{product_info:`${props}`}
            })
        }
    return(
        <>
            <Image src={props.product.product_place} width={100} height={100}/>
            <p >{props.product.product_name}</p>
            <p>{props.product.m_product_category}</p>
            <p>{props.product.m_product_price}</p>
            <Button situ_name="screen" label="機種選択へ" onClick={go_type_select}/>

        </>
    )
}


export default Product_check