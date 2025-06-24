import styled from "styled-components"
import MainMenu from "../components/MainMenu"
import StatusBar from "../components/OrderInfo/StatusBar"
import { useGetOrder } from "../services/hook/InfoHook"
import { useEffect } from "react"
import MinitabMenu from "../components/InfoPage/MiniTabMenu"
import AddressInfo from "../components/OrderInfo/AddressInfo"
import StatusHistory from "../components/OrderInfo/StatusHistory"
import OrderItemCard from "../components/OrderInfo/OrderItemCard"
import OrderTotal from "../components/OrderInfo/OrderTotal"
const DetailOrderInfoPageContainer = styled.div`
    width: 80%;
    margin:auto;
    

`

const DetailInfoPageSubContainer = styled.div`
    
    display:flex;
    flex-direction:row;
    gap:1rem;

`
const ContentContainer =styled.div`

    background-color: #f5f5f5;
    width:100%;
    display:flex;
    flex-direction: column;
`

const InfoContainer = styled.div`
    display:flex;
    flex-direction:row;
    gap:1rem;
`
const InfoOrderContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:1rem;
`
const OrderContainer = styled.div`
        width:100%;
     display:flex;
     flex-direction:column;
     gap:1rem;

`

export default function DetailOrderInfoPage(){
    const {data:orderInfo} = useGetOrder()
    
    
    return(
        <>
        <MainMenu></MainMenu>
        <DetailOrderInfoPageContainer>
            <DetailInfoPageSubContainer>

                <MinitabMenu></MinitabMenu>
                
                <ContentContainer>
                    <StatusBar></StatusBar>

                    <InfoContainer>
                        <AddressInfo></AddressInfo>
                        <StatusHistory></StatusHistory>
                    </InfoContainer>

                    <InfoOrderContainer>
                        <OrderContainer>
                        {/* <OrderItemCard>

                        </OrderItemCard> */}
                        </OrderContainer>

                        <OrderTotal>
                            
                        </OrderTotal>
                    </InfoOrderContainer>

                </ContentContainer>
                
                
            
            </DetailInfoPageSubContainer>
        
        </DetailOrderInfoPageContainer>
        </>
    )


}
