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

`

const InfoPageSubContainer = styled.div`
    display:flex;
    flex-direction:row;
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

export default function InfoPage(){
    const {data:orderInfo, isLoading: isLoadingOrder} = useGetOrder()

    
    return(
        <>
        <MainMenu></MainMenu>
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
