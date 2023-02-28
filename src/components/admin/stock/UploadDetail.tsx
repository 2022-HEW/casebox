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
  handleRegister: (typeName: string, os: string, color: string) => void;
};
export const UploadDetail = ({ handleRegister }: Props) => {
  const osRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLSelectElement>(null);
  const { result, CatchError } = getDB("Colors");

  useEffect(() => {
    console.log(result);
  }, [result]);
  return (
    <Grid container direction={"column"} gap={7} justifyContent="center">
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="select">デバイス</InputLabel>
          <Select
            labelId="select"
            label="デバイス"
            fullWidth
            inputRef={osRef}
            defaultValue={"iPhone"}
          >
            <MenuItem value={"iPhone"}>iPhone</MenuItem>
            <MenuItem value={"Android"}>Android</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <TextField label="機種名" variant="outlined" fullWidth  inputRef={typeRef} />
      </Grid>

      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="select">カラー</InputLabel>
          <Select
            labelId="select"
            label="カラー"
            fullWidth
            inputRef={colorRef}
            defaultValue={"ブラック"}
          >
            {result &&
              result.map(
                (
                  value: { color_name: string; color_code: string },
                  index: number
                ) => (
                  <MenuItem value={value.color_name} key={index}>
                    <Grid container alignItems={"center"}>
                      <Grid item>
                        <Box
                          sx={{ background: `${value.color_code}` }}
                          width={20}
                          height={10}
                        />
                      </Grid>
                      <Grid item>{value.color_name}</Grid>
                    </Grid>
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
          onClick={() =>
            handleRegister(
              typeRef.current?.value as string,
              osRef.current?.value as string,
              colorRef.current?.value as string
            )
          }
        >
          商品を登録
        </Button>
      </Grid>
    </Grid>
  );
};
