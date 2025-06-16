// import "../styles/components/CartBill.css"
import styled from "styled-components";
import { FormattedPrice } from "../../utils/FormatPrice";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteCartItem } from "../../services/hook/CartHook";
import { AuthContext } from "../../context/AuthProvider";


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
  
`;


const BillInfo = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
   justify-content:space-between;
   
`;

const CartBillTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  gap: 2rem;
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
`;

const BtnOption = styled.div`

  font-weight:bold;
    cursor:pointer;
    padding:7px;
    
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
        alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán")
      }
    }
    const ShippingFee = 30000;
    const [TotalPrice,SetTotalPrice] = useState(0);
    const {accessToken} = useContext(AuthContext);
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

                  alert("Xóa Item thành công")
                  updatedCart();
                },
                onError:(error)=>{
                  const message =  error.response?.data?.message || error.message;
                  alert(`Lỗi: ${message}`)
                }
              }
            )
        }
        else{
          alert("Vui lòng chọn item")
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
                  alert("Xóa Item Unactive thành công")
                  updatedUnactiveCart();
                },
                onError:(error)=>{
                  const message =  error.response?.data?.message || error.message;
                  alert(`Lỗi: ${message}`)
                }
              }
            )
        }
        else{
          alert("Vui lòng chọn item")
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