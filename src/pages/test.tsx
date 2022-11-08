import React, { useState,TouchEvent } from "react";
import { Stage, Layer, Line } from "react-konva";
import { SketchPicker } from "react-color";
import Konva from 'konva';
import dynamic from 'next/dynamic'
// import StageComponent from '../components/StageComponet'
// CSRに変更
const StageComponent = dynamic(() => import('../components/StageComponet'), { ssr: false })
const CanvasPage = () => {
    return (
      <StageComponent />
    )
  }

export default CanvasPage;



