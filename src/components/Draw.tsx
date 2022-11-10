import React, { Dispatch, SetStateAction, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { SketchPicker } from "react-color";
import useImage from 'use-image'
import { Image } from 'react-konva';
import { TouchEvent } from "react";
import styles from "../styles/draw.module.css"
import { useRecoilState,useRecoilValue } from "recoil";
import { toolState,sizeState,colorState } from '../atoms/atoms';

const Draw = () => {

  const tool = useRecoilValue(toolState);
  const size = useRecoilValue(sizeState);
  const [color, setColor] = useRecoilState(colorState);
  const [lines, setLines] = useState<Array<any>>([]);
  const isDrawing = React.useRef(false);
  const stageRef = React.useRef<any>();
  
  const [image] = useImage("./iPhone/iPhone7/シルバー.png")

  const handleTouchStart = (e:any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    console.log(typeof pos);
    
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

  const handleChangeComplete = (color:any) => {
    setColor(color.hex);
  };

  const Download= ()=>{
    downloadURI(
                    stageRef.current
                      .getStage()
                      .toDataURL({ mimeType: "image/png", quality: 1.0 }),
                    "export_" + formatDate(new Date(), "yyyyMMddHHmmssSSS") + ".png"
                  );
  }

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

function downloadURI(uri:any, name:any) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function formatDate(date:any, format:any) {
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ("00" + date.getMilliseconds()).slice(-3));
  return format;
}

  export default Draw