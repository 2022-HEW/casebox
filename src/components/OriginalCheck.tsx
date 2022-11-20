import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Stage, Layer, Line } from "react-konva";
import useImage from 'use-image'
import { Image } from 'react-konva';

const OriginalCheck = () => {
  // console.log(qrCodeData);
  
  const router = useRouter();
  const query = router.query;
  const [designPath,setDesignPath] = useState<any>([])
  const [designImage,setDesignImage] = useState("")
  const [phone] = useImage("./iPhone/iPhone7/(PRODUCT)RED.png")
  const [camera] = useImage("./iPhone/iPhone7/(PRODUCT)RED_camera.png")
  const [design] = useImage(designImage)


  // 読み取れたら
  useEffect(() => {
      if(router.isReady) {
          console.log(query.productID);
          // console.log(query.json);
          getDesign(query.productID)
      };
  },[query, router]);

  const getDesign= async(userID:string|string[]|undefined)=>{
    try {
      await fetch(`/api/blob_strage`,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          //  アップロード
        //   "image":reader.result,
        //   "situ":"add",
        //   "place":stageRef.current.getStage().toJSON()
  
          // QRcode
            "situ":"create",
            "userID":userID
        })
      }).then((res)=>{
        return res.json();            
      }).then(data=>{
        // Azureからbase64を取ってくる
        setDesignImage(data[0])
        setDesignPath(JSON.parse(data[1]))
        // console.log(typeof data);
        // console.log(JSON.parse(data[1]));
        console.log(designPath);
      }
        )
    } catch (e) {
      console.error(e);
    }  
  
  }

  const ProductView = ()=>{
    return(
      <Stage width={268}height={539}>
        <Layer>
          {designImage &&
          <>
          <Image image={phone}  width={269} height={540} />
          <Image image={design}  
                  width={designPath.attrs.width} 
                  height={designPath.attrs.height}
                  scaleX={designPath.attrs.scaleX}
                  scaleY={designPath.attrs.scaleY}
                  x={designPath.attrs.x}
                  y={designPath.attrs.y}
          />
          <Image image={camera} width={50} height={35} x={27} y={23}/>
          </>
          }
        </Layer>
      </Stage>
    )
  }
  
  return (
    <>
      <ProductView/>
    </>
  )
}

export default OriginalCheck
