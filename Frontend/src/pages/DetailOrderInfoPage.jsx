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
    padding-block:5.5rem;
    @media (min-width: 0px) and (max-width: 598.99px) {
        padding-block:4.5rem;
        width:95%;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding-block:4.3rem; 
            width:90%;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding-block:4.6rem;
        width:90%;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding-block:5.3rem;
        width:80%;
    }

    

`

const DetailInfoPageSubContainer = styled.div`
    
    display:flex;
    flex-direction:row;
    gap:1rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
  
        gap:0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       
          gap:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
    
        gap:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
  
        gap:0.9rem;

    }

`
const ContentContainer =styled.div`
    padding-block:1.5rem;
    background-color: #f5f5f5;
    width:100%;
    display:flex;
    flex-direction: column;

    
    @media (min-width: 0px) and (max-width: 598.99px) {
  
        padding-block:0.7rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       
        padding-block:0.9rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
    
       padding-block:1.1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
  
        padding-block:1.3rem;

    }
`

const InfoContainer = styled.div`
    display:flex;
    flex-direction:row;
    gap:1rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
  
        gap:0.1rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       
          gap:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
    
        gap:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
  
        gap:0.9rem;

    }
`
const InfoOrderContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:1rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
  
        gap:0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       
          gap:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
    
        gap:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
  
        gap:0.9rem;

    }
`
const OrderContainer = styled.div`
        width:100%;
     display:flex;
     flex-direction:column;
     gap:1rem;
     @media (min-width: 0px) and (max-width: 598.99px) {
  
        gap:0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       
          gap:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
    
        gap:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
  
        gap:0.9rem;

    }

`

const SpinnerContainer = styled.div`
    display:flex;
    width:100%;
    align-items:center;
    justify-content:center;
    height:200px;
    font-size:1.3rem;
    .mr-2{
        width: 4rem;
         height: 4rem;

        @media (min-width: 0px) and (max-width: 598.99px) {
            width: 2rem;
            height: 2rem;
        }
        @media (min-width: 599px) and (max-width: 799.99px) {
            width: 2rem;
            height: 2rem;
        }
        @media (min-width: 800px) and (max-width: 1199.98px) {
            width: 3rem;
            height:3rem;
        }
        @media (min-width: 1200px) and (max-width: 1500px) {
            width: 3rem;
            height:3rem;
        }
    
    }
    @media (min-width: 0px) and (max-width: 598.99px) {
        height:100px;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        height:100px;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        height:200px;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        height:200px;
    }
    

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

    
    
    
    return(
        <>
        
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
