import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, {
  ChangeEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "../../../components/admin/common/box";
import { GlobalNav } from "../../../components/admin/common/globalNav";
import { Nav } from "../../../components/admin/common/nav";
import { SUBTITLE } from "../../../themes/admin/ProductNav";
import { fetcher, InsertDB } from "../../../utils";
import { Body } from "../../../components/admin/common/body";
import { getDB } from "../../../utils";
import { NextPage } from "next";
import { RelationDetail } from "../../../components/admin/stock/RelationDetail";
import useEffectCustom from "../../../Hooks/common/useEffectCustom";

interface Checkbox {
  [props: number]: boolean;
}
const Product: NextPage = () => {
  const [error, setError] = useState("");
  const [checkboxStates, setCheckboxStates] = useState<Checkbox>({});

  const relationResult = getDB("Relations").result;
  const colorResult = getDB("Colors").result;

  const handleSetError = (text: string) => {
    setError(text);
  };

  useEffectCustom(() => {
    const initialStates = colorResult.reduce((acc: any, curr: any) => {
      acc[curr.color_ID] = false;

      return acc;
    }, {});
    setCheckboxStates(initialStates);
  }, [colorResult]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setCheckboxStates((prevState) => ({
      ...prevState,
      [value]: checked,
    }));
  };

  const handleRegister = async (typeID: number) => {
    setError("");

    const colorIDs = Object.entries(checkboxStates)
      .map((value) => {
        if (value[1]) {
          return value[0];
        }
      })
      .filter(Boolean);

    // error check
    if (!typeID) {
      setError("機種名が選択されていません");
      return;
    }

    for (const value of relationResult) {
      if (
        colorIDs.includes(value.color_ID) &&
        Number(value.model_ID) === typeID
      ) {
        setError("この関係はすでに登録されています");
        return;
      }
    }
    for (const value of colorIDs) {
      const ColorBody = {
        situ: "addRelation",
        color_id: value!,
        model_id: typeID,
      };

      InsertDB(ColorBody);
    }
    alert("登録しました。");
  };

  return (
    <Grid container gap={0}>
      <GlobalNav />
      <Nav title={"商品情報"} values={SUBTITLE} />
      <Body>
        <Box alignContent="center" alignItems="center">
          <Grid
            item
            xs={5}
            container
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item sx={{width:"350px",}}>
              <FormControl fullWidth>
                <FormLabel>カラー</FormLabel>
                <FormGroup sx={{ overflow: "scroll", maxHeight: "475px" }}>
                  {colorResult &&
                    colorResult.map(
                      (
                        value: {
                          color_name: string;
                          color_code: string;
                          color_ID: number;
                        },
                        index: number
                      ) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={value.color_name}
                              value={value.color_ID}
                              checked={checkboxStates[value.color_ID] || false}
                              onChange={handleChange}
                            />
                          }
                          label={value.color_name}
                          key={index}
                        />
                      )
                    )}
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item xs={5} justifyContent={"center"} alignItems={"center"}>
            <RelationDetail
              setError={handleSetError}
              handleRegister={handleRegister}
            />
            {error && <Typography color="error">※{error}</Typography>}
          </Grid>
        </Box>
      </Body>
    </Grid>
  );
};

export default Product;
