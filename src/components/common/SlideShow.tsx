import React from "react";
import Slider from "react-slick";
import styles from "../../styles/SlideShow.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";

// Imageの型定義
type imageType={
	imgPath: string,
	imgAlt: string,
}

const SlideShow = () => {
    const settings = {
        // autoplay: true, //自動的に動き出すか。初期値はfalse。
        // infinite: true, //スライドをループさせるかどうか。初期値はtrue。
        // slidesToShow: 1,//スライドを画面に3枚見せる
		// slidesToScroll: 1,//1回のスクロールで3枚の写真を移動して見せる
		// // prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
		// // nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
		// dots: true,//下部ドットナビゲーションの表示
		// arrow:true,

		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrow: true,
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
	// 			slidesToShow: 1,//スライドを画面に1枚見せる
	// 			slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
	// 		}
	// 	}
	// ]
        
    };

    return(
		<>
			<div id={styles.slider}>
				<Slider {...settings}>
					<ImageDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
					<ImageDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
					<ImageDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
					<ImageDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
					<ImageDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
					<ImageDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
				</Slider>
            </div>
		</>

    )
}

const ImageDesc = ({ imgPath,imgAlt }:imageType) => {
	return(
		<>
			<div className={styles.imgContainer}>
				<Image className={styles.slideImg} src={imgPath} alt={imgAlt}/>
			</div>
		</>
	)
}

export default SlideShow;