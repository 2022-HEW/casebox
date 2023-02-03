import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { getStocks } from "../../../utils";
import { Stock } from "../../../types/admin/Stock";
import { ModalItem } from "./ModalItem";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import useEffectCustom from "../../common/useEffectCustom";

type StockTable = {
  device: "iPhone" | "Android";
};

export const StockTable = ({ device }: StockTable) => {
  const { stocks, CatchError } = getStocks();
  const [isOpen, setIsOpen] = useState(false);
  const [stockIndex, setStockIndex] = useState(0);
  const [addStock, setAddStock] = useState<number | undefined>();
  const [stock,setStock] = useState(0)
  const [stockResult, setStockResult] = useState(0);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleClickOrder = (index: number) => {
    handleOpen();
    setStockIndex(index);
    setStock(stocks[index].model_stocks)
  };
  const handleChangeAddStock = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!Number.isNaN(stock + Number(e.currentTarget.value))) {
      console.log(typeof stockResult);
      
      setAddStock(Number(e.target.value));
      setStockResult(stock + Number(e.currentTarget.value))
    } else {
      // console.log(typeof e.currentTarget.value);
    }
  };

  return (
    <>
      {stocks && (
        <>
          <TableContainer sx={{ marginTop: "-11.5%" }}>
            <Table>
              <TableHead sx={{ background: "#ccc" }}>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ borderRight: " 0.5px solid #aaa", width: "40%" }}
                  >
                    機種名
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ borderRight: " 0.5px solid #aaa", width: "40%" }}
                  >
                    数量
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ borderRight: " 0.5px solid #aaa" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stocks.map(
                  (value: Stock, index: number) =>
                    // iPhoneかつ名前にiPhoneが入っているか
                    // またはAndroidかつ名前にいiPhoneが入ってない
                    ((device === "iPhone" &&
                      value.model_name.includes(device)) ||
                      (device === "Android" &&
                        !value.model_name.includes("iPhone"))) && (
                      <TableRow key={index}>
                        <TableCell align="center">{value.model_name}</TableCell>
                        <TableCell align="center">
                          {value.model_stocks}
                        </TableCell>
                        <TableCell align="center" sx={{ color: "#528CB8" }}>
                          <Button
                            onClick={(e) =>
                              handleClickOrder(Number(e.currentTarget.value))
                            }
                            value={index}
                          >
                            補充
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={isOpen} onClose={handleClose}>
            <Grid
              container
              direction={"column"}
              gap={1}
              sx={{ width: "600px", height: "70vh" }}
              alignItems="center"
            >
              <Grid item>
                <DialogTitle
                  align="center"
                  variant="h4"
                  mt={3}
                  sx={{ fontSize: "4vh" }}
                >
                  {"在庫補充"}
                </DialogTitle>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction={"column"}
                  gap={2}
                  alignItems={"end"}
                  sx={{ position: "relative", right: "20%" }}
                >
                  <ModalItem
                    title={"機種名"}
                    value={stocks[stockIndex].model_name}
                    positionLeft={"21%"}
                  />
                  <ModalItem
                    title={"補充前数量"}
                    value={stocks[stockIndex].model_stocks}
                  />
                  <ModalItem
                    title={"補充水準数量"}
                    value={stocks[stockIndex].model_stock_standard}
                  />
                  <ModalItem
                    title={"補充数量"}
                    isAble={true}
                    value={""}
                    positionLeft={"5.6vw"}
                  >
                    <TextField
                      size={"small"}
                      sx={{ width: "100px", height: "10px" }}
                      minRows={4}
                      onChange={handleChangeAddStock}
                      value={addStock}
                      // type={"number"}
                    />
                  </ModalItem>
                  <ModalItem title={"補充後数量"} value={stockResult} />
                </Grid>
              </Grid>
              <DialogActions>
                <Grid container direction={"column"} gap={2}>
                  <Grid item>
                    <Button
                      onClick={() => {}}
                      color={"primary"}
                      variant="contained"
                      sx={{ fontSize: "2vh", width: "20vw" }}
                    >
                      ケースを補充
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleClose}
                      variant="text"
                      sx={{ fontSize: "2vh", width: "20vw", color: "#222" }}
                    >
                      キャンセル
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Grid>
          </Dialog>
        </>
      )}
    </>
  );
};
