// プレビューのみカメラを重ねる
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { Image } from 'react-konva';
import useImage from 'use-image';
import styles from "../styles/app_original.module.css"

// import MyLargeComponent from './thingToRenderOnStage';

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


function App_image_edit({save}:{save:boolean}) {
    const [image] = useImage("/iPhone/iPhone7/(PRODUCT)RED.png")
    const [design] = useImage("/design/avocado.svg") 
    const [camera] = useImage("/iPhone/iPhone7/(PRODUCT)RED_camera.png")
    
    // header,footer文
    const image_height = window.innerHeight-200
    const image_width = image_height * 269/540
    const stageRef = useRef<any>(null)
    const imageRef = useRef(null);
    const [item,setItem] = useState(1)
    const [cameraflg,setCameraFlg] =useState(false)
    let lastCenter: { x: number; y: number; } | null = null;
    let lastDist = 0;
  

  function handleTouch(e:any) {
    e.evt.preventDefault();
    setItem(e.target.index);
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
    setCameraFlg(true)
    lastCenter = null;
    lastDist = 0;
  }
    useEffect(()=>{
        console.log(stageRef.current.getStage().toJSON());    
    },[save])

  return (
    <Stage
        height={image_height}
        width={image_width}
        ref={stageRef}
    >
        
    <Layer id='stuffToShow'>
    {/* 土台の画像 */}
    <Image image={image} width={image_width} height={image_height}/>
    <Image image={design} width={300} height={300} 
        onTouchMove={handleTouch}
        onTouchEnd={handleTouchEnd}
        draggable={true}
        x={100}
        y={300}
        ref={item === 1 ? imageRef:null}
        />
        
    <Image image={design} width={300} height={300} 
            onTouchMove={handleTouch}
            onTouchEnd={handleTouchEnd}
            draggable={true}
            x={10}
            y={300}
            ref={item === 2 ? imageRef:null}
        />
    <Image image={camera} width={image_width/5.5} height={image_height/17} 
    x={image_width/10} y={image_height/22}/>

    
    </Layer>
   </Stage>
 )
}

export default App_image_edit