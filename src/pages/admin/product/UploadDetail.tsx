import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";

export const UploadDetail = () => {
    const [text,setText] =useState("")
    const [isError,setIsError] = useState(false)
    const handleChangeInput=(name:string)=>{
        setText(name)
    }
  return <Grid container direction={"column"}>
    <Grid item>
    <TextField
          label="商品名"
          variant="outlined"
          fullWidth
          onChange={(e) => handleChangeInput(e.currentTarget.value)}
          value={text}
          error={isError}
          helperText={"名前を入力して下さい"}
          
        />
    </Grid>
  </Grid>;
};
