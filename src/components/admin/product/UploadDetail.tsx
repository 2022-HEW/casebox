import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getDB } from "../../../utils";


type Props = {
  setError: (text: string) => void;
  handleRegister: (text: string, category: number, situation: number) => void;
};
export const UploadDetail = ({ handleRegister }: Props) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(1);
  const { result, CatchError } = getDB("Category");

  // useEffect(() => {
  //   console.log(result);
  // }, [result]);
  


  const handleChangeInput = (name: string) => {
    setText(name);
  };

  const handleChangeSelect = (
    value: number,
    setState: Dispatch<SetStateAction<number>>
  ) => {
    setState(value);
  };

  return (
    <Grid container direction={"column"} gap={7} justifyContent="center">
      <Grid item>
        <TextField
          label="商品名"
          variant="outlined"
          fullWidth
          onChange={(e) => handleChangeInput(e.currentTarget.value)}
          value={text}
        />
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="select">カテゴリー</InputLabel>
          <Select
            labelId="select"
            label="カテゴリー"
            fullWidth
            onChange={(e) =>
              handleChangeSelect(Number(e.target.value), setCategory)
            }
            defaultValue={1}
          >
            
            {result && result.map((value:{m_product_ID:number,m_product_category:string},index:number)=>
                <MenuItem value={value.m_product_ID} key={index}>{value.m_product_category}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="select">商品状態</InputLabel>
          <Select
            labelId="select"
            label="カテゴリー"
            fullWidth
            onChange={(e) =>
              handleChangeSelect(Number(e.target.value), setIsOpen)
            }
            defaultValue={1}
          >
            <MenuItem value={1}>公開</MenuItem>
            <MenuItem value={0}>非公開</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid>
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleRegister(text, category, isOpen)}
        >
          商品を登録
        </Button>
      </Grid>
    </Grid>
  );
};
