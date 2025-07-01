import MainMenu from "../components/MainMenu";
import Footer from "../components/Footer";
import CheckoutInput from "../components/CheckoutPage/CheckoutInput";

import styled from "styled-components";
import CheckoutProductTable from "../components/CheckoutPage/CheckoutProduct";
import { useEffect } from "react";

const CheckoutPageContainer = styled.div`
  width: 80%;
  margin: auto;
  padding-block:1.5rem;
`;

const CheckoutInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5rem;
`;



function CheckoutPage(){
    const CheckoutProduct =JSON.parse(localStorage.getItem("cartItems")) 
    
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