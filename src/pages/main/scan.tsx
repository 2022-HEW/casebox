import React, { useState } from "react";
import Box from "../../components/main/common/Box";
import Nav from "../../components/main/common/Nav";
import Camera from "../../components/main/Original/Camera";
import Movie from "../../components/main/index/Movie";
import { NextPage } from "next";
import { Tutorial } from "../../components/main/common/Tutorial";
import { Button } from "../../components/main/common/Button";

const scan: NextPage = () => {
  const [mode, setMode] = useState<"camera" | "id">("camera");
  const handleClickMode=()=>{
    setMode("id")
  }
  return (
    <Box>
      <Nav>
        <div style={{ width: "100%", height: "100%", display: "flex" }}>
          <Tutorial src="" />
           <Camera />
        </div>
        <div style={{ position: "absolute", bottom: "18px", right: "18px" }}>
          <Button label="もう一度" situ_name="" onClick={handleClickMode}/>
        </div>
      </Nav>
    </Box>
  );
};

export default scan;
