import styled from "styled-components"
import Detail1 from "../../assets/pic/detail-product/detail1.png"
import { useContext, useEffect } from "react"
import ProductCard from "./ProductCard"
import { FormattedPrice } from "../../utils/FormatPrice"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthProvider"
import { useAddToCart } from "../../services/hook/DetailHook"
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


const BtnGroup = styled.div`
    margin-left: auto;
    display:flex;
    gap:1rem;
`

const BuyButton = styled.button`
    color:white;
    background-color:var(--main-blue);
    border: 1px solid #ddd;
    font-size:1.1rem;
    border-radius: 4px;
    padding: 5px 2rem;
    cursor: pointer;
`;


export default function OrderCard({items,order}){
    const navigate = useNavigate();
    const {accessToken} = useContext(AuthContext);
    useEffect(()=>{
        console.log(order?._id);
    },[order])
    
    const handleNav = (id)=>{
        if(id){
            window.open(`/info/order/${id}`)
        }
    }
    return(
        <OrderCardContainer onClick={()=>handleNav(order?._id)}>
            
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
                

                <Header>
                    <BtnGroup>
                        <BuyButton>Chi tiết </BuyButton>
                        <BuyButton disabled= { order.status!=="Đang đợi xác nhận" }>Hủy Đơn </BuyButton>
                    </BtnGroup>
                </Header>

           
        </OrderCardContainer>
    )

}