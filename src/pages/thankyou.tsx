import React, { useEffect } from 'react'
import useSWR from 'swr';
import Box from '../components/main/common/Box'
import Nav from '../components/main/common/Nav'
import { useRecoilValue } from 'recoil';
import { productState,stockState } from '../atoms/atoms';
import { NextPage } from 'next';



const Thankyou:NextPage = () => {
    // dataを持っていないとき遷移させる
    // if(){

    // }

    const { m_product_price,product_ID,model_id,quant } = useRecoilValue(productState)
    const stocks = useRecoilValue(stockState)
    console.log(stocks);
    console.log(quant);
    
    const stock = () => {
        let new_stock = 0
        stocks.map((value:any)=>{
            console.log(value);
            if(value.model_id === model_id){
                // 減った在庫分
                 new_stock = value.model_stocks-quant
                }
            })
            return new_stock
    }

    // console.log(product_ID)
    const InsertDB = async()=>{    
        await fetch(`/api/Sql?sql=buy_data&&price=${m_product_price * quant}&&productID=${product_ID}&&modelID=${model_id}&&quant=${quant}`)
        .then((res)=>{return res.json()})
        .then((data)=>{console.log(data);
        })
        
        // 在庫情報を追加
        await fetch(`/api/Sql?sql=update_stock&&modelID=${model_id}&&stock=${stock()}`)
        .then((res)=>{return res.json()})
        .then((data)=>{
            console.log(data);                
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