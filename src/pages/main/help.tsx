import React, { useEffect, useRef, useState } from "react";
import Box from "../../components/main/common/Box";
import Nav from "../../components/main/common/Nav";
import styles from "../../styles/help.module.css";
import Image from "next/image";
import { NextPage } from "next";
import {
  AnimatePresence,
  AnimationControls,
  motion,
  useAnimation,
} from "framer-motion";
import { bound, transition } from "../../themes/animation/indicate";

type Question = {
  handleClickQuestion: (index: number) => void;
};
type UserChat = {
  chat: string;
};
const QUESTION: string[] = [
  "CASEBOXについて",
  "アカウント登録について",
  "お支払い方法について",
  "オリジナルケースについて",
  "公式サイトについて",
];
const Help: NextPage = () => {
  const ANSWER = [
    "CASEBOXチャットサポートです。どのようなことでお困りですか？",
    "CASEBOXはスマートフォンのケースが購入できる自販機です。画像をアップロードしたり、イラストを書いたりしてあなただけのケースを作成できます。",
    "CASEBOXのWebサイトでアカウントの登録ができます。オリジナルケースを作る際アカウントが必要となります。",
    "現在利用できるお支払い方法は、現金、ID、QuicPay、楽天Edy、交通系電子マネー、クレジットカードのタッチ決済です。",
    "オリジナルケースはCASEBOXのWebサイトでアカウント登録を済ませた方のみ、ご利用いただけます。Webサイトのマイページから商品のデザインを選択しQRコードを表示できます。",
    "公式Webサイトでは、販売している商品を閲覧しQRコードを表示することができます。オリジナルのスマホケースをご希望の際、アカウント登録が必要となります。",
  ];

  const [userChat, setUserChat] = useState<string[]>();
  const [staffChat, setStaffChat] = useState([ANSWER[0]]);
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(ref && ref.current){
      ref.current.scrollIntoView();
    }
  },[staffChat]);
  

  const handleClickQuestion = (index: number) => {
    // 質問を追加
    setUserChat((prevState) =>
      prevState ? [...prevState, QUESTION[index]] : [QUESTION[index]]
    );
    //　答えを配列に追加する
    setStaffChat((prevState) => [...prevState, ANSWER[index + 1]]);
  };

  return (
    <Box>
      <Nav>
        <Header />
        <div className={styles.chat_box}>
          {staffChat.map((value, index) => (
            <div key={index}>
              <Answer answer={value} />
              {/* 初回と最後は出さない */}
              {userChat && index !== staffChat.length - 1 && (
                <UserChat chat={userChat[index]} />
              )}
            </div>
          ))}
          <Questions handleClickQuestion={handleClickQuestion} />
          <div  ref={ref}/>
        </div>
      </Nav>
    </Box>
  );
};

const UserChat = ({ chat }: UserChat) => {
  return (
    <AnimatePresence>
      <div className={styles.user_chat}>
        <motion.p {...transition} key={"fade"}>
          {chat}
        </motion.p>
      </div>
    </AnimatePresence>
  );
};

const Header = () => {
  return (
    <div className={styles.header}>
      <p>CASE BOX サポートチーム</p>
    </div>
  );
};

type Props = {
  answer: string;
};
const Answer = ({ answer }: Props) => {
  return (
    <AnimatePresence>
      <div className={styles.answer}>
        <Image src={"/image/answer.svg"} width={70} height={70} />
        <motion.p {...transition} key={"fade"}>
          {answer}
        </motion.p>
      </div>
    </AnimatePresence>
  );
};

const Questions = ({ handleClickQuestion }: Question) => {
  return (
    <div className={styles.questions}>
      {QUESTION.map((value, index) => (
        <motion.div
          key={value}
          className={styles.question}
          {...transition}
          transition={{ ...transition.transition, delay: 1 + index / 10 }}
        >
          <span onClick={() => handleClickQuestion(index)}>{value}</span>
        </motion.div>
      ))}
    </div>
  );
};
export default Help;
