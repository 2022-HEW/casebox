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

export const InsertDB = async (body: Body) => {
  await fetch(`/api/admin_sql`, {
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

export const getThumbnailAzure = async (
  product_place: string | string[] | undefined,
  setDesignImage: Dispatch<SetStateAction<string>>
) => {
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

export const getDB = (option: string) => {
  const { data, error } = useSWR(`/api/admin_sql?situ=get${option}`, fetcher);
  return {
    result: data,
    CatchError: error,
  };
};

export const resizeImage = async(img:HTMLImageElement,size:number):Promise<Blob> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

    // console.log(img);
    let width = img.width;
    let height = img.height;
    if (width > height) {
      if (width > size) {
        height *= size / width;
        width = size;
      }
    } else {
      if (height > size) {
        width *= size / height;
        height = size;
      }
    }
    canvas.width = width;
    canvas.height = height;
    ctx?.drawImage(img, 0, 0, width, height);

    const resizedImageBlob = await new Promise<Blob>(resolve => canvas.toBlob(blob => resolve(blob!)));
  
  return  resizedImageBlob;
  // 画像の取得と変換
};
