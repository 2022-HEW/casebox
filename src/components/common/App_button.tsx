import { ComponentProps } from "react";
import styles from "../../styles/app_button.module.css";

// type Props = {
//   label: string;
//   onClick: () => void;
//   situ_name: 'nav' | 'screen';
// };
type Props = {
  label: string;
}&ComponentProps<"button">;

export const Button= ({ label, onClick}:Props) => {
  return (
    <button
      // sizeが'small'の時: styles.buttonとstyles.smallが適用される
      // sizeが'small'ではない時: styles.buttonとstyles.largeが適用される
      className={`${styles.button}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
