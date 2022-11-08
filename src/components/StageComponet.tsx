import React, { useState,TouchEvent } from "react";
import { Stage, Layer, Line } from "react-konva";
import { SketchPicker } from "react-color";

const App = () => {

  const [tool, setTool] = useState("pen");
  const [size, setSize] = useState(5);
  const [color, setColor] = useState("#000000");
  const [lines, setLines] = useState<Array<any>>([]);
  const isDrawing = React.useRef(false);
  const stageRef = React.useRef<any>();

  const handleMouseDown = (e:any) => {
    isDrawing.current = true;
    e.target.on("touchstart",()=>{
        // console.log("success");
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
    })

  };

  const handleMouseMove = (e:any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    e.target.on("touchmove",()=>{
        const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
        // console.log("x:" + point.x);
        // console.log("y:" + point.y);

        
    })
    
    
  };

  const handleMouseUp = (e:any) => {
      e.target.on("touchend",()=>{
          isDrawing.current = false;        
    })
  };

  const handleChangeComplete = (color:any) => {
    setColor(color.hex);
  };

  return (
    <>
      <div>
        <select
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
        </select>
        <button
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
      </div>
        <div style={{display:"flex"}}>
        <div style={{width:"500px"}}>
          <Stage
            width={300}
            height={300}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            style={{
              border: "solid",
              marginTop: "10px"
            }}
            ref={stageRef}
          >
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
            <SketchPicker
            color={color}
            onChangeComplete={handleChangeComplete}
            />
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

  export default App