import styles from "../../../styles/product_check.module.css";
import { Button } from "../../common/Button";
import { useRouter } from'next/router'
import { useRecoilState } from "recoil";
import { productState } from '../../../atoms/atoms';
import Image from "next/image"
type Props = {
    // product:[],
    product:{
        product_name:string,
        m_product_category:string,
        m_product_price:number,
        product_ID:number,
        product_liked:number,
        product_place:string,
        user_name:string,
    },    
}

const Product_check = ({product}:Props) => {
    const router = useRouter();
    const[product_info,setProduct] = useRecoilState(productState)
    // 画面遷移
        const go_type_select=()=>{
            // console.log(product);
            // objectの一部を書き換える
            setProduct((before)=>({...before,
                product_ID:product.product_ID,
                m_product_price:product.m_product_price,
                product_place:product.product_place,
                product_name:product.product_name
            }));
            router.push({
                pathname:"/main/device_select",
            })
        }
        
        
    return(
        <>
            <div className={styles.product_view}>
                <Image src={"/product_image/" + product.product_place} width={300} height={300} />
            </div>
            <div className={styles.product_info}>
                <h2>{product.product_name}</h2>
                <p className={styles.category}>{product.m_product_category}</p>
                <h2 className={styles.price}>￥{product.m_product_price.toLocaleString()}(税込)</h2>
                <Button situ_name="screen" label="機種選択へ" onClick={go_type_select}/>
            </div>
        </>
    )
}


export default Product_check