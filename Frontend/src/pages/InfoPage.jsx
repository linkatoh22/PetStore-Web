import styled from "styled-components"
import MainMenu from "../components/MainMenu"
import MinitabMenu from "../components/InfoPage/MiniTabMenu"
import OrderInfo from "../components/InfoPage/OrderInfo"
import { useGetOrder } from "../services/hook/InfoHook"
import { useEffect } from "react"
const InfoPageContainer = styled.div`
    width: 90%;
    margin:auto;

`

const InfoPageSubContainer = styled.div`
    display:flex;
    flex-direction:row;
    gap:1rem;

`
export default function InfoPage(){
    const {data:orderInfo} = useGetOrder()

    
    return(
        <>
        <MainMenu></MainMenu>
        <InfoPageContainer>
            <InfoPageSubContainer>

                <MinitabMenu></MinitabMenu>

                <OrderInfo orders={orderInfo?.infoOrders}></OrderInfo>

            </InfoPageSubContainer>
        
        </InfoPageContainer>
        </>
    )


}
