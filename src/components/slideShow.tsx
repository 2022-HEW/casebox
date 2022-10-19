import Slider from "react-slick";

import styles from "../styles/SlideShow.module.css";

const SlideShow = () => {
    const settings = {
        
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