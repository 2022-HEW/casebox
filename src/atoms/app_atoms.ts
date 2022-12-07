import { atom,selector } from "recoil";
type Product=  {
    product_name:string,
    m_product_category:string,
    m_product_price:number,
    product_ID:number | null,
    product_place:string,
    model_id:number
    quant:number
}
type Profile = {
    userID:number,
    user_name:string,
    user_comment:string,
    user_email:string,
    user_image:string,
    user_password:string
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
        m_product_price:1500,
        product_ID:null,
        product_name:"",
        product_place:"",
        m_product_category:"",
        model_id:0,
        quant:1
    }
});

//機種選択のstep
export const profileState = atom<Profile>({
    key: "profile",
    default: {
        userID:0,
        user_name:"",
        user_comment:"",
        user_email:"",
        user_image:"",
        user_password:""
    }
});

// 手書きツール
export const toolState = atom({
    key: "tool",
    default: "pen"
});

// 手書きサイズ
export const sizeState = atom({
    key: "size",
    default: 5
});

// 手書き色
export const colorState = atom({
    key: "color",
    default: "#000"
});

// 手書きデザイン保存
export const downloadState = atom({
    key: "download",
    default: false
});

// オリジナルデザイン
export const designState:any = atom({
    key: "design",
    default: []
});

// オリジナル画像
export const imageState = atom({
    key: "image",
    default: ""
});

// 在庫情報
export const stockState = atom({
    key: "stock",
    default:[{}]
});