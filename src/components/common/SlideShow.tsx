import React from "react";
import Slider from "react-slick";
import styles from "../../styles/SlideShow.module.css";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";

// Imageの型定義
type imageType={
	imgPath: string,
	imgAlt: string,
}

const SlideShow = () => {

	// slick option
    const settings = {
        // autoplay: true,  	// 自動的に動き出すか。
		infinite: true, 	// スライドをループさせるかどうか。
		speed: 500,			// スライド、フェードアニメーションの速度
		slidesToShow: 1, 	// スライドを画面に見せる枚数
		slidesToScroll: 1,  // 1回のスクロールで1枚の写真を移動して見せる

		// dotsのカスタム
		dots: true,		// 下部ドットナビゲーションの表示
		


		// arrowのカスタム
		arrow: true, 		// 前・次の矢印表示
		prevArrow: <button type="button" className={styles.nextArrow}>前の画像</button>,
		nextArrow: <button type="button" className={styles.nextArrow}>次の画像</button>,
	// 	responsive: [
	// 		{
	// 		breakpoint: 769,//モニターの横幅が769px以下の見せ方
	// 		settings: {
	// 			slidesToShow: 1,//スライドを画面に2枚見せる
	// 			slidesToScroll: 1,//1回のスクロールで2枚の写真を移動して見せる
	// 		}
	// 	},
	// 	{
	// 		breakpoint: 426,//モニターの横幅が426px以下の見せ方
	// 		settings: {
	// 			slidesToShow: 1,
	// 			slidesToScroll: 1,
	// 		}
	// 	}
	// ]
        
    };

// SlideShow表示
    return(
		<>
			<Slider {...settings}>
				<ImgDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
				<ImgDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
				<ImgDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
				<ImgDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
				<ImgDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
				<ImgDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
			</Slider>
		</>
    )
}


const ImgDesc = ({ imgPath, imgAlt }:imageType) => {
	return(
		<div className={styles.imgContainer}>
			<Image className={styles.slideImg} src={imgPath} alt={imgAlt} width={525} height={270} />
		</div>
	)
}

export default SlideShow;