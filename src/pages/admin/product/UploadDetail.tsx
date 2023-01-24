import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

export const UploadDetail = () => {
  const [text, setText] = useState("");
  const [isError, setIsError] = useState(false);
  const [category, setCategory] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(1);
  const handleChangeInput = (name: string) => {
    setText(name);
  };
  const handleClickRegister = (
    value: number,
    setState: Dispatch<SetStateAction<number>>
  ) => {
    setState(value);
  };
  return (
    <Grid container direction={"column"} gap={4} justifyContent="center">
      <Grid item>
        <TextField
          label="商品名"
          variant="outlined"
          fullWidth
          onChange={(e) => handleChangeInput(e.currentTarget.value)}
          value={text}
          error={isError}
          helperText={isError && "名前を入力して下さい"}
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
              handleClickRegister(Number(e.target.value), setCategory)
            }
            value={text}
          >
            <MenuItem value={1}>category</MenuItem>
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
              handleClickRegister(Number(e.target.value), setIsOpen)
            }
            value={text}
          >
            <MenuItem value={1}>公開</MenuItem>
            <MenuItem value={0}>非公開</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid>
        <Button variant="contained" fullWidth>商品を登録</Button>
      </Grid>
    </Grid>
  );
};
