import React from "react";
import Box from "../../components/main/common/Box";
import Nav from "../../components/main/common/Nav";
import Movie from "../../components/main/index/Movie";
import styles from "../../styles/site.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { motion } from "framer-motion";
import { transition } from "../../themes/animation/indicate";

const Site: NextPage = () => {
  return (
    <Box>
      <Nav>
        <motion.div className={styles.wrap} {...transition}>
          <div className={styles.Frame}>
            {/* <Movie /> */}
            チュートリアル動画
          </div>
          <motion.div className={styles.Frame} {...transition}>
            <QR />
          </motion.div>
        </motion.div>
      </Nav>
    </Box>
  );
};

const QR = () => {
  return (
    <Image
      src={"/image/frame.png"}
      width={412}
      height={412}
      objectFit={"contain"}
    />
  );
};

export default Site;
