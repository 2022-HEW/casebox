// プレビューのみカメラを重ねる
import { url } from "inspector";
import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Group } from "react-konva";
import { Image } from "react-konva";
import useImage from "use-image";
import styles from "../../styles/app_original.module.css";
import { QRCode } from "react-qrcode";
import useSWR from "swr";
import axios from "axios";
import { useRecoilState } from "recoil";
import { originalState, productState } from "../../atoms/app_atoms";
import { useRouter } from "next/router";
import useEffectCustom from "../../Hooks/common/useEffectCustom";
import { parse } from "path";
import { resizeImage } from "../../utils";

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
  const [imagePath, setImagePath] = useState("");
  const [product, setProduct] = useRecoilState(productState);
  const [image] = useImage(product.product_place);
  const camera_image_path = product.product_place.replace(/\.[^/.]+$/, "");
  const [camera] = useImage(camera_image_path + "_camera.png");
  const [design] = useImage(createObjectURL);
  const [cancel] = useImage("/image/delete.svg");
  const [isSave, setIsSave] = useState(false);
  const [original, setOriginal] = useRecoilState(originalState);
  const [designSize, setDesignSize] = useState({ width: 0, height: 0 });
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
      imagePosition: JSON.stringify({
        ...JSON.parse(stageRef.current.getStage().toJSON()),
        model_name: product.model_name,
      }),
      image: images ? images : null,
    }));

    router.push({ pathname: "./app_product_edit" });
  }, [isSave]);
  // console.log(product);

  const uploadToClient = (event: { target: HTMLInputElement }) => {
    if (event.target.files) {
      // console.log("event.target.files", event.target.files[0]);
      const file = event.target.files[0];
      // console.log(file);

      const reader = new FileReader();
      reader.onload = async () => {
        const image = new window.Image();
        image.onload = async () => {
          // 1MB以上のとき
          if (file.size >= 1000000) {
            const resizedImageBlob = await resizeImage(image, 100);
            setImage(resizedImageBlob);
            setCreateObjectURL(URL.createObjectURL(resizedImageBlob));
            console.log("a");
            return;
          }
          setDesignSize({
            width: 300,
            height: (300 * image.height) / image.width,
          });
          setImage(file);
          setCreateObjectURL(URL.createObjectURL(file));
        };
        image.src = reader.result as string;
      };
      reader.readAsDataURL(file);
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

        const p1 = {
          x: touch1.clientX,
          y: touch1.clientY,
        };
        const p2 = {
          x: touch2.clientX,
          y: touch2.clientY,
        };

        if (!lastCenter) {
          lastCenter = getCenter(p1, p2);
          return;
        }
        const newCenter = getCenter(p1, p2);

        const dist = getDistance(p1, p2);

        if (!lastDist) {
          lastDist = dist;
        }

        // local coordinates of center point
        const pointTo = {
          x: (newCenter.x - image.x()) / image.scaleX(),
          y: (newCenter.y - image.y()) / image.scaleX(),
        };

        const scale = image.scaleX() * (dist / lastDist);

        image.scaleX(scale);
        image.scaleY(scale);

        // calculate new position of the stage
        const dx = newCenter.x - lastCenter.x;
        const dy = newCenter.y - lastCenter.y;

        const newPos = {
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
    // setIsDelete(true);
    setCreateObjectURL("");
    (document.getElementById("file-input") as HTMLInputElement).value = "";
  };

  return (
    <>
      {imagePath && <img src={imagePath} />}
      <Stage height={image_height} width={image_width} ref={stageRef}>
        <Layer id="stuffToShow">
          {/* 土台の画像 */}
          <Image image={image} width={image_width} height={image_height} />
          <Image image={camera} width={image_width} height={image_height} />
          <Group draggable={true} x={0} y={0} ref={imageRef}>
            <Image
              image={design}
              width={designSize.width}
              height={designSize.height}
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
        </Layer>
      </Stage>
      <label style={{ fontSize: "0px" }}>
        {createObjectURL || (
          <img src="/app/original/plus.svg" className={styles.uploadImage} />
        )}
        <input
          id="file-input"
          className="hidden"
          type="file"
          accept="image/*"
          name="myImage"
          onChange={uploadToClient}
          style={{ display: "none" }}
        />
      </label>
      <button
        onClick={goCheckHandler}
        disabled={createObjectURL ? false : true}
        className={styles.next}
      >
        次へ
      </button>

      {/* {save && (
        // どのユーザーの何番目？
        <QRCode value={`userID`} />
      )} */}
    </>
  );
}

export default App_image_edit;
