import { Grid } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";

export const UploadPicture = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imagePath,setImagePath] = useState<any>()

  const handleClickImage = () => {
    inputFileRef.current?.click();    
  };

  const handleChangeImage = (e:ChangeEvent<HTMLInputElement>)=>{
    setImagePath(undefined)

    // 何も選択されなかったら処理中断
  if (e.target.files?.length === 0) {
    return
  }
    if (!e.target.files?.[0].type.match("image.*")) {
        return
      }
    
      // FileReaderクラスのインスタンスを取得
      const reader = new FileReader()
    
      // ファイルを読み込み終わったタイミングで実行するイベントハンドラー
      reader.onload = (e) => {
        if(e.target?.result){

            setImagePath(e.target?.result)
        }
      }
       // ファイルを読み込む
  // 読み込まれたファイルはデータURL形式で受け取れる（上記onload参照）
  reader.readAsDataURL(e.target?.files[0])
  }

  return (
    <Grid container direction="column" gap={3}>
      <Grid item>商品画像</Grid>
      <Grid item >
        <Image
          width={225}
          height={225}
          alt="写真追加"
          src={imagePath ? imagePath:"/image/imageEdit.svg"}
          onClick={handleClickImage}
        />
      </Grid>
      <Grid>
        <input style={{ display: "none" }} ref={inputFileRef} type="file" accept="image/*" onChange={handleChangeImage}/>
      </Grid>
    </Grid>
  );
};
