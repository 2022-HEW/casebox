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
    // default: {
        // current:[],
        // _id:
        // eventListeners:
        // attrs:
        // index:
        // _allEventListeners: 
        // parent: 
        // _cache: 
        // _attachedDepsListeners:
        // _batchingTransformChange: 
        // needClearTransformCache: 
        // _filterUpToDate: 
        // _isUnderCache: 
        // _dragEventId: 
        // _shouldFireChangeEvents: 
        // children: 
        // _pointerPositions: 
        // _changedPointerPositions: 
        // bufferCanvas: 
        // bufferHitCanvas:
        // content:
    // }
});
