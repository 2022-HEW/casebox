import Konva from "konva";
import { useRouter } from "next/router";
import React, { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import { Image, Stage, Layer, KonvaNodeComponent, Rect } from "react-konva";
import { useRecoilState, useRecoilValue } from "recoil";
import useImage from "use-image";
import { downloadState, modalState } from "../../../atoms/app_atoms";
import { tabState } from "../../../atoms/atoms";
type TemplateView = {
  devicePath: string;
  texturePath: string;
  setDownloadPath: Dispatch<SetStateAction<string>>

};

const TemplateView = ({ devicePath, texturePath,setDownloadPath }: TemplateView) => {
  const [deviceSize, setDeviceSize] = useState({ width: 0, height: 0 });
  const [textureInfo, setTextureInfo] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [deviceSrc] = useImage(devicePath);
  const [textureSrc] = useImage(texturePath);
  const router = useRouter();
  const camera_image_path = devicePath.replace(".png", "_camera.png");
  const [camera] = useImage(camera_image_path);
  const stageRef = React.useRef<any>();
  const [modal,setModal]= useRecoilState(modalState)
  const download = useRecoilValue(downloadState)

  // デバイスの画像を作る
  useEffect(() => {
    const img = new window.Image();
    img.src = devicePath;
    img.onload = () => {
      setDeviceSize({
        width: (542 * img.width) / img.height,
        height: img.height,
      });
    };
  }, [devicePath, router.pathname]);

  useEffect(() => {
    function downloadURI(uri: string) {
      setDownloadPath(uri);
      setModal(true);
    }
    if (download) {
      downloadURI(
        stageRef.current
          .getStage()
          .toDataURL({ mimeType: "image/png", quality: 1.0 })
      );
    } else {
      return;
    }
  }, [download]);


  // テクスチャの画像を作る
  useEffect(() => {
    const img = new window.Image();
    img.src = texturePath;
    img.onload = () => {
      setTextureInfo({
        // width: deviceSize.width,
        width: (530 * img.width) / img.height,
        // height: (deviceSize.width * img.height) / img.width,
        height: 530,
        x: 246 - deviceSize.width / 2,
        // y:-(542-img.height),
        // x:0,
        y: 0,
        // x:542 = img.width:img.height
      });
    };
  }, [deviceSize]);

  return (
    <Stage width={468} height={542} ref={stageRef}>
      <Layer>
        <Image
          width={deviceSize.width}
          height={542}
          x={243 - deviceSize.width / 2}
          y={0}
          image={deviceSrc}
        />
        {textureSrc && (
          <>
            <Image
              {...textureInfo}
              width={textureInfo.width}
              image={textureSrc}
            />
            {/* <Rect
              width={textureInfo.width < 0 ? 0 : textureInfo.width}
              x={textureInfo.x}
              height={100}
              y={0}
              fill="rgba(254, 220, 0, 1)"
              
              cornerRadius={[40, 40, 0, 0]}
            /> */}
            {/* <Rect
              width={textureInfo.width < 0 ? 0 : textureInfo.width}
              x={textureInfo.x}
              height={
                510 - textureInfo.height < 0 ? 0 : 520 - textureInfo.height
              }
              y={510 - textureInfo.y}
              fill="rgba(254, 220, 0, 1)"
              cornerRadius={[0, 0, 40, 40]}
            /> */}
          </>
        )}
        <Image
          width={deviceSize.width}
          height={542}
          x={243 - deviceSize.width / 2}
          y={0}
          image={camera}
        />
      </Layer>
    </Stage>
  );
};

export default TemplateView;
