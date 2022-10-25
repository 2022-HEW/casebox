// Linkタグのhref属性は要変更
// slick入れる

import styles from '../styles/service_select.module.css'

import CardsTemplate from '../components/CardsTemplate'
import CardsOriginal from '../components/CardsOriginal'
import CardsCreated from '../components/CardsCreated'

// import SlideShow from '../components/SlideShow';

const Service = () => {

    return(
        
        <div id={styles.wrap}>
        {/* <Nav/> */}
        {/* <Box/> */}
            <div id={styles.cardbox}>
                <div className={styles.card}>
                    <CardsTemplate />
                </div>

                <div className={styles.card}>
                    <CardsOriginal/>
                </div>

                <div className={styles.card}>
                    <CardsCreated/>
                </div>
            </div>
        </div>
    )
}

export default Service;