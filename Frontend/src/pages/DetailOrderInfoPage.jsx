import styled from "styled-components"
import MainMenu from "../components/MainMenu"
import StatusBar from "../components/OrderInfo/StatusBar"
import { useGetOrder,useGetDetailOrderFetch } from "../services/hook/InfoHook"
import { useEffect, useMemo } from "react"
import MinitabMenu from "../components/InfoPage/MiniTabMenu"
import AddressInfo from "../components/OrderInfo/AddressInfo"
import StatusHistory from "../components/OrderInfo/StatusHistory"
import OrderItemCard from "../components/OrderInfo/OrderItemCard"
import OrderTotal from "../components/OrderInfo/OrderTotal"
import { useParams } from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner';
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
    padding-block:1.5rem;
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

const SpinnerContainer = styled.div`
    display:flex;
    width:100%;
    align-items:center;
    justify-content:center;
    height:200px;
    font-size:1.3rem;

`

export default function DetailOrderInfoPage(){
    const {id} = useParams();
    const {data:orderInfo,isLoading:isLoadingOrder} = useGetDetailOrderFetch(id)
    const InfoOrder = useMemo(()=>{
        if(orderInfo?.infoOrders){
            return orderInfo.infoOrders
        }
        return []
    },[orderInfo])

    useEffect(()=>{
        console.log("InfoOrder: ",InfoOrder)
    },[InfoOrder])

    
    
    return(
        <>
        <MainMenu></MainMenu>
        <DetailOrderInfoPageContainer>
            <DetailInfoPageSubContainer>

                <MinitabMenu></MinitabMenu>
                
                {isLoadingOrder?
                        <SpinnerContainer>
                            <Spinner animation="border" variant="info" style={{ width: "4rem", height: "4rem" }} className='mr-2' />
                        </SpinnerContainer>
                                    :
                        (
                            <ContentContainer>
                   
                                <StatusBar statusHistory={InfoOrder?.statusHistory} status={InfoOrder?.status} />

                                <InfoContainer >
                                    <AddressInfo shippingInfo={InfoOrder?.shippingInfo}/>
                                    <StatusHistory statusHistory={InfoOrder?.statusHistory}/>
                                </InfoContainer>
                                            
                                

                                <InfoOrderContainer>
                                    
                                            <OrderContainer>
                                                <OrderItemCard items={InfoOrder?.items}/>
                                            </OrderContainer>

                                            <OrderTotal order={InfoOrder} />
                                        
                                    
                                </InfoOrderContainer >

                            </ContentContainer>
                        ) 
                                    
                }
                
                
                
            
            </DetailInfoPageSubContainer>
        
        </DetailOrderInfoPageContainer>
        </>
    )


}
