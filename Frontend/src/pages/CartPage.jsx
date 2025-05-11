// import "../styles/pages/CartPage.css"
import MainMenu from "../components/MainMenu";
import Footer from "../components/Footer";
import CartProduct from "../components/CartPage/CartProduct";
import CartBill from "../components/CartPage/CartBill";
import styled from "styled-components";

const CartContainer = styled.div`
     width: 80%;
    margin:auto;
`

const CartProductContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap:1rem;
`
function CartPage(){

    return(
        <>
            <MainMenu></MainMenu>
            <CartContainer className="CartContainer">
                
                

                <CartProductContainer className="CartProductContainer">
                    <CartProduct></CartProduct>

                    <CartBill></CartBill>
                </CartProductContainer>


            </CartContainer>        

            <Footer>

            </Footer>
        </>
    )

}

export default CartPage;