// import "../../styles/components/CartProduct.css"
import { useContext, useEffect, useState } from 'react';
import detail4 from '../../assets/pic/detail-product/detail4.png';
import detail5 from '../../assets/pic/detail-product/detail5.png';
import detail6 from '../../assets/pic/detail-product/detail6.png';
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import { FormattedPrice } from '../../utils/FormatPrice';
import { FaThumbsUp } from 'react-icons/fa';
import { useDeleteCartItem,useEditCartItem } from '../../services/hook/CartHook';
import { AuthContext } from '../../context/AuthProvider';
import { useMemo } from 'react';
import TotalPrice from './TotalPrice';
const CartTableContainer = styled.div`
  width: 50%;
  display:flex;
  flex-direction:column;
  gap:1rem;
  font-size:1.1rem;
  
  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size:0.5rem;
        gap:0.2rem;
        width: 55%;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
            font-size:0.8rem;
          gap:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size:0.9rem;
        gap:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size:1rem;
        gap:0.9rem;

    }
 
`;


const CartTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0.5   rem;
  
  th {
    background-color:white;
    text-align: center;
    vertical-align: middle;
    position:sticky;
    top:0;
  }

  td:first-child,
  th:first-child {
    padding-right: 0.5rem;
  }
  
`;

const ProductDetailContainer = styled.div`
    display:flex;
    flex-direction:row;
    gap:1rem;
    align-items:center;
     @media (min-width: 0px) and (max-width: 598.99px) {
     
        gap:0.2rem;
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

const ProductDetailImage = styled.img`
        width:30%;
        aspect-ratio: 1 / 1;
        object-fit:cover;
        object-position:center;

     
`

const ProductDetailParagraph = styled.div`
    justify-content:center;
    display:flex;
    flex-direction:column;
    gap:0.2rem;

`

const ScrollTable = styled.div`
    width:100%;
    
    overflow:auto;
`

function CheckoutProductTable({cartInfo}){
    const [shippingFee, setShippingFee] = useState(30000)

    useEffect(()=>{
        console.log("cartInfo: ",cartInfo)
    },[cartInfo])
    const totalPriceValue  = useMemo(()=>{
        if(cartInfo?.length>0){
            var sum=0;
            cartInfo.map((item)=>{
                sum = sum +(item.price *item.quantity)
            })
            if (sum>=300000) setShippingFee(0)
                else setShippingFee(30000)
            return sum;
        }
        return []
    },[cartInfo])
    

    useEffect(()=>{
        if(cartInfo?.items){
            const QuantityIn ={};
            cartInfo.items.map((item)=>{
                QuantityIn[item._id] = item.quantity;

            })
            setTempQuantities(QuantityIn)   
        }
    },[cartInfo])
    
    const VariantTitle = (variants) =>{
        if (!Array.isArray(variants) || variants.length === 0) return null;

    const variant = variants[0]; // giả sử chỉ hiển thị variant đầu tiên
    const details = [];

    if (variant.size) details.push(`Kích thước: ${variant.size}`);
    if (variant.color) details.push(`Màu: ${variant.color}`);
    if (variant.weight) details.push(`Cân nặng: ${variant.weight}`);

    return (
        <span>
            {details.map((detail, index) => (
                <span key={index}>
                    {index > 0 && <span style={{ margin: '0 0.5rem' }}>•</span>}
                    {detail}
                </span>
            ))}
        </span>
    );
        

    }
    
   
    return(
        <>
            <CartTableContainer className="cartTable-container">
                
                
                

                <ScrollTable>

                <CartTable className="cartTable">

                    <thead >
                        <tr style={{color:"var(--grey-600)"}}>
                        

                            <th>Chi tiết sản phẩm</th>
                            <th> Số Lượng</th>
                            <th>Giá</th>
                            <th>Tổng tiền</th>
                           
                        </tr>
                    </thead>

                    <tbody >
                        
                            {cartInfo?.map((item, index)=>{
                                
                                return (<tr key={index}>
                                    
                                    

                                    <td>
                                        <ProductDetailContainer>
                                            <ProductDetailImage src={item?.productItem?.image[0]??detail4} ></ProductDetailImage>

                                            <ProductDetailParagraph>
                                                
                                               
                                                <div style={{fontStyle:"italic"}}>
                                                     {item?.productItem?.brand ?? `#${item?.productItem?.sku}`}
                                                    
                                                </div>
                                                <div style={{fontWeight:"bold"}}>{item?.productItem?.name}</div>
                                                <div>
                                                    {VariantTitle(item?.productItem?.variants)}
                                                </div>

                                            </ProductDetailParagraph>
                                        </ProductDetailContainer>
                                    </td>

                                    <td style={{ textAlign: "center",verticalAlign: "middle"}} >
                                        
                                        {item.quantity}

                                       
                                        
                                    </td>

                                    <td style={{ textAlign: "center",verticalAlign: "middle"}} >{FormattedPrice(item.price)}</td>
                                    <td style={{ textAlign: "center",verticalAlign: "middle"}}  >
                                            
                                        {FormattedPrice(item.quantity * item.price)}
                                        
                                        
                                    </td>
                                    
                                
                                </tr>)

                            })}

                    </tbody>
                    
                </CartTable>

                </ScrollTable>
                
                <TotalPrice totalPrice={totalPriceValue} shippingFee={shippingFee}></TotalPrice>

            </CartTableContainer>

        </>
    )
}

export default CheckoutProductTable