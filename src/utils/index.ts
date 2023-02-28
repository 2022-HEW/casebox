import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
// import { SpeechSynthesisConfig, SpeechSynthesisOutputFormat } from "microsoft-cognitiveservices-speech-sdk";
import {
  PropertyId,
  SpeechConfig,
  SpeechSynthesisOutputFormat,
  SpeechSynthesizer,
} from "microsoft-cognitiveservices-speech-sdk";

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

export const resizeImage = async (
  img: HTMLImageElement,
  size: number
): Promise<Blob> => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

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

  const resizedImageBlob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((blob) => resolve(blob!))
  );

  return resizedImageBlob;
  // 画像の取得と変換
};


export const handleSpeech=(text:string)=> {
  // const keyText = document.getElementById("keyText").value,
      // regionText = document.getElementById("regionText").value,
      // phraseText = document.getElementById("phraseText").value;
    const ssml =`<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US"><voice name="ja-JP-NanamiNeural"><mstts:express-as style="customerservice" ><prosody rate="0%" pitch="0%">${text}</prosody></mstts:express-as></voice></speak>`
      const speechConfig = SpeechConfig.fromSubscription(
        process.env.SPEECH_SERVICE_SUBSCRIPTION_KEY as string,
        process.env.SPEECH_SERVICE_ENDPOINT as string
      );
  speechConfig.speechSynthesisLanguage = "ja-JP";
  speechConfig.speechSynthesisVoiceName = "ja-JP-NanamiNeural";

  let synthesizer = new SpeechSynthesizer(speechConfig);
  synthesizer.speakSsmlAsync(
      ssml,
      function (result) {
          console.log(result);
          synthesizer.close();
      }, function (err) {
          console.log(err);
          synthesizer.close();
      }
  )
}
export const downloadImage = async (name: string, file: Blob, path: string) => {
  const formData = new FormData();
  if (file) {
    const blob = file.slice(0, file.size, file.type);
    // ファイル名称変更後のファイルオブジェクト
    const renamedFile = new File([blob], name, { type: file.type });
    formData.append("files", renamedFile);

    const post = await fetch(`/api/downloadImage?path=${path}`, {
      method: "POST",
      body: formData,
    });

    console.log(await post.json());
  }
};