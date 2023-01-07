// プレビューのみカメラを重ねる
import { url } from "inspector";
import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Group } from "react-konva";
import { Image } from "react-konva";
import useImage from "use-image";
import styles from "../styles/app_original.module.css";
import { QRCode } from "react-qrcode";
import useSWR from "swr";
import axios from "axios";
import { ReactJSXElementAttributesProperty } from "@emotion/react/types/jsx-namespace";
import { useRecoilState } from "recoil";
import { originalState, productState } from "../atoms/app_atoms";
import { useRouter } from "next/router";
import useEffectCustom from "./common/useEffectCustom";

// import MyLargeComponent from './thingToRenderOnStage';

Konva.hitOnDragEnabled = true;

function getDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCenter(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

function App_image_edit() {
  // header,footer文
  const image_height = window.innerHeight - 200;
  const image_width = (image_height * 269) / 540;
  const stageRef = useRef<any>(null);
  const imageRef = useRef(null);
  let lastCenter: { x: number; y: number } | null = null;
  let lastDist = 0;
  const [images, setImage] = useState<Blob>();
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [product, setProduct] = useRecoilState(productState);
  const [image] = useImage(product.product_place);
  const camera_image_path = product.product_place.replace(/\.[^/.]+$/, "");
  const [camera] = useImage(camera_image_path + "_camera.png");
  const [design] = useImage(createObjectURL);
  const [cancel] = useImage("/image/delete.svg");
  const [isSave, setIsSave] = useState(false);
  const [original, setOriginal] = useRecoilState(originalState);
  const router = useRouter();

  const goCheckHandler = () => {
    setIsSave(true);
  };

  useEffectCustom(() => {
    setProduct((prevState) => ({
      ...prevState,
      product_place: stageRef.current
        .getStage()
        .toDataURL({ mimeType: "image/png", quality: 1.0 }),
    }));

    setOriginal((prevState) => ({
      ...prevState,
      imagePosition: stageRef.current.getStage().toJSON(),
      image: images ? images : null,
    }));

    router.push({ pathname: "./app_product_edit" });
  }, [isSave]);

  const uploadToClient = (event: { target: HTMLInputElement }) => {
    if (event.target.files) {
      console.log("event.target.files", event.target.files[0]);
      const file = event.target.files[0];
      // console.log(file);
      setImage(file);
      // console.log(list);
      setCreateObjectURL(URL.createObjectURL(file));
    }
  };

  function handleTouch(e: any) {
    e.evt.preventDefault();
    // console.log(e.target);

    let touch1 = e.evt.touches[0];
    let touch2 = e.evt.touches[1];
    const image: any = imageRef.current;
    if (image !== null) {
      if (touch1 && touch2) {
        if (image.isDragging()) {
          image.stopDrag();
        }

        var p1 = {
          x: touch1.clientX,
          y: touch1.clientY,
        };
        var p2 = {
          x: touch2.clientX,
          y: touch2.clientY,
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
          y: (newCenter.y - image.y()) / image.scaleX(),
        };

        var scale = image.scaleX() * (dist / lastDist);

        image.scaleX(scale);
        image.scaleY(scale);

        // calculate new position of the stage
        var dx = newCenter.x - lastCenter.x;
        var dy = newCenter.y - lastCenter.y;

        var newPos = {
          x: newCenter.x - pointTo.x * scale + dx,
          y: newCenter.y - pointTo.y * scale + dy,
        };

        image.position(newPos);
        // stage.batchDraw();

        lastDist = dist;
        lastCenter = newCenter;
      }
    }
  }

  const handleTouchEnd = () => {
    lastCenter = null;
    lastDist = 0;
  };

  const handleDelete = () => {
    setIsDelete(true);
  };

  return (
    <>
      {imagePath && <img src={imagePath} />}
      <Stage height={image_height} width={image_width} ref={stageRef}>
        <Layer id="stuffToShow">
          {/* 土台の画像 */}
          <Image image={image} width={image_width} height={image_height} />
          {isDelete || (
            <Group draggable={true} x={0} y={0} ref={imageRef}>
              <Image
                image={design}
                width={100}
                height={100}
                onTouchMove={handleTouch}
                onTouchEnd={handleTouchEnd}
                x={10}
                y={30}
                strokeEnabled={design && !isSave ? true : false}
                stroke={"#555"}
                strokeWidth={10}
                // ref={imageRef}
              />
              {isSave || (
                <Image
                  image={design && cancel}
                  x={-5}
                  y={15}
                  width={25}
                  height={25}
                  onTouchStart={handleDelete}
                />
              )}
            </Group>
          )}
          <Image
            image={camera}
            width={image_width / 5.5}
            height={image_height / 17}
            x={image_width / 10}
            y={image_height / 22}
          />
        </Layer>
      </Stage>
      <input
        id="file-input"
        className="hidden"
        type="file"
        accept="image/*"
        name="myImage"
        onChange={uploadToClient}
      />
      <button onClick={goCheckHandler} disabled={images ?false:true}>保存</button>

      {/* {save && (
        // どのユーザーの何番目？
        <QRCode value={`userID`} />
      )} */}
    </>
  );
}

export default App_image_edit;
