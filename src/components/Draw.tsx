import React, { useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { SketchPicker } from "react-color";
import useImage from 'use-image'
import { Image } from 'react-konva';
import { TouchEvent } from "react";
import styles from "../styles/draw.module.css"
const Draw = () => {

  const [tool, setTool] = useState("pen");
  const [size, setSize] = useState(5);
  const [color, setColor] = useState("#000000");
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

  return (
    <>
      <div>
        {/* <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="pen">ペン</option>
          <option value="eraser">消しゴム</option>
        </select>
        <select
          value={size}
          onChange={(e) => {
            setSize(Number(e.target.value));
          }}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select> */}
        {/* <button
          id="save"
          onClick={() => {
            downloadURI(
              stageRef.current
                .getStage()
                .toDataURL({ mimeType: "image/png", quality: 1.0 }),
              "export_" + formatDate(new Date(), "yyyyMMddHHmmssSSS") + ".png"
            );
          }}
        >
          Save as PNG
        </button>
        <button
          onClick={() => {
            let lastLine = lines[lines.length - 1];
            setLines([
                {position:lastLine}
            ]);
                }}
        >
          reset
        </button> */}
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