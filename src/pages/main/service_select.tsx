// Linkタグのhref属性は要変更
// slick入れる
import Box from '../../components/main/common/Box';
import Nav from '../../components/main/common/Nav';
import Service_cards from '../../components/main/service_select/Service_cards';
import SlideShow from '../../components/main/service_select/SlideShow';
import { NextPage } from 'next';


const Service:NextPage = () => {

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