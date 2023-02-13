import { motion } from "framer-motion";
import { ComponentProps } from "react";
import styles from "../../../styles/button.module.css";

// type Props = {
//   label: string;
//   onClick: () => void;
//   situ_name: 'nav' | 'screen';
// };
type Props = {
  label: string;
  situ_name:string;
}&ComponentProps<"button">;

export const Button= ({ label, onClick, situ_name }:Props) => {
  return (
    <motion.button
      // sizeが'small'の時: styles.buttonとstyles.smallが適用される
      // sizeが'small'ではない時: styles.buttonとstyles.largeが適用される
      className={`${styles.button} ${
        situ_name === 'nav' ? styles.nav : styles.screen
      }`}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
    >
      {label}
    </motion.button>
  );
};
