import MainMenu from "../components/MainMenu";
import Footer from "../components/Footer";
import CheckoutInput from "../components/CheckoutPage/CheckoutInput";
import CartProduct from "../components/CartPage/CartProduct";
import styled from "styled-components";


const CheckoutPageContainer = styled.div`
  width: 80%;
  margin: auto;
`;

const CheckoutInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5rem;
`;

const ImgProduct = styled.img`
  width: 40%;
`;

const ButtonContainer = styled.div`
  width: 30%;
  margin: auto;
`;

const CheckoutBtn = styled.button`
  font-size: 1rem;
  padding: 0.5rem;
`;





function CheckoutPage(){


    return(
        <>
            <CheckoutPageContainer className="CheckoutPage-Container">
                {/* <MainMenu></MainMenu> */}
                <CheckoutInfo className="Checkout-Info">

                    <CheckoutInput></CheckoutInput>
                    <CartProduct></CartProduct>

                </CheckoutInfo>

            </CheckoutPageContainer>
            
            <Footer></Footer>
        </>
    )
}

export default CheckoutPage;