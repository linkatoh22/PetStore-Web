// import "../styles/components/CartBill.css"
import styled from "styled-components";
import { FormattedPrice } from "../../utils/FormatPrice";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteCartItem } from "../../services/hook/CartHook";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const CartBillItem = styled.div`
  width: 100%;
  border-radius: 5px;
  background-color: #f5f7fa;

  padding-inline: 2rem;
  padding-block: 1.8rem;
  
  display: flex;
  flex-direction: column;
  position:sticky;
  bottom:0;

  @media (min-width: 0px) and (max-width: 598.99px) {
        padding-inline: 0rem;
        padding-block: 0.4rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding-inline: 0rem;
        padding-block: 0.9rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
       padding-inline: 1.4rem;
        padding-block: 1.2rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding-inline: 1.7rem;
        padding-block: 1.5rem;
    }
  
`;


const BillInfo = styled.div`
  font-size: 1.2rem;
  gap: 1.2rem;
  display: flex;
  flex-direction: row;
  
   justify-content:space-between;
   
   @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.5rem;
        gap: 0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.9rem;
        gap: 0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
       font-size: 1rem;
        gap: 0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1.1rem;
        gap: 1rem;
    }
`;

const CartBillTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  gap: 2rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
        gap: 0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        
        gap: 0.1rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
      
        gap: 1.4rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
       
        gap: 1.7rem;
    }
`;

const CheckoutBtn = styled.button`
  cursor: pointer;
  background-color: var(--clr-dark-blue);
  color: white;
  font-size: var(--fs-m);
  border: none;

  padding-block: 0.5rem;
  padding-inline: 2rem;
  
  border-radius: 5px;

  &:active {
    background-color: #005897;
  }


  @media (min-width: 0px) and (max-width: 598.99px) {
        padding-block: 0.2rem;
        padding-inline: 0.7rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding-block: 0.3rem;
        padding-inline: 1.1rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
      padding-block: 0.4rem;
        padding-inline: 1.4rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
       
       padding-block: 0.5rem;
        padding-inline: 1.7rem;
    }
`;

const BtnOption = styled.div`

  font-weight:bold;
    cursor:pointer;
    padding:0.2rem;
    
    border-radius:10px;
    &:hover{
        background-color:#dae5ec;
        color:var(--main-blue)
    }

`
function CartBill({cartItemChosen,cartItemUnactive,updatedCart,updatedUnactiveCart}){
    const navigate = useNavigate();
    const handleNavCheckout = ()=>{
      if(cartItemChosen.length>0){
          localStorage.setItem("cartItems", JSON.stringify(cartItemChosen))
          navigate("/checkout")
      }
      else{
        toast.warning("Vui lòng chọn ít nhất một sản phẩm để thanh toán")
      }
    }
    const [TotalPrice,SetTotalPrice] = useState(0);
    
    const {mutate:deleteItem} = useDeleteCartItem();

    const handleDeleteOption = () =>{
        
        if(cartItemChosen.length>0){
            const ItemId  = cartItemChosen.map(item=>item._id);
            deleteItem(
              {
                ItemId
              },
              {
                onSuccess:(data)=>{

                  toast.success("Xóa Item thành công")
                  updatedCart();
                },
                onError:(error)=>{
                  toast.error("Lỗi đặt đơn hàng: " + error.message);
                }
              }
            )
        }
        else{
          toast.warning("Vui lòng chọn item")
        }
        
    }

    const handleDeleteUnactive = () =>{
        
        if(cartItemUnactive.length>0){
            const ItemId  = cartItemUnactive.map(item=>item._id);
            console.log(ItemId);
            deleteItem(
              {
                ItemId
              },
              {
                onSuccess:(data)=>{
                  toast.success("Xóa sản phẩm không hoạt động thành công")
                  updatedUnactiveCart();
                },
                onError:(error)=>{
                  toast.error("Lỗi đặt đơn hàng: " + error.message);
                }
              }
            )
        }
        else{
          toast.warning("Vui lòng chọn item")
        }
        
    }


    useEffect(()=>{
      var CalcTotalPrice = 0;
      cartItemChosen.map((item)=>{
          CalcTotalPrice += (item.quantity*item.price)
      })

      SetTotalPrice(CalcTotalPrice);

    },[cartItemChosen])
    
    return(
        <>
            
                <CartBillItem className="cartBill">


                    <BillInfo className="Bill-Info">
                      
                        <CartBillTitleContainer className="cartBill-title-contaniner">

                            <BtnOption onClick={()=>handleDeleteOption()} >Xóa</BtnOption>

                            <BtnOption onClick={()=>handleDeleteUnactive()}>Bỏ sản phẩm không hoạt động</BtnOption>

                            
                        </CartBillTitleContainer>


                        


                        
                        <CartBillTitleContainer className="cartBill-title-contaniner">

                            <div className="cartBill-Title" style={{fontWeight:"bold"}}>Tổng cộng ({cartItemChosen.length} sản phẩm):</div>

                            <div className="cartBill-Value">{FormattedPrice(TotalPrice)}</div>

                            <CheckoutBtn  className="checkout-btn" onClick={()=>handleNavCheckout()}>Thanh toán</CheckoutBtn>

                        </CartBillTitleContainer>

                        


                    </BillInfo>

                    
                </CartBillItem>
          
            
        </>
    )
}

export default CartBill