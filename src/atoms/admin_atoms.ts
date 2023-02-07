import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

type Original = {
  designID: string;
  imagePosition: {};
  image: Blob | null;
};
const { persistAtom } = recoilPersist();

// 在庫情報
export const productState = atom({
  key: "user",
  default: {
    userID:""
  },
});
