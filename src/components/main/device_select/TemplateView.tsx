import Konva from "konva";
import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import { Image, Stage, Layer, KonvaNodeComponent, Rect } from "react-konva";
import useImage from "use-image";
type TemplateView = {
  devicePath: string;
  texturePath: string;
};

const TemplateView = ({ devicePath, texturePath }: TemplateView) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [deviceSrc] = useImage(devicePath);
  const [textureSrc] = useImage(texturePath);
  useEffect(() => {
    const img = new window.Image();
    img.src = devicePath;
    img.onload = () => {
      setImageSize({
        width: (542 * img.width) / img.height,
        height: img.height,
      });
    };
  }, [devicePath]);

  return (
    <Stage width={468} height={542}>
      <Layer>
        <Image
          width={imageSize.width}
          height={542}
          x={243 - imageSize.width / 2}
          y={0}
          image={deviceSrc}
        />
      </Layer>
    </Stage>
  );
};

export default TemplateView;
