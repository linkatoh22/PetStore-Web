import styled from "styled-components"

import CantLoad from "../../assets/loadPic.png"
import { useContext, useEffect } from "react"
import ProductCard from "./ProductCard"
import { FormattedPrice } from "../../utils/FormatPrice"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthProvider"
import { useCancelOrder } from "../../services/hook/InfoHook.js"
import { toast } from "react-toastify"

const OrderCardContainer = styled.div`
    width:100%;
   
    padding: 1.2rem;
    font-family: sans-serif;
    background-color: #f5f5f5;

    @media (min-width: 0px) and (max-width: 598.99px) {
       
        padding:0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        
       padding:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
       
        padding:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
       
        padding:1rem;

    }


`
const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
        gap:0.2rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       gap:0.3rem;
    }

`
const Status = styled.div`
    margin-left: auto;
    font-size:1.2rem;
    font-weight:bold;
    @media (min-width: 0px) and (max-width: 598.99px) {
       
        font-size:0.7rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        
       font-size:0.8rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
       
        font-size:1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
       
        font-size:1.1rem;

    }

`


const BtnGroup = styled.div`
    margin-left: auto;
    display:flex;
    gap:1rem;
`

const BuyButton = styled.button`
  color: white;
  background-color: var(--clr-dark-blue);
  border: 1px solid #ddd;
  font-size: 1.2rem;
  font-weight:bold;
  border-radius: 4px;
  padding: 0.4rem 3rem;
  cursor: pointer;

  @media (min-width: 0px) and (max-width: 598.99px) {
    font-size: 0.5rem;
    padding: 0.2rem 0.5rem;
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.1rem;
  }
  @media (min-width: 800px) and (max-width: 1199.98px) {
    font-size: 0.8rem;
    padding: 0.3rem 1.5rem;
  }
  @media (min-width: 1200px) and (max-width: 1500px) {
    font-size: 1rem;
    padding: 0.5rem 2rem;
  }

  &:hover {
    background-color: var(--main-blue);
  }

  &:active {
    background-color: #076bb3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    color: #666;
  }
`;



export default function OrderCard({items,order,refetchOrder}){
    const navigate = useNavigate();
    const {mutate: CancelOrderHook} = useCancelOrder();
    const {accessToken} = useContext(AuthContext);
    
    const handleNav = (id)=>{
        if(id){
            window.open(`/info/order/${id}`)
        }
    }
    const handleCancelOrder = (orderId)=>{
        

        CancelOrderHook(
            {
                orderId:orderId
            },
            {
                onSuccess:(data)=>{
                    toast.success(`Đổi trạng thái thành công!`);
                    refetchOrder();
                },
                onError:(error)=>{
                    const message = error.response?.data?.message || error.message;
                    toast.error("Lỗi: " + message);
                }
            }
        )
    }
    return(
        <OrderCardContainer >
            <div onClick={()=>handleNav(order?._id)}>
                <Header >
                    <Status style={{color:"var(--main-blue)"}}>{order.status}</Status>
                </Header>
                {
                    items.map(item=>{
                        return <ProductCard productItem={item}></ProductCard>
                    })
                }
                
                <Header >
                    <Status>Thành tiền: {FormattedPrice(order.totalPrice)}</Status>
                </Header>
                
            </div>
                <Header>
                    <BtnGroup>
                        <BuyButton onClick={()=>handleNav(order?._id)} >Chi tiết </BuyButton>
                        <BuyButton 
                            disabled={order.status.trim() !== "Đang đợi xác nhận"}
                            onClick={()=>handleCancelOrder(order?._id)}>
                                Hủy Đơn 
                        </BuyButton>
                    </BtnGroup>
                </Header>

           
        </OrderCardContainer>
    )

}