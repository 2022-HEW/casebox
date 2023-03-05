// Linkタグのhref属性は要変更
// slick入れる
import Box from "../../components/main/common/Box";
import Nav from "../../components/main/common/Nav";
import Service_cards from "../../components/main/service_select/Service_cards";
import SlideShow from "../../components/main/service_select/SlideShow";
import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { productState } from "../../atoms/atoms";
import { useEffect } from "react";

const Service: NextPage = () => {
  const [product, setProduct] = useRecoilState(productState);
  useEffect(() => {
    setProduct({
      m_product_price: 2000,
      product_ID: null,
      product_name: "",
      product_place: "",
      model_id: 0,
      quant: 1,
      m_product_category: "",
    });
  }, []);
  return (
    <>
      <Box>
        <Nav>
          <SlideShow />
          <Service_cards />
        </Nav>
      </Box>
    </>
  );
};

export default Service;
