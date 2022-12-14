import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import styles from "../../styles/slideShow.module.css";


import Image from "next/image";


// Imageの型定義
type imageType={
	imgPath: string,
	imgAlt: string,
}

const PrevArrow = ({onClick}: any)  => {
	return (
		<div className={styles.prevContainer} onClick={onClick}>
			<button className={styles.prevBtn}>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	);
}

const NextArrow = ({onClick}: any) => {
	return (
		<div className={styles.nextContainer} onClick={onClick}>
			<button className={styles.nextBtn}>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	);
}

const SlideShow = () => {

	// slick option
    const Settings = {
        // autoplay: true,  	// 自動的に動き出すか。
		infinite: true, 	// スライドをループさせるかどうか。
		speed: 500,			// スライド、フェードアニメーションの速度
		slidesToShow: 1, 	// スライドを画面に見せる枚数
		slidesToScroll: 1,  // 1回のスクロールで1枚の写真を移動して見せる

		// dotsのカスタム
		dots: false,		// 下部ドットナビゲーションの表示
		// dotsClass: "dots", // ドットにクラス付与

		// arrowのカスタム
		arrow: true, 		// 前・次の矢印表示
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />
    };


// SlideShow表示
    return(
		<>
			<div id={styles.SliderContainer}>
				<Slider {...Settings}>
					<ImgDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
					<ImgDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
					<ImgDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
					<ImgDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
					<ImgDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
					<ImgDesc imgPath={"/image/strap.svg"} imgAlt={"スマホストラップ"}/>
				</Slider>
			</div>
		</>
    )
}


const ImgDesc = ({ imgPath, imgAlt }:imageType) => {
	return(
		<figure className={styles.imgContainer}>
			<Image className={styles.slideImg} src={imgPath} alt={imgAlt} width={500} height={240}/>
		</figure>
	)
}

export default SlideShow;