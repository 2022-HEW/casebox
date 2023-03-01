import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
  import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
  } from "react";
  import { getDB } from "../../../utils";
  
  type Props = {
    setError: (text: string) => void;
    handleRegister: (name:string ) => void;
    handleChangeColorCode:(code:string)=>void
    colorCode:string
  };
  export const ColorDetail = ({ handleRegister,handleChangeColorCode,colorCode }: Props) => {
      const colorRef = useRef<HTMLInputElement>(null);
  
    return (
      <Grid container direction={"column"} gap={7} justifyContent="center">
        <Grid item>
          <TextField label="カラー名" variant="outlined" fullWidth  inputRef={colorRef} />
        </Grid>
        <Grid item>
          <TextField label="カラーコード" variant="outlined" fullWidth  onChange={e=>handleChangeColorCode(e.target.value)} value={colorCode}/>
        </Grid>
  
        <Grid>
          <Button
            variant="contained"
            fullWidth
            onClick={() =>
              handleRegister(
                colorRef.current?.value as string,
              )
            }
          >
            カラーを登録
          </Button>
        </Grid>
      </Grid>
    );
  };
  