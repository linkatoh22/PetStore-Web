import styled from "styled-components"
import MainMenu from "../components/MainMenu"
import MinitabMenu from "../components/InfoPage/MiniTabMenu"
import OrderInfo from "../components/InfoPage/OrderInfo"
import { useGetOrder } from "../services/hook/InfoHook"
import { useEffect } from "react"
import Spinner from 'react-bootstrap/Spinner';

const InfoPageContainer = styled.div`
    width: 90%;
    margin:auto;
    padding-top:5.5rem;
    @media (min-width: 0px) and (max-width: 598.99px) {
        padding-top:4.5rem;
        width:95%;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding-top:4.3rem; 
            width:95%;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding-top:4.6rem;
        width:95%;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding-top:5.3rem;
        width:90%;
    }

`

const InfoPageSubContainer = styled.div`
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

export default function InfoPage(){
    const {data:orderInfo, isLoading: isLoadingOrder} = useGetOrder()

    
    return(
        <>
        
        <InfoPageContainer>
            <InfoPageSubContainer>

                <MinitabMenu></MinitabMenu>
                {   isLoadingOrder? 
                    (
                        <SpinnerContainer>
                            <Spinner animation="border" variant="info" style={{ width: "4rem", height: "4rem" }} className='mr-2' />
                        </SpinnerContainer>
                    )
                    :
                    <OrderInfo orders={orderInfo?.infoOrders}></OrderInfo>
                }
                

            </InfoPageSubContainer>
        
        </InfoPageContainer>
        </>
    )


}
