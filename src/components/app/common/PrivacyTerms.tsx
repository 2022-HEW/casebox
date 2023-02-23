import { type } from "os";
import React, { useState } from "react";
import App_header from "../../../components/app/common/App_header";
import styles from "../../../styles/app/common/app_text.module.css";
import { PRIVACYTERMS } from "../../../themes/app/PRIVACYTERMS";

type PrivacyTerms = {
  name: "privacy" | "terms";
};
const PrivacyTerms = ({ name }: PrivacyTerms) => {
  const HEADER = PRIVACYTERMS[name].header;
  const TEXTS = PRIVACYTERMS[name].text;
  return (
    <div className={styles.container}>
      <App_header label={name==="privacy"?"プライバシーポリシー":"利用規約"} />
      <div className={styles.textBox}>
        <p className={styles.header}>{HEADER}</p>
        {TEXTS.map((value, index) => (
          <div key={index}>
            <p className={styles.title}>{value.title}</p>
            {value.value.map((value, index) => (
              <p key={index} className={styles.text}>
                <span >{index + 1}.</span>
                {value}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyTerms;
