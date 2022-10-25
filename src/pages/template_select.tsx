import styles from "../styles/template_select.module.css"
import Nav from "../components/Nav";
import Box from "../components/Box";
import Image from "next/image";
const Template = () => {


    return(
        <Box index={false}>
            <Product_box/>
            <Nav/>
        </Box>

    )
}


const Product_box =()=> {
    return(
        <div className={styles.product_box}>
            <Image src="/product_image/favicon.ico" alt="商品の画像" width={100} height={100}/>
            <p className="case_name"></p>
            <p className="case_category"></p>
            <p className="case_price"></p>
        </div>
    )
}

export default Template;