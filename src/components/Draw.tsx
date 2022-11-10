import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { SketchPicker } from "react-color";
import useImage from 'use-image'
import { Image } from 'react-konva';
import { TouchEvent } from "react";
import styles from "../styles/draw.module.css"
import { useRecoilState,useRecoilValue } from "recoil";
import { toolState,sizeState,colorState,downloadState,modalState } from '../atoms/atoms';
import { forwardRef } from "react";

const Draw = ({setDownloadPath}:{setDownloadPath:Dispatch<SetStateAction<string>>}) => {

 
  const tool = useRecoilValue(toolState);
  const size = useRecoilValue(sizeState);
  const [color, setColor] = useRecoilState(colorState);
  const [download,setDownload] = useRecoilState(downloadState)
  const [modal,setModal] = useRecoilState(modalState)
  const [lines, setLines] = useState<Array<any>>([]);
  const isDrawing = React.useRef(false);
  const stageRef = React.useRef<any>();
  
  const [image] = useImage("./iPhone/iPhone7/シルバー.png")

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


  const handleChangeComplete = (color:any) => {
    setColor(color.hex);
  };

  

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
            </Layer>
          </Stage>
        </div>
            {/* <SketchPicker
            color={color}
            onChangeComplete={handleChangeComplete}
            /> */}
      </div>
    </>
  );
};
  export default Draw