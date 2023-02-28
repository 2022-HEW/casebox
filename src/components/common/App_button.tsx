import { ComponentProps, CSSProperties } from "react";
import styles from "../../styles/app_button.module.css";

// type Props = {
//   label: string;
//   onClick: () => void;
//   situ_name: 'nav' | 'screen';
// };
type Props = {
  label: string,
  style?:CSSProperties
  id?:string
}&ComponentProps<"button">;

export const Button= ({ label, onClick,disabled,style,id}:Props) => {
  return (
    <button
      // sizeが'small'の時: styles.buttonとstyles.smallが適用される
      // sizeが'small'ではない時: styles.buttonとstyles.largeが適用される
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      style={style}
      id={id}
    >
      {label}
    </button>
  );
};
