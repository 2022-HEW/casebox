import { atom,selector } from "recoil";
type Product=  {
    product_name:string,
    m_product_category:string,
    m_product_price:number,
    product_ID:number,
    product_liked:number,
    product_place:string,
    user_name:string,
}
//tab色
export const tabState = atom({
    key: "tab",
    default: ""
});
// モーダル
export const modalState = atom({
    key: "modal",
    default: false
});
// 商品情報
export const productState= atom<Product>({
    key: "product_info",
    default:{ 
        m_product_category:"",
        m_product_price:1500,
        product_ID:0,
        product_liked:0,
        product_name:"",
        product_place:"",
        user_name:"",
    }
});

//user
export const userState = atom({
    key: "user",
    default: {
        name: "hoge",
        age: 11
    }
});