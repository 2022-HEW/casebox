import styles from "../styles/template_select.module.css"
import Nav from "../components/Nav";
import Box from "../components/Box";
import Image from "next/image";
import React, { useEffect,useState,useRef } from "react";
import { useRouter } from "next/router";
import Modal from "../components/Modal";
// import { forwardRef } from "react";
import Product_check from "../components/Product_check";

const Template = () => {
  type Product ={
    product_ID:number,
    product_name:string,
    product_liked:number,
    product_place:string,
    m_product_category:string,
    m_product_price:number
  }
      
    const router = useRouter();    
    const [product, setProduct] = useState([])
    const [sql_flg, setSql]= useState("template");
    const [modal_flg,setModal] = useState(false)
    // const modalEl = useRef<HTMLDivElement>(null);
    
    // DOM取得
    // useEffect(()=>{
    //   let modal_dom = modalEl.current      
    // },[product])


    // DBから取得
    useEffect(() => {
      const fetchProduct = async () => {
        const response = await fetch(`/api/Sql?sql=${sql_flg}`)
        const data = await response.json()
        setProduct(data)
          console.log(product);
        //   console.log(data[0].product_ID);
      }
      fetchProduct()
    },[])

    return(
        <>
        <Box index={false}>
            <Nav>
              <Modal modal_flg={modal_flg} setModal={setModal}>
                {/* <Product_check/> */}
              </Modal>
              {product.map((product:Product) => (
              // <li key={product.product_ID}>{product.product_name}</li>
              <Product_box image_path={product.product_place}
                          case_name={product.product_name}
                          case_category={product.m_product_category}
                          case_price={product.m_product_price}
                          key={product.product_ID}
                          modal_flg={modal_flg} 
                          setModal={setModal}
                          // ref={modalEl}
              />
              ))}
                
            </Nav>
        </Box>
        
        </>
    )
}

/**
 * 商品情報を表示する
 * @returns 
 */
type Product = {
    image_path:string,
    case_name:string,
    case_category:string,
    case_price:number,
    modal_flg:boolean,
    setModal:React.Dispatch<React.SetStateAction<boolean>>
}

// const Product_box = forwardRef<HTMLDivElement, Product>(
//   (props,ref)=> {    
const Product_box =(props:Product)=> {
  
function Modal_toggle(e:React.MouseEvent<HTMLDivElement>){
  props.setModal(!props.modal_flg)
};
  return(
        // <div className={styles.product_box} ref={ref} >
        <div className={styles.product_box} onClick={Modal_toggle}>
        {/* <div className={styles.product_box} onClick={()=>props.setModal(!props.modal_flg)}> */}
            <Image src={props.image_path} alt="商品の画像" width={100} height={100}/>
            <p className="case_name">{props.case_name}</p>
            <p className="case_category">{props.case_category}</p>
            <p className="case_price">{props.case_price}</p>
        </div>
    )
}
// });


export default Template;