import { atom,selector } from "recoil";
type Product=  {
    product_name:string,
    m_product_price:number,
    product_ID:number | null,
    product_place:string,
    model_id:number
    quant:number
    m_product_category:string
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
        m_product_price:2000,
        product_ID:null,
        product_name:"",
        product_place:"",
        model_id:0,
        quant:1,
        m_product_category:""
    }
});

//機種選択のstep
export const stepState = atom({
    key: "step",
    default: 1
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