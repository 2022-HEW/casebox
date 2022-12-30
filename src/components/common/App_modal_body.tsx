import { type } from "os";
import React from "react";
import styles from "../../styles/app_modal.module.css";
import Image from "next/image";
type Modal = {
  title: string;
};
export const App_modal_body = ({ title }: Modal) => {
  return (
    <div className={styles.modal_body}>
      <ModalHeader title={title} />
    </div>
  );
};

const ModalHeader = ({ title }: Modal) => {
  return (
    <div className={styles.modal_header}>
      <h3>{title}</h3>
      <div className={styles.cancel}>
        <Image
          src={"/image/cancel.svg"}
          width={30}
          height={30}
          alt={"キャンセル"}
        />
      </div>
    </div>
  );
};
