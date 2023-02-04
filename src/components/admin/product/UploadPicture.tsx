import { Grid } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { File } from "formidable";

type Props = {
  title: string;
  imagePath: string;
  setError: (text: string) => void;
  setImagePath: Dispatch<SetStateAction<any>>;
  setImageFile: Dispatch<SetStateAction<Blob | undefined>>;
};

export const UploadPicture = ({
  title,
  setError,
  imagePath,
  setImagePath,
  setImageFile,
}: Props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleClickImage = () => {
    inputFileRef.current?.click();
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // 何も選択されなかったら処理中断
    if (e.target.files?.length === 0) {
      setError("画像が選択されていません");
      return;
    }
    if (!e.target.files?.[0].type.match("image.*")) {
      setError("画像ファイルを選択してください");
      return;
    }
    if (file) {
      setImageFile(file);
    }

    // FileReaderクラスのインスタンスを取得
    const reader = new FileReader();

    // ファイルを読み込み終わったタイミングで実行するイベントハンドラー
    reader.onload = (e) => {
      if (e.target?.result) {
        setError("");
        setImagePath(e.target?.result);
      }
    };
    // ファイルを読み込む
    // 読み込まれたファイルはデータURL形式で受け取れる（上記onload参照）
    reader.readAsDataURL(e.target?.files[0]);
  };

  return (
    <Grid container direction="column" gap={2}>
      <Grid item>{title}</Grid>
      <Grid item>
        <Image
          width={225}
          height={225}
          alt="写真追加"
          src={imagePath}
          onClick={handleClickImage}
        />
      </Grid>
      <Grid>
        <input
          style={{ display: "none" }}
          ref={inputFileRef}
          type="file"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </Grid>
    </Grid>
  );
};
