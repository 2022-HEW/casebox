import { atom,selector } from "recoil";

//count
export const tabState = atom({
    key: "tab",
    default: "トップ"
});

//user
export const userState = atom({
    key: "user",
    default: {
        name: "hoge",
        age: 11
    }
});