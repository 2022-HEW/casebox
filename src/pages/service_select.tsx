// Linkタグのhref属性は要変更
// slick入れる
import styles from '../styles/service_select.module.css'
import Box from '../components/common/Box';
import Nav from '../components/common/Nav';
import Service_cards from '../components/Service_cards';
import SlideShow from '../components/common/SlideShow';
import { useRecoilState } from "recoil";
import { tabState } from '../atoms/atoms';


const Service = () => {

    return(
        <>
            <Box>
                <Nav >
                    <SlideShow/>
                    <Service_cards/>
                </Nav>
            </Box>
        </>
    )
}

export default Service;