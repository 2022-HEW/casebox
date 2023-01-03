import { useRecoilValue } from "recoil";
import { productState } from "../../atoms/app_atoms";
import Image from "next/image";
export const App_product_view = ({width=200,height=200}) => {
    const { product_place } = useRecoilValue(productState);
    return (
      <div style={{display:"flex",justifyContent:"center"}}>
        { product_place &&
          <Image
            width={width}
            height={height}
            src={product_place}
            alt="商品画像"
          />
        }
      </div>
    );
  };
