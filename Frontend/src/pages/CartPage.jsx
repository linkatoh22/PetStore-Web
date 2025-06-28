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
`

const CartProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap:1.5rem;
    padding-block:2rem;
    justify-content:space-between;
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
            <MainMenu></MainMenu>
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

            <Footer>

            </Footer>
        </>
    )

}

export default CartPage;