import React from "react";
import Slider from "react-slick";

import styles from "../styles/SlideShow.module.css";

const SlideShow = () => {
    const settings = {
        autoplay: true, //自動的に動き出すか。初期値はfalse。
        infinite: true, //スライドをループさせるかどうか。初期値はtrue。
        slidesToShow: 1,//スライドを画面に3枚見せる
		slidesToScroll: 1,//1回のスクロールで3枚の写真を移動して見せる
		// prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
		// nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
		dots: true,//下部ドットナビゲーションの表示

		responsive: [
			{
			breakpoint: 769,//モニターの横幅が769px以下の見せ方
			settings: {
				slidesToShow: 1,//スライドを画面に2枚見せる
				slidesToScroll: 1,//1回のスクロールで2枚の写真を移動して見せる
			}
		},
		{
			breakpoint: 426,//モニターの横幅が426px以下の見せ方
			settings: {
				slidesToShow: 1,//スライドを画面に1枚見せる
				slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
			}
		}
	]
        
    };

    return(
        <Slider {...settings}>
            <div id={styles.slideshow}>
                <ul className={styles.slider}>
                    <li><img src="img/service/service_strap.png" alt=""/></li>
                    <li><img src="img/service/service_strap.png" alt=""/></li>
                    <li><img src="img/service/service_strap.png" alt=""/></li>
                    <li><img src="img/service/service_strap.png" alt=""/></li>
                    <li><img src="img/service/service_strap.png" alt=""/></li>
                    <li><img src="img/service/service_strap.png" alt=""/></li>
                </ul>
            </div>
        </Slider>
    )
}

export default SlideShow;