import React from "react";

type Tutorial  ={
    src:string
}

export const Tutorial = ({src}:Tutorial) => {
  return (
    <div style={{width:"50%"}}>

    <video
      src={src}
      autoPlay
      loop
      style={{
          width: "70%",
          height:"58%",
          background:"#444",
          margin:"25% 15%"
        }}
        />
        </div>
  );
};
