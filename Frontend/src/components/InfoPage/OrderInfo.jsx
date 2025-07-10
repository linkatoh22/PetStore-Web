import { useState } from "react"
import styled from "styled-components"
import OrderCard from "./OrderCard"
import { useMemo,useEffect } from "react"
const OrderInfoContainer = styled.div`

    width:100%;
    display:flex;
    flex-direction:column;
    gap:1.5rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
        gap:0.7rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       gap:0.9rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        gap:1.1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        gap:1.3rem;

    }
`
const HeaderContainer = styled.div`
    background-color: #f5f5f5;
    width:100%;
    display:flex;
    
    
`

const HeaderBtn = styled.div`
    width:100%;
    font-weight:bold;

    padding-inline:0.3rem;
    padding-block:0.5rem;
    
    cursor:pointer;
    text-align:center;

    font-size:1.2rem;
    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size:0.35rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size:0.5rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size:0.6rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size:0.7rem;

    }


    border-bottom:${(props)=>(props.$active? "2px solid var(--main-blue)":"2px solid transparent")};
    color: ${(props)=>(props.$active?"var(--main-blue);":"black")};
    transition: all 0.2s ease-in-out;
    &:hover{
        color: var(--main-blue);
        
    }
    

`
const OrderContainer = styled.div`
        width:100%;
        display:flex;
        flex-direction:column;
        gap:1rem;
        
     @media (min-width: 0px) and (max-width: 598.99px) {
       
        gap:0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
  
          gap:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        
        gap:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
      
        gap:0.9rem;

    }

`

const OrderCardContainer = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    height:40vh;
    background-color: #f5f5f5;
    font-weight:500;
    font-size:2rem;
    


    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.8rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 1.1rem;
        
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 1.3rem;
       
        
    }
  @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1.6rem;
      
    }


`
const HeaderTitle = ["Tất cả","Chờ xác nhận","Xác nhận","Đang vận chuyển","Giao thất bại","Hoàn thành","Đã Hủy"]
export default function OrderInfo({orders,refetchOrder}){
    const [HeaderChosen,SetHeaderChosen] = useState("Tất cả")
    
    const FilterOrders = useMemo(() => {
        if (!orders) return [];

        switch (HeaderChosen) {
            case "Chờ xác nhận":
                return orders.filter(item => item.status === "Đang đợi xác nhận");
            case "Xác nhận":
                return orders.filter(item => item.status === "Xác nhận");
            case "Đang vận chuyển":
                return orders.filter(item => item.status === "Đang vận chuyển");
            case "Giao thất bại":
                return orders.filter(item => item.status === "Giao hàng thất bại");
            case "Hoàn thành":
                return orders.filter(item => item.status === "Giao hàng thành công");
            case "Đã Hủy":
                return orders.filter(item => item.status === "Đã hủy");
            case "Tất cả":
            default:
                return orders;
            }
    }, [orders, HeaderChosen]);

    return(
        <OrderInfoContainer >
        
            <HeaderContainer>
                {
                    HeaderTitle.map((item)=>{
                        return <HeaderBtn 
                        
                        key={item} 
                        $active= {HeaderChosen===item}
                        onClick={()=>SetHeaderChosen(item)}>{item}</HeaderBtn>
                    })
                }
                
            </HeaderContainer>
            
            <OrderContainer>
                {
                    FilterOrders.length >0?
                    <>
                        {   FilterOrders?.map(item=>{
                                return <OrderCard items={item.items} order={item} refetchOrder={refetchOrder}></OrderCard>
                            })}
                    </>
                    :
                    <OrderCardContainer>
                        Không có đơn hàng hiển thị

                    </OrderCardContainer>
                }
                
                

            </OrderContainer>

        
        


        </OrderInfoContainer>
    )
}