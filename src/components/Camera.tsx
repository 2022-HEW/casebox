import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { Stream } from 'stream';
import { log } from 'console';
import { useRouter } from 'next/router';

const videoWidth: number = 750;
const videoHeight: number = 750;
const videoFrameRate: number = 5;

const constraints: MediaStreamConstraints = {
  audio: false,
  video: {
    width: videoWidth,
    height: videoHeight,
    frameRate: {
      max: videoFrameRate,
    },
    // 内カメラ
    facingMode: {
      exact: 'user',
    },
  },
};

const Camera = () => {
    const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isContinue, setIsContinue] = useState(true);
  const [qrCodeData, setQrCodeData] = useState<string[]>([]);

  useEffect(() => {
    const openCamera = async () => {
        // <video>
      const video = videoRef.current;
      if (video) {
        // video起動、リアルタイムで
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
       
    };
    }
    openCamera();
    
  }, []);

  useEffect(()=>{
    const openCamera = async () => {
        // <video>
        // video起動、リアルタイムで
      const video = videoRef.current;
      if (video) {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if(!isContinue){
            stream.getTracks().forEach(function(track:any) {
                track.stop();
            });        
            // option を削除しなければカメラは消えない
            
            router.push({
                pathname:"/device_select"
            })
            video.srcObject = null;
            // console.log(video.srcObject);
        }
    };
    }
    console.log(isContinue);
    
    openCamera();
  },[isContinue])



// 止める
  useEffect(() => {
    if (!isContinue) {
      return;
    }

    // 2Dグラフィックを描画
    const decodeQRCode = () => {
      const context = canvasRef?.current?.getContext('2d');
      const video = videoRef?.current;

      if (!context || !video) {
        return;
      }

      context.drawImage(video, 0, 0, videoWidth, videoHeight);
      const imageData = context.getImageData(0, 0, videoWidth, videoHeight);
      const code = jsQR(imageData.data, videoWidth, videoHeight);

      return code?.data;
    };

    const intervalId = window.setInterval(() => {
      const decodedValue = decodeQRCode();

      if (!decodedValue || qrCodeData.includes(decodedValue)) {
        return;
      }

      setQrCodeData([...qrCodeData, decodedValue]);
    }, 1_000 / videoFrameRate);
    intervalRef.current = intervalId;

    // const stopCamera = async () => {
    //     // <video>
    //     // video起動、リアルタイムで
    //     const stream = await navigator.mediaDevices.getUserMedia(constraints);
    //     stream.getTracks().forEach(function(track:any) {
    //         track.stop();
    //         return
    //     });
    // }
    // 見つけたら
    if(qrCodeData[0]){
        console.log(qrCodeData);
        setIsContinue(false);
        // router.push({
        //     pathname:"/device_select"
        // }
        // )
       
        // stopCamera();
                // return;
    }

    return () => {
      clearInterval(intervalRef.current);
    };

    
  }, [isContinue, qrCodeData]);
// }, []);

  return (
    <div>
      <p>QR Code Scanner</p>
      <div style={{ display: 'grid' }}>
        <div>
          <video
            autoPlay
            playsInline={true}
            ref={videoRef}
            style={{ width: '20%' }}
          >
            <canvas width={videoWidth} height={videoHeight} ref={canvasRef} />
          </video>
        </div>
        <div>
          <p>{qrCodeData.join('\n')}</p>
        </div>
        <div>
          {/* <button onClick={handleStart}>Start Scan</button>
          <button onClick={handleStop}>Stop Scan</button> */}
        </div>
      </div>
    </div>
  );
};

export default Camera;