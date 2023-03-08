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
    handleRegister: (id:number ) => void;
  };
  export const RelationDetail = ({ handleRegister}: Props) => {
      const {result} = getDB("Stocks")
      const typeRef = useRef<HTMLSelectElement>(null);
  
    return (
      <Grid container direction={"column"} gap={7} justifyContent="center">
       <Grid item>
        <FormControl fullWidth>
          <InputLabel id="select">機種</InputLabel>
          <Select
            labelId="select"
            label="機種"
            fullWidth
            inputRef={typeRef}
          >
            {result &&
              result.map(
                (
                  value: { model_name: string; model_id: number },
                  index: number
                ) => (
                  <MenuItem value={value.model_id} key={index} id={String(value.model_id)}>
                    {value.model_name}
                  </MenuItem>
                )
              )}
          </Select>
        </FormControl>
      </Grid>  
        <Grid>
          <Button
            variant="contained"
            fullWidth
            onClick={() =>{
               
              handleRegister(
                Number(typeRef.current?.value),
              )
            }}
          >
            関係を登録
          </Button>
        </Grid>
      </Grid>
    );
  };
  