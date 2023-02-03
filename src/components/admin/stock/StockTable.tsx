import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export const StockTable = () => {
  return (
    <TableContainer sx={{marginTop:"-11.5%"}}>
      <Table>
        <TableHead sx={{background:"#ccc"}}>
          <TableRow>
            <TableCell align="center" sx={{borderRight:" 0.5px solid #aaa"}}>機種名</TableCell>
            <TableCell align="center" sx={{borderRight:" 0.5px solid #aaa"}}>数量</TableCell>
            <TableCell align="center" sx={{borderRight:" 0.5px solid #aaa"}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">a</TableCell>
            <TableCell align="center">a</TableCell>
            <TableCell align="center" sx={{color:"#528CB8"}}>補充</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
