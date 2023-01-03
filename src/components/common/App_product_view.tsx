import { useRecoilValue } from "recoil";
import { productState } from "../../atoms/app_atoms";
import Image from "next/image";
export const App_product_view = () => {
    const { product_place } = useRecoilValue(productState);
    return (
      <div>
        <Image
          width={200}
          height={200}
          src={product_place ? `/product_image/${product_place}` : ""}
          alt="商品画像"
        />
      </div>
    );
  };
