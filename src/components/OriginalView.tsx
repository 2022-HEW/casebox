import React, { Children, Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import useImage from 'use-image'
import { Image } from 'react-konva';
import { TouchEvent } from "react";
import styles from "../styles/draw.module.css"
import { useRecoilState,useRecoilValue } from "recoil";
import { imageState,designState } from '../atoms/atoms';
import { forwardRef } from "react";

import Konva from "konva";


Konva.hitOnDragEnabled = true;

function getDistance(p1:{x:number,y:number}, p2: { x: number; y: number; }) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCenter(p1: { x: number; y: number; }, p2: { x: number; y: number; }) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

const OriginalView = ()=>{

 
  // const tool = useRecoilValue(toolState);
  // const size = useRecoilValue(sizeState);
  // const [color, setColor] = useRecoilState(colorState);
  // const [download,setDownload] = useRecoilState(downloadState)
  // const [modal,setModal] = useRecoilState(modalState)
  // const [lines, setLines] = useState<Array<any>>([]);
  // const isDrawing = React.useRef(false);
  const [designPath,setDesignPath] = useRecoilState<any>(designState)
  const [designImage,setDesignImage] = useRecoilState(imageState)
  const image_height = window.innerHeight-200
  const image_width = image_height * 269/540
  const imageRef = useRef(null);
  let lastCenter: { x: number; y: number; } | null = null;
  let lastDist = 0;
  const stageRef = React.useRef<any>();
  const reader =  new FileReader();
  let images:Array<string> = ["./iPhone/iPhone7/(PRODUCT)RED.png",`${designImage}`,"./iPhone/iPhone7/(PRODUCT)RED_camera.png"]  
  const camera_image_path = "./iPhone/iPhone7/(PRODUCT)RED_camera.png"
  const[Phone] = useImage(images[0])
  const [camera] = useImage(camera_image_path)
  const[image] =useImage( images[1])
  // console.log(camera_image_path);

  // const json = {"attrs":{"width":183.81666666666666,"height":369},"className":"Stage","children":[{"attrs":{"id":"stuffToShow"},"className":"Layer","children":[{"attrs":{"width":183.81666666666666,"height":369},"className":"Image"},{"attrs":{"width":100,"height":100,"id":"0","draggable":true,"x":-15.10809754427062,"y":180.5173154160553,"scaleX":2.051779172237358,"scaleY":2.051779172237358},"className":"Image"},{"attrs":{"width":33.42121212121212,"height":21.705882352941178,"x":18.381666666666668,"y":16.772727272727273},"className":"Image"}]}]}
  
  // console.log(json.children);
  function handleTouch(e:any) {
    e.evt.preventDefault();
    // console.log(e.target);
    
    let touch1 = e.evt.touches[0];
    let touch2 = e.evt.touches[1];
    const image:any = imageRef.current;
    if (image !== null) {
      if (touch1 && touch2) {
        if (image.isDragging()) {
          image.stopDrag();
        }
  
        var p1 = {
          x: touch1.clientX,
          y: touch1.clientY
        };
        var p2 = {
          x: touch2.clientX,
          y: touch2.clientY
        };
  
        if (!lastCenter) {
          lastCenter = getCenter(p1, p2);
          return;
        }
        var newCenter = getCenter(p1, p2);
  
        var dist = getDistance(p1, p2);
  
        if (!lastDist) {
          lastDist = dist;
        }
  
        // local coordinates of center point
        var pointTo = {
          x: (newCenter.x - image.x()) / image.scaleX(),
          y: (newCenter.y - image.y()) / image.scaleX()
        };
  
        var scale = image.scaleX() * (dist / lastDist);
  
        image.scaleX(scale);
        image.scaleY(scale);
  
        // calculate new position of the stage
        var dx = newCenter.x - lastCenter.x;
        var dy = newCenter.y - lastCenter.y;
  
        var newPos = {
          x: newCenter.x - pointTo.x * scale + dx,
          y: newCenter.y - pointTo.y * scale + dy
        };
  
        image.position(newPos);
        // stage.batchDraw();
  
        lastDist = dist;
        lastCenter = newCenter;
      }
    }
  }

  function handleTouchEnd() {
    lastCenter = null;
    lastDist = 0;
  }
  
  return (
    <>
      { designImage &&    
        <div className={styles.view_box}>
          <Stage
            width={designPath.attrs.width}
            height={designPath.attrs.height}
            ref={stageRef}
          >
            <Layer>
                <Image  image={Phone}  width={designPath.children[0].children[0].attrs.width} height={designPath.children[0].children[0].attrs.height} />
                <Image 
                  onTouchMove={handleTouch}
                  onTouchEnd={handleTouchEnd}
                  image={image} 
                  width={designPath.children[0].children[1].attrs.height} 
                  height={designPath.children[0].children[1].attrs.width}
                  scaleX={designPath.children[0].children[1].attrs.scaleX}
                  scaleY={designPath.children[0].children[1].attrs.scaleY}
                  draggable={designPath.children[0].children[1].attrs.draggable}
                  x={designPath.children[0].children[1].attrs.x}
                  y={designPath.children[0].children[1].attrs.y}
                  ref={imageRef}
                />
              <Image  image={camera}  
                width={designPath.children[0].children[designPath.children[0].children.length-1].attrs.width} 
                height={designPath.children[0].children[designPath.children[0].children.length-1].attrs.height} 
                x={designPath.children[0].children[designPath.children[0].children.length-1].attrs.x}
                y={designPath.children[0].children[designPath.children[0].children.length-1].attrs.y}
              />
            </Layer>
          </Stage>
          <div className={styles.left}/>
        </div>
      }
    </>
  );
};
  export default OriginalView