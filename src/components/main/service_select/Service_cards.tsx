import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/service_select.module.css";
import { bound } from "../../../themes/animation/indicate";

const Service_cards = () => {
  const CARD_ITEM = [
    {
      href: "/main/template_select",
      name: "テンプレートケース",
      desc: "CASEBOXスタッフにデザインされたケース",
      imgPath: "/common/tempSelect.png",
      width: "260",
      height: "120",
    },
    {
      href: "/main/scan",
      name: "オリジナルケース",
      desc: "写真を入れて作るあなただけのケース",
      imgPath: "/common/original.png",
      width: "220",
      height: "120",
    },
    {
      href: "/main/device_select",
      name: "手書きケース",
      desc: "自分で書いたイラストをケースにできる",
      imgPath: "/common/illust.png",
      width: "220",
      height: "120",
    },
  ];

  return (
    <div className={styles.Container}>
      {/* 配列の内容で繰り返し表示 */}
      {CARD_ITEM.map((item, index) => (
        <motion.div
          {...bound}
          transition={{ ...bound.transition, delay: index / 5 }}
          whileTap={{ scale: 0.6 }}
          key={index}
        >
          <div className={styles.ContainerInside}>
            <Link key={item.href} href={item.href}>
              <a className={styles.cards}>
                <figure className={styles.cardImg}>
                  <Image
                    src={item.imgPath}
                    alt={item.name}
                    width={item.width}
                    height={item.height}
                    objectFit={"cover"}
                  />
                </figure>
                <div className={styles.content}>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              </a>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Service_cards;
