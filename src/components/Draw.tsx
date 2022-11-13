import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import useImage from 'use-image'
import { Image } from 'react-konva';
import { TouchEvent } from "react";
import styles from "../styles/draw.module.css"
import { useRecoilState,useRecoilValue } from "recoil";
import { toolState,sizeState,colorState,downloadState,modalState } from '../atoms/atoms';
import { forwardRef } from "react";

type Props={
  setDownloadPath:Dispatch<SetStateAction<string>>
  image_path:string
}

const Draw = ({setDownloadPath,image_path}:Props) => {

 
  const tool = useRecoilValue(toolState);
  const size = useRecoilValue(sizeState);
  const [color, setColor] = useRecoilState(colorState);
  const [download,setDownload] = useRecoilState(downloadState)
  const [modal,setModal] = useRecoilState(modalState)
  const [lines, setLines] = useState<Array<any>>([]);
  const isDrawing = React.useRef(false);
  const stageRef = React.useRef<any>();
  const camera_image_path = image_path.replace(".png","_camera.png")

  const [image] = useImage(image_path)
  const [camera] = useImage(camera_image_path)
  


  const handleTouchStart = (e:any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    
    setLines([
      ...lines,
      {
        tool,
        points: [pos.x, pos.y],
        color,
        size
      }
    ]);
  };

  const handleTouchMove = (e:any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
  };

  // モーダルに表示する
  useEffect(()=>{
      function downloadURI(uri:string) {
        setDownloadPath(uri)
        setModal(true)
      }
    if(download){
      downloadURI(stageRef.current.getStage().toDataURL({ mimeType: "image/png", quality: 1.0 }),);
    }else{
      return;
    }
  },[download])
  
  // 次へが動かなくなるバグ解消
  useEffect(()=>{
    if(!modal){
      setDownload(false)
    }else{
      return;
    }
  },[modal])

    // console.log(stageRef.current.getStage().toJSON());
    

  return (
    <>
      <div>
        
      </div>
        <div >
        <div className={styles.view_box}>
          <Stage
            width={268}
            height={539}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={stageRef}
          >
            <Layer>
                <Image image={image}  width={269} height={540} />
            </Layer>
            <Layer>
              {lines.map((line, i) => (
                <Line
                draggable={true}

                  key={i}
                  points={line.points}
                  stroke={line.color}
                  strokeWidth={line.size}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation={
                    line.tool === "eraser" ? "destination-out" : "source-over"
                  }
                />
              ))}
              <Image image={camera} width={50} height={35} x={27} y={23}/>

            </Layer>
          </Stage>
        </div>
      </div>
    </>
  );
};
  export default Draw