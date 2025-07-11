// import "../styles/pages/CartPage.css"
import MainMenu from "../components/MainMenu";
import Footer from "../components/Footer";
import CartProduct from "../components/CartPage/CartProduct";
import CartBill from "../components/CartPage/CartBill";
import styled from "styled-components";
import { useGetCart,useGetCartUnactive } from "../services/hook/CartHook";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import UnactiveCartProduct from "../components/CartPage/UnactiveCart";
import { useQueryClient } from "@tanstack/react-query";

const CartContainer = styled.div`
     width: 80%;
    margin:auto;
    padding-block:5.5rem;
    @media (min-width: 0px) and (max-width: 598.99px) {
        padding-block:5rem;
        width:100%;
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
`

const CartProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap:1.5rem;
    justify-content:space-between;

    @media (min-width: 0px) and (max-width: 598.99px) {
        gap: 0.7rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        gap: 0.9rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        gap: 1.1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        gap: 1.3rem;
    }
`
function CartPage(){
    const {accessToken} = useContext(AuthContext)
    const {data:cartItem, isLoading: loadingCartItem} = useGetCart(accessToken);
    const {data:cartItemUnactive,isLoading: loadingCartItemUnactive} = useGetCartUnactive();
    const [selectItem, SetSelectItem] = useState([]);
    const queryClient = useQueryClient();

    const refetchCart = ()=>{
        queryClient.invalidateQueries(['Cart/GetCart']);
    }

    const refetchUnactiveCart = ()=>{
        queryClient.invalidateQueries(['Cart/GetCartUnactive']);
    }
    
    return(
        <>
           
            <CartContainer className="CartContainer">
                
                

                <CartProductContainer className="CartProductContainer">
                    <CartProduct 
                        cartInfo={cartItem?.infoCart} 
                        setProductChosen={SetSelectItem} 
                        productChosen={selectItem} 
                        updatedCart = {refetchCart} 
                        isLoading ={loadingCartItem}
                    ></CartProduct>
                    
                    {cartItemUnactive? <UnactiveCartProduct 
                        cartInfo={cartItemUnactive?.infoCart} 
                        updatedUnactiveCart = {refetchUnactiveCart}
                        isLoading ={loadingCartItemUnactive}
                        ></UnactiveCartProduct> : <></>}
                    
                    <CartBill 
                        cartItemChosen={selectItem} 
                        cartItemUnactive={cartItemUnactive?.infoCart?.items}
                        updatedCart = {refetchCart}
                        updatedUnactiveCart = {refetchUnactiveCart}
                    ></CartBill>
                </CartProductContainer>


            </CartContainer>        

        </>
    )

}

export default CartPage;