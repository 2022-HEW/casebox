import styles from "../styles/button.module.css";

type Props = {
  label: string;
  onClick: () => void;
  situ_name: 'nav' | 'screen';
};

export const Button= ({ label, onClick, situ_name }:Props) => {
  return (
    <button
      // sizeが'small'の時: styles.buttonとstyles.smallが適用される
      // sizeが'small'ではない時: styles.buttonとstyles.largeが適用される
      className={`${styles.button} ${
        situ_name === 'nav' ? styles.nav : styles.screen
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
