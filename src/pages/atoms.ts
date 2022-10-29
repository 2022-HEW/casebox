import { atom,selector } from "recoil";

//count
export const tabState = atom({
    key: "tab",
    default: "トップ"
});

export const modalState = atom({
    key: "modal",
    default: false
});


//user
export const userState = atom({
    key: "user",
    default: {
        name: "hoge",
        age: 11
    }
});