import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Image from "next/image";
import useSWR from "swr";
import { NextRouter, useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { productState, profileState } from "../../atoms/app_atoms";
import { NextPage } from "next";
import styles from "../../styles/app_search.module.css";
import useEffectCustom from "./useEffectCustom";
import { Product } from "../../types";
import { fetcher } from "../../utils";
import { getThumbnailAzure } from "../../utils";

// type Thumbnails = {
//   [key: string]: string;
// };
// export const App_productBox = ({product_place,product_name,m_product_category,m_product_price,product_ID,product_liked}:Product)=> {
export const App_productBox = ({
  product_place,
  product_name,
  m_product_category,
  m_product_price,
  product_ID,
  product_user_id,
  product_situation,
  user_name,
}: Product) => {
  const [product, setProduct] = useRecoilState(productState);
  const { user_id } = useRecoilValue(profileState);
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const [originalPlace, setOriginalPlace] = useState("");
  // console.log(product_user_id);
  // console.log(product_situation);

  useEffect(() => {
    if (m_product_category === "user") {
      getThumbnailAzure(product_place, setOriginalPlace);
    }
    // console.log(product_situation);
  }, []);

  const useUserLike = () => {
    const { data, error } = useSWR<any>(
      `/api/app_sql?sql=likes&&user_id=${user_id}`,
      fetcher
    );
    return {
      user_like: data,
      isLoading: !error && !data,
      isError: error,
    };
  };

  const useLikeCount = () => {
    const { data, error } = useSWR<any>(
      `/api/app_sql?sql=likecount&&productID=${product_ID}`,
      fetcher
    );
    return {
      product_count: data,
      isLoading: !error && !data,
      isError: error,
    };
  };

  const { user_like } = useUserLike();
  const { product_count } = useLikeCount();
  const [newLiked, setNewLiked] = useState(0);

  type Product = {
    product_id: number;
  };

  useEffectCustom(() => {
    if (product_count) {
      setNewLiked(product_count[0]["COUNT(product_ID)"]);
    }
    // console.log(product_count);
  }, [product_count]);

  useLayoutEffect(() => {
    if (user_like) {
      user_like.map((value: Product) => {
        if (value.product_id === product_ID) {
          setLiked(true);
          // console.log(liked);
        }
      });
    }
    // console.log(data);
  }, [user_like]);

  const goDetail = () => {
    // console.log(product_place);

    setProduct((before) => ({
      ...before,
      m_product_price: m_product_price,
      product_ID: product_ID,
      product_name: product_name,
      azure_path: product_place,
      product_place:
        m_product_category === "user"
          ? originalPlace
          : "/product_image/" + product_place,
      m_product_category: m_product_category,
      product_user_id: product_user_id,
      product_situation: product_situation,
    }));
    router.push({
      pathname: "./app_product_detail",
    });
  };

  const likehandler = () => {
    if (liked) {
      setNewLiked(newLiked - 1);
      // console.log(liked);
    } else {
      setNewLiked(newLiked + 1);
    }
    setLiked(!liked);
  };

  // いいねDBを更新
  const UpdateLikeNumber = async () => {
    await fetch(
      `/api/app_sql?sql=likechange&&like=${newLiked}&&productID=${product_ID}`
    ).then((res) => {
      return res.json();
    });
  };

  const UpdateLikeRelation = async () => {
    await fetch(
      `/api/app_sql?sql=${
        liked ? "create_relation" : "remove_relation"
      }&&user_id=${user_id}&&productID=${product_ID}`
    ).then((res) => {
      return res.json();
    });
  };

  // useEffect(()=>{
  //   UpdateLikeNumber()
  // },[])

  useEffectCustom(() => {
    UpdateLikeRelation();
    UpdateLikeNumber();
  }, [newLiked]);

  return (
    <div className={styles.thisProduct}>
      <button
        className={liked ? styles.liked : styles.like}
        onClick={() => likehandler()}
        disabled={
          (user_id === product_user_id || user_id === undefined) && true
        }
      >
        ❤{newLiked < 0 ? 0 : newLiked}
      </button>
      <div className={styles.product} onClick={goDetail}>
        {product_place && (
          <Image
            src={
              m_product_category === "user"
                ? originalPlace
                : "/product_image/" + product_place
            }
            alt="商品の画像"
            width={300}
            height={300}
            id={styles.product_image}
          />
        )}
        <p className={styles.case_name}>{product_name}</p>
        <p className={styles.case_category}>
          {m_product_category === "user" ? user_name : m_product_category}
        </p>
        <p className={styles.case_price}>
          ￥{m_product_price.toLocaleString()}(税込)
        </p>
      </div>
    </div>
  );
};
