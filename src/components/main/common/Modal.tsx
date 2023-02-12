import styles from "../../../styles/modal.module.css";
import { ReactNode, useEffect, useState } from "react";
import { log } from "console";
import { useRecoilState } from "recoil";
import { modalState } from "../../../atoms/atoms";
import { animate, AnimatePresence, motion, useAnimation } from "framer-motion";
import { slideModal } from "../../../themes/animation/indicate";

type Props = {
  children?: ReactNode;
  // modal_flg:boolean,
  // setModal:React.Dispatch<React.SetStateAction<boolean>>
};

// const Modal =({modal_flg,setModal,children}:Props)=>{
const Modal = ({ children }: Props) => {
  const [modal, setModal] = useRecoilState(modalState);

  return (
    <AnimatePresence>
      {modal && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setModal(!modal)}
          ></div>
        </>
      )}

      <motion.div
        className={styles.modal_box}
        style={modal ? {} : { display: "none" }}
        {...(modal ? slideModal : {})}
      >
        {modal && <>{children}</>}
      </motion.div>
    </AnimatePresence>
  );
};
export default Modal;
