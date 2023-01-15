import React from "react";
import Image from "next/image";
import SellIcon from '@mui/icons-material/Sell';

type Props = {
  src: string;
};
export const Icon = ({ src }: Props) => {
  return (
    <div >
      <SellIcon/>
    </div>
  );
};
