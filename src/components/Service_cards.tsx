import { ImageType } from '@azure/cognitiveservices-computervision/esm/models/mappers';
import Image from 'next/image'
import Link from "next/link";
import styles from '../styles/service_select.module.css';

const Service_cards = ()=> {
    const CARD_ITEM = [
        {
            href: "/template_select",
            name: "テンプレートケース",
            desc: "もう既にデザインが仕上がっているケース",
            imgPath: '/service_select/template_select.png',
            width:"260",
            height:"120",
            layout: "fill"
        },
        {
            href: "/scan",
            name: "オリジナルケース",
            desc: "写真を自由に入れることができるオリジナルのケース",
            imgPath: '/service_select/original.svg',
            width:"220",
            height:"120",
            layout: "fill"
        },
        {
            href: "/device_select",
            name: "手書きケース",
            desc: "自販機で自分で書いたイラストをケースできる",
            imgPath: '/image/illust.svg',
            width:"220",
            height:"120",
            layout: "fill"
        },
    ]

    return(
        <>
            <div className={styles.Container}>
                {/* 配列の内容で繰り返し表示 */}
                {CARD_ITEM.map(item => {
                    return(
                        <Link key={item.href} href={item.href}>
                            <a className={styles.cards}>
                                <figure className={styles.cardImg}>
                                    <Image src={item.imgPath} alt={item.name} width={item.width} height={item.height} objectFit={"fill"}/>
                                </figure>
                                <div className={styles.content}>
                                    <h3>{item.name}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </a>
                        </Link>
                    );
                })}
            </div>
        </>
    )
}



export default Service_cards;