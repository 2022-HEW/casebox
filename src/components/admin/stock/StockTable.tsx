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
import { getDB } from "../../../utils";
import { Stock } from "../../../types/admin/Stock";
import { ModalItem } from "./ModalItem";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import useEffectCustom from "../../../Hooks/common/useEffectCustom";
import { InsertDB } from "../../../utils";

type StockTable = {
  device: "iPhone" | "Android";
};

export const StockTable = ({ device }: StockTable) => {
  const { result, CatchError } = getDB("Stocks");
  const [isOpen, setIsOpen] = useState(false);
  const [stockIndex, setStockIndex] = useState(0);
  const [addStock, setAddStock] = useState(0);
  const [stock, setStock] = useState(0);
  const [stockResult, setStockResult] = useState(0);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  // 補充後数量の初期値が0にならないように
  useEffectCustom(() => {
    setStockResult(stock);
  }, [stock]);
  const handleClickOrder = (index: number) => {
    handleOpen();
    setStockIndex(index);
    setStock(result[index].model_stocks);
  };
  const handleChangeAddStock = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!Number.isNaN(stock + Number(e.currentTarget.value))) {
      console.log(typeof stockResult);

      setAddStock(Number(e.target.value));
      setStockResult(stock + Number(e.currentTarget.value));
    } else {
      // console.log(typeof e.currentTarget.value);
    }
  };

  const handleClickAddDB = () => {
    const tradeBody = {
      situ: "addTrade",
      model_id: result[stockIndex].model_id,
      add_quant: addStock,
      transaction_cost: addStock * result[stockIndex].model_price,
    };
    const stockBody = {
      situ: "addStock",
      model_quant: stockResult,
      model_id: result[stockIndex].model_id,
    };
    InsertDB(tradeBody);
    InsertDB(stockBody);
    alert("発注しました");
    setAddStock(0);
    handleClose();
  };

  return (
    <>
      {result && (
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
                {result.map(
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
                    value={result[stockIndex].model_name}
                    positionLeft={"3.4vw"}
                  />
                  <ModalItem
                    title={"補充前数量"}
                    value={result[stockIndex].model_stocks}
                  />
                  <ModalItem
                    title={"補充水準数量"}
                    value={result[stockIndex].model_stock_standard}
                  />
                  <ModalItem
                    title={"補充数量"}
                    isAble={true}
                    value={""}
                    positionLeft={"4.92vw"}
                  >
                    <TextField
                      size={"small"}
                      sx={{ width: "100px", height: "10px" }}
                      onChange={handleChangeAddStock}
                      value={addStock}
                      // type={"number"}
                    />
                  </ModalItem>
                  <ModalItem title={"補充後数量"} value={stockResult} />
                  <ModalItem
                    title={"金額"}
                    value={result[stockIndex].model_price * addStock}
                    positionLeft={"-2vw"}
                  />
                </Grid>
              </Grid>
              <DialogActions>
                <Grid container direction={"column"} gap={2}>
                  <Grid item>
                    <Button
                      onClick={handleClickAddDB}
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
