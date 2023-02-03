import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";

type Body = {
  [key: string]: string | number;
};

export const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const res = await fetch(resource, init);

  if (!res.ok) {
    const errorRes = await res.json();
    const error = new Error(
      errorRes.message ?? "APIリクエスト中にエラーが発生しました"
    );

    throw error;
  }

  return res.json();
};

export const InsertDB = async (url: string, body?: Body) => {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // body:JSON.stringify(body)
    body: JSON.stringify(body),
  });
};

export const InsertAzure = async (body: Body) => {
  await fetch("/api/blob_strage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const getThumbnailAzure = async(product_place:string | string[] | undefined,setDesignImage:Dispatch<SetStateAction<string>>) => {
  try {
    await fetch(`/api/blob_strage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //  アップロード
        situ: "thumbnail",
        place: product_place,
        // QRcode
        // user_id: user_id,
        // "situ":"create",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //         // Azureからbase64を取ってくる
        //         setImagePath(data[0]);
        setDesignImage(data[0]);
      });
  } catch (e) {
    console.error(e);
  }
};

export const getCategory = ()=>{
  const {data,error} = useSWR("/api/admin_sql?situ=getCategory",fetcher)
  return({
    categories:data,
    CatchError:error
  })
}

export const getProducts=()=>{
  const {data,error} = useSWR("/api/admin_sql?situ=getProducts",fetcher)
  return({
    products:data,
    CatchError:error
  })
}

export const getStocks=()=>{
  const {data,error} = useSWR("/api/admin_sql?situ=getStocks",fetcher)
  return({
    stocks:data,
    CatchError:error
  })
}
