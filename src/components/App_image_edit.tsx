import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";
import { Stage, Layer, Line,Text  } from "react-konva";
import useImage from 'use-image'
import { Image } from 'react-konva';
import { TouchEvent } from "react";
import styles from "../styles/draw.module.css"
import { useRecoilState,useRecoilValue } from "recoil";
import { toolState,sizeState,colorState,downloadState,modalState } from '../atoms/atoms';
import { forwardRef } from "react";

const App_image_edit = () => {

    const image_path="./iPhone/iPhone7/(PRODUCT)RED.png"
    const [drag,setDrag] = useState(false)
    const [x,setX] = useState(0)
    const [y,setY] = useState(0)

    const tool = useRecoilValue(toolState);
    const size = useRecoilValue(sizeState);
    const [color, setColor] = useRecoilState(colorState);
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
          >
            <Layer>
                <Image
                text="Draggable Text"
                image={image}  
                width={269} height={540} 
                x={x}
                y={y}
                draggable
                // fill={drag ? 'green' : 'black'}
                onDragStart={()=>setDrag(true)}
                onDragend={(e:any)=>{
                    setX(e.target.x());
                    setY(e.target.y());
                }}
                />
              {/* <Image image={camera} width={269} height={540}/> */}
            </Layer>
            

          </Stage>
        </div>
      </div>
    </>
  );
};
  export default App_image_edit