import React, { useEffect } from 'react'
import useSWR from 'swr';
import Box from '../components/common/Box'
import Nav from '../components/common/Nav'
import { useRecoilValue } from 'recoil';
import { productState } from '../atoms/atoms';



const Thankyou = () => {
    // dataを持っていないとき遷移させる
    // if(){

    // }

    const { m_product_price,product_ID,model_id } = useRecoilValue(productState)
    // console.log(product_ID)
    const InsertDB = async()=>{    
        await fetch(`/api/Sql?sql=complete&&price=${m_product_price}&&productID=${product_ID}&&modelID=${model_id}`)
        .then((res)=>{return res.json()})
        .then((data)=>{console.log(data);
        })
    }
    useEffect(()=>{
        InsertDB()
    },[])
    
    
    return (
        <Box>
            <Nav>
                <div>
                    <h1>Thank you!</h1>
                    <p>印刷中です。しばらくお待ち下さい</p>
                    <p>Printing now.Please wait a moment.</p>
                </div>
            </Nav>-
        </Box>
    )
}

export default Thankyou