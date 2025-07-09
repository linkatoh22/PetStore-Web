import MainMenu from "../components/MainMenu";
import Footer from "../components/Footer";
import CheckoutInput from "../components/CheckoutPage/CheckoutInput";

import styled from "styled-components";
import CheckoutProductTable from "../components/CheckoutPage/CheckoutProduct";
import { useEffect } from "react";

const CheckoutPageContainer = styled.div`
  width: 80%;
  margin: auto;
  padding-block:5.5rem;
  
    @media (min-width: 0px) and (max-width: 598.99px) {
        padding-block:5rem;
        width:98%;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding-block:5.5rem;
          width:90%;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding-block:5.5rem;
        width:85%;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding-block:5.5rem;
        width:80%;
    }
`;

const CheckoutInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
  
        gap:0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       
          gap:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
    
        gap:0.9rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
  
        gap:1.1rem;

    }

  
`;



function CheckoutPage(){
    const CheckoutProduct =JSON.parse(localStorage.getItem("cartItems")) 
    useEffect(()=>{
        console.log("CheckoutProduct: ",CheckoutProduct)
    },[CheckoutProduct])
    return(
        <>
            
            <CheckoutPageContainer className="CheckoutPage-Container">
                <CheckoutInfo className="Checkout-Info">

                    <CheckoutInput cartInfo={CheckoutProduct}></CheckoutInput>
                    <CheckoutProductTable cartInfo={CheckoutProduct}></CheckoutProductTable>

                </CheckoutInfo>

            </CheckoutPageContainer>
            
            
        </>
    )
}

export default CheckoutPage;