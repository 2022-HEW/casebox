import { atom,selector } from "recoil";
import { recoilPersist } from "recoil-persist"; 


type Product=  {
    product_name:string,
    m_product_category:string,
    m_product_price:number,
    product_ID:number | null,
    product_place:string,
    model_id:number
    quant:number
    product_user_id?:string
    user_id?:string
    product_situation?:0|1
    model_color?:string
    azure_path?:string
    model_name?:string
    product_liked:number
}
type Profile = {
    [key:string]:string
}
type Original ={
    designID:string
    imagePosition:{},
    image:Blob|null
}
const { persistAtom } = recoilPersist();

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
        m_product_price:2000,
        product_ID:null,
        product_name:"",
        product_place:"",
        m_product_category:"",
        model_id:0,
        quant:1,
        product_user_id:"",
        user_id:"",
        product_situation:1,
        model_color:"",
        azure_path:"",
        product_liked:0
    }
});

//プロフィール
export const profileState = atom<Profile>({
    key: "profile",
    default: {
        user_id:"",
        user_name:"",
        user_comment:"",
        user_email:"",
        user_image:"",
        user_password:""
    },
    effects_UNSTABLE: [persistAtom] //永続化
});

// オリジナルデザイン
export const originalState = atom<Original>({
    key: "original",
    default: {
        designID:"",
        imagePosition:{},
        image:null
    }
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