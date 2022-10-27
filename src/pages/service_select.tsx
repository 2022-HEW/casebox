// Linkタグのhref属性は要変更
// slick入れる

import styles from '../styles/service_select.module.css'
import Box from '../components/Box';
import Nav from '../components/Nav';
import Service_cards from '../components/Service_cards';
// import CardsTemplate from '../components/CardsTemplate'
// import CardsOriginal from '../components/CardsOriginal'
// import CardsCreated from '../components/CardsCreated'

// import SlideShow from '../components/SlideShow';

const Service = () => {

    return(
        <>
            <Box>
                <Nav/>
                <Service_cards/>
            </Box>
        </>
    )
}

export default Service;