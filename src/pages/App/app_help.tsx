import { motion, useAnimationControls } from "framer-motion";
import { NextPage } from "next";
import React, { useState } from "react";
import App_header from "../../components/app/common/App_header";
import styles from "../../styles/app/app_help.module.css";
import questions from "../../themes/common/question.json";
import Image from "next/image";

type Box = {
  title: string;
  index: number;
};

type Record = {
  question: string;
  answer: string;
};

const app_help: NextPage = () => {
  return (
    <div className={styles.container}>
      <App_header label="ヘルプ・よくある質問" />
      <div className={styles.help_container}>
        {questions.question.map((value, index) => (
          <Box title={value} key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

const Box = ({ title, index }: Box) => {
  return (
    <div className={styles.box}>
      <p className={styles.title}>{title}</p>
      {questions.question_detail.map((value, i) =>
        value.map((val, j) => {
          if (index === i) {
            return (
              <Record
                question={val}
                answer={questions.answer_detail[i][j]}
                key={index}
              />
            );
          }
        })
      )}
    </div>
  );
};

const Record = ({ question, answer }: Record) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimationControls();
  const rotate = useAnimationControls();
  const toggleExpanded = () => {
    if (isExpanded) {
      controls.start({
        height: "0px",
      });
      rotate.start({
        rotate: 0,
      });
    } else {
      controls.start({
        height: "auto",
      });
      rotate.start({
        rotate: 180,
      });
    }

    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.record}>
      <div className={styles.question_box} onClick={toggleExpanded}>
        <p>{question}</p>
        <motion.div
          className={styles.open}
          animate={rotate}
          transition={{ duration: 0.5 }}
        >
          <Image
            width={15}
            height={15}
            src="/app/help/open.svg"
            objectFit="contain"
          />
        </motion.div>
      </div>
      <motion.div
        className={styles.answer_box}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <p>{answer}</p>
      </motion.div>
    </div>
  );
};
export default app_help;
