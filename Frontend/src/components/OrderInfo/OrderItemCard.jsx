import styled from "styled-components"
import Detail1 from "../../assets/pic/detail-product/detail1.png"
import ProductCard from "../InfoPage/ProductCard"
import { useEffect } from "react"
const OrderCardContainer = styled.div`
    width:100%;
    
    padding: 20px;
    font-family: sans-serif;
    background-color: #f5f5f5;


`
const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;

`
const Status = styled.div`
    margin-left: auto;

`

export default function OrderItemCard({items}){
    return(
         <OrderCardContainer>
                    
                        
                        {
                            items?.map(item=>{
                                return <ProductCard productItem={item}></ProductCard>
                            })
                        }

        </OrderCardContainer>
    )


}