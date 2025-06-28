import styled from "styled-components"
import Detail1 from "../../assets/pic/detail-product/detail1.png"
import { FormattedPrice } from "../../utils/FormatPrice"
import { useEffect } from "react"
const ProductImg = styled.img`
    width:100px;
    height:100px;
    object-fit: cover;
    object-position: center;
`


const OrderCardBody = styled.div`
    cursor:pointer;
    padding-block:1rem;
    border-top:1px solid rgba(0, 0, 0, .09);;
    border-bottom:1px solid rgba(0, 0, 0, .09);;
    display:flex;
    flex-direction:row;
    gap:1rem;

`

const OrderCardName = styled.div`
    font-size:1.1rem;

`

const OrderCardVariant = styled.div`
    font-size:0.9rem;
    color:rgba(0, 0, 0, .54);

`

const OrderCardQuantity= styled.div`
    font-size:0.8rem;

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
        
                            <ProductImg src={productItem?.productItem?.image[0]?? Detail1}/>
                            
        
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

