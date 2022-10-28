import { atom,selector } from "recoil";

//count
export const tabState = atom({
    key: "tab",
    default: "トップ"
});

export const historyState = atom({
    key: "history",
    default: ""
});


//user
export const userState = atom({
    key: "user",
    default: {
        name: "hoge",
        age: 11
    }
});