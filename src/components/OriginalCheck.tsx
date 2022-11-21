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
      <>
      {designImage &&
        <Stage width={designPath.attrs.width} height={designPath.attrs.height}>
          <Layer>
            
            <Image image={phone}  
              width={designPath.children[0].children[0].attrs.width} 
              height={designPath.children[0].children[0].attrs.height} />
            <Image image={design}  
                    width={designPath.children[0].children[1].attrs.width} 
                    height={designPath.children[0].children[1].attrs.height}
                    scaleX={designPath.children[0].children[1].attrs.scaleX}
                    scaleY={designPath.children[0].children[1].attrs.scaleY}
                    x={designPath.children[0].children[1].attrs.x}
                    y={designPath.children[0].children[1].attrs.y}
            />
            <Image image={camera} 
              width={designPath.children[0].children[2].attrs.width} 
              height={designPath.children[0].children[2].attrs.height} 
              x={designPath.children[0].children[2].attrs.x} 
              y={designPath.children[0].children[2].attrs.y}/>
          </Layer>
        </Stage>
      }
      </>

    )
      }
      
  
  return (
    <>
      <ProductView/>
    </>
  )
}

export default OriginalCheck
