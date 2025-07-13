import styled from "styled-components"


import CantLoad from "../../assets/loadPic.png"
import { FormattedPrice } from "../../utils/FormatPrice"
import { useEffect } from "react"
const ProductImg = styled.img`
    width: 10%;
    object-fit: cover;
    object-position: center;

    aspect-ratio: 1 / 1;
    
    
`


const OrderCardBody = styled.div`
    cursor:pointer;
    padding-block:1rem;
    border-top:1px solid rgba(0, 0, 0, .09);;
    border-bottom:1px solid rgba(0, 0, 0, .09);;
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:1rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
        padding-block:0.5rem;
        gap:0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding-block:0.7rem;
        gap:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding-block:0.8rem;
        gap:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding-block:0.9rem;
        gap:0.9rem;

    }

`

const OrderCardName = styled.div`
    font-size:1.1rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.7rem;

    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.8rem;

    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.9rem;

    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1rem;
    }

`

const OrderCardVariant = styled.div`
    font-size:0.9rem;
    color:rgba(0, 0, 0, .54);

    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.6rem;

    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.7rem;

    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.8rem;

    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 0.9rem;
    }

`

const OrderCardQuantity= styled.div`
    font-size:0.8rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.5rem;

    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.5rem;

    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.6rem;

    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 0.7rem;
    }

`

const VariantTitle = (variants,type) =>{
    

    if(type==="Product"){
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
    else{
        return <span>Màu: {variants}</span>
    }
        
}

export default function ProductCard ({productItem}){
   
    return(
        <OrderCardBody >
        
                            <ProductImg src={productItem?.productItem?.image[0]?? CantLoad}/>
                            
        
                            <div>
                                <OrderCardName>
                                    {productItem?.productItem?.name}
                                </OrderCardName>
        
                                <OrderCardVariant> 
                                    <div>
                                    {
                                        productItem.itemType=="Product"?
                                        VariantTitle(productItem?.productItem?.variants,productItem.itemType)
                                        :
                                        VariantTitle(productItem?.productItem?.color,productItem.itemType)
                                    
                                    }
                                    </div>
                                    
                                    </OrderCardVariant>
                                <OrderCardQuantity>Đơn giá: {FormattedPrice(productItem?.price)}</OrderCardQuantity>
                                <OrderCardQuantity>x{productItem?.quantity}</OrderCardQuantity>
                            </div>
        </OrderCardBody>

    )
}

