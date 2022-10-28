import styles from "../styles/template_select.module.css"
import Nav from "../components/common/Nav";
import Box from "../components/common/Box";
import Image from "next/image";
import React, { useEffect,useState,useRef } from "react";
import { useRouter } from "next/router";
import Modal from "../components/common/Modal";
// import { forwardRef } from "react";
import Product_check from "../components/Product_check";
import { useRecoilState } from "recoil";
import { tabState } from './atoms';

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
    const [product_ID, setProduct_ID] = useState(-1)
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
        <Box>
            <Nav>
              <Modal modal_flg={modal_flg} setModal={setModal}>
                <Product_check product={product[product_ID-1]} />
              </Modal>
              {product.map((product:Product) => (
              <Product_box image_path={product.product_place}
                          case_name={product.product_name}
                          case_category={product.m_product_category}
                          case_price={product.m_product_price}
                          key={product.product_ID}
                          id={product.product_ID}
                          modal_flg={modal_flg} 
                          setModal={setModal}
                          setProduct_ID={setProduct_ID}
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
    id:number,
    image_path:string,
    case_name:string,
    case_category:string,
    case_price:number,
    modal_flg:boolean,
    setModal:React.Dispatch<React.SetStateAction<boolean>>
    setProduct_ID:React.Dispatch<React.SetStateAction<number>>
}

// const Product_box = forwardRef<HTMLDivElement, Product>(
//   (props,ref)=> {    
const Product_box =({id,image_path,case_name,case_category,case_price,modal_flg,setModal,setProduct_ID}:Product)=> {
  
  // モーダルを動かして、商品IDを送る
  function Modal_toggle(e:React.MouseEvent<HTMLDivElement>){
    setModal(!modal_flg)    
    setProduct_ID(id)
  };

  return(
        // <div className={styles.product_box} ref={ref} >
        <div className={styles.product_box} onClick={Modal_toggle} >
            <Image src={image_path} alt="商品の画像" width={100} height={100}/>
            <p className="case_name">{case_name}</p>
            <p className="case_category">{case_category}</p>
            <p className="case_price">{case_price}</p>
        </div>
    )
}
// });


export default Template;