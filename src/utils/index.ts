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

export const getCategory = ()=>{
  const {data,error} = useSWR("/api/admin_sql?situ=getCategory",fetcher)
  return({
    categories:data,
    CatchError:error
  })
}