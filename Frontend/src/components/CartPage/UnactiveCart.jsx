// import "../../styles/components/CartProduct.css"
import { useContext, useEffect, useState } from 'react';


import CantLoad from "../../assets/loadPic.png"

import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import { FormattedPrice } from '../../utils/FormatPrice';
import { FaThumbsUp } from 'react-icons/fa';
import { useDeleteCartItem,useEditCartItem } from '../../services/hook/CartHook';
import { AuthContext } from '../../context/AuthProvider';
import { useMemo } from 'react';
import Spinner from 'react-bootstrap/Spinner';
const CartTableContainer = styled.div`
  width: 100%;
  display:flex;
  flex-direction:column;
  gap:1rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
        gap:0.6rem;
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
  
  
 
`;
const CartTitleContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:2.2rem;
    font-weight:bold;

    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size:0.9rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size:1.3rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size:1.5rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size:1.8rem;
    }

    
`
const LineDivider = styled.div`
    width:100%;
    border:1px solid var(--grey-200);
`
const CartTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.3rem; 
     font-size:1.2rem;
    
    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size:0.47rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size:0.6rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size:0.7rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size:0.9rem;
    }

  
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
    @media (min-width: 0px) and (max-width: 598.99px) {
        gap:0.6rem;
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
    width:20%;
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
    
    // overflow-y:auto;
    // overflow-x: hidden;
`

const DeleteOption = styled.div`
    font-weight:bold;
    cursor:pointer;
    padding:0.3rem;
    disable:true;
    border-radius:20px;
    &:hover{
        background-color:#dae5ec;
        color:var(--main-blue)
    }

`


const QuantityContainer = styled.div`

    display:flex;
    flex-direction:row;
    
    align-items:center;
    gap:1rem;
    font-size:1.1rem
    
`

const QuantityBtn = styled.button`
    
    padding:0.2rem;
    padding-inline:0.6rem;
    background-color:white;
    &:focus{
        outline:none;
    }
   

    @media (min-width: 0px) and (max-width: 598.99px) {
          padding:0.1rem;
        
          padding-inline:0.1rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          padding:0.2rem;
          padding-inline:0.4rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding:0.2rem;
        padding-inline:0.5rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding:0.2rem;
        padding-inline:0.5rem;

    }
    

`
const QuantityInput = styled.input`
    width:25%;
    text-align:center;
    padding:0.2rem;
    border:1px solid var(--grey-600)
    &:focus{
        outline:none;
    }

    @media (min-width: 0px) and (max-width: 598.99px) {
          padding:0.1rem;
          
          padding-inline:0.1rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          padding:0.2rem;
          
          padding-inline:0.4rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding:0.2rem;
        padding-inline:0.5rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding:0.2rem;
        padding-inline:0.5rem;

    }
    
`

const StatusDiv = styled.div`
    background-color:var(--grey-500);
    color:white;
    text-align:center;
    padding-block:0.3rem;
    border-radius:10px;
`
const SpinnerContainer = styled.div`
    display:flex;
    width:100%;
    align-items:center;
    justify-content:center;
    height:200px;
    font-size:1.3rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
        height:80px;
        font-size:0.7rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        height:100px;
        font-size:0.8rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        height:120px;
       font-size:0.9rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        height:150px;
        font-size:1.1rem;
    }

`

const NoItem = styled.div`
    height:200px;
    
    display:flex;
    align-items:center;
    justify-content:center;
    text-align: center;
    
    color: var(--grey-500);

    @media (min-width: 0px) and (max-width: 598.99px) {
        height:80px;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        height:100px;
        
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        height:120px;
        
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        height:150px;
        
    }

`
function UnactiveCartProduct({cartInfo,updatedUnactiveCart,isLoading}){
    const [Selection,SetSelection] = useState([])
    const {accessToken}  = useContext(AuthContext)
    const {mutate: deleteItem}  = useDeleteCartItem(accessToken);
    const {mutate:updateItem} = useEditCartItem(accessToken)
    const [tempQuantities, setTempQuantities] = useState({});

    
    const HandleDelete = (id)=>{
        
        var ItemId = [];
        ItemId.push(id);
        deleteItem(
            {
                ItemId
            },
            {
                onSuccess:(data)=>{
                        
                         alert("Xóa item trong giỏ hàng thành công!");
                         updatedUnactiveCart();
                    },
                onError:(error)=>{
                        const message =  error.response?.data?.message || error.message;
                        console.log(message);
                    }
            }
        )
    }
   
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
                <CartTitleContainer>
                    <h2 style={{fontWeight:"bold"}}>Danh sách sản phẩm không hoạt động</h2>
                   
                </CartTitleContainer>
                
                <LineDivider></LineDivider>

                <ScrollTable>
                <CartTable className="cartTable">

                    <thead >
                        <tr style={{color:"var(--grey-600)"}}>
                           
                            <th>Trạng thái</th>
                            <th>Chi tiết sản phẩm</th>
                            <th> Số Lượng</th>
                            <th>Giá sản phẩm</th>
                            <th>Tổng tiền</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody >
                        { isLoading? 
                                <tr>
                                    <td colSpan={6}>
                                    <SpinnerContainer>
                                        <Spinner animation="border" variant="info" style={{ width: "4rem", height: "4rem" }} className='mr-2' />
                                    </SpinnerContainer>
                                    </td>
                                </tr>
                            :
                            cartInfo?.items?.length > 0 ? (
                            (cartInfo?.items?.map((item, index)=>{
                                
                                return (<tr key={index}>
                                    
                                    <td >
                                       <StatusDiv>  {item.status} </StatusDiv> 
                                    </td>

                                    <td>
                                        <ProductDetailContainer style={{filter:"grayscale(100%)",color: "#aaa"}} >
                                            <ProductDetailImage src={item?.productItem?.image[0]??CantLoad} ></ProductDetailImage>

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
                                        
                                        <div >
                                            <QuantityBtn disabled={true}
                                            
                                            >-</QuantityBtn>

                                            <QuantityInput disabled={true}
                                                value = {item.quantity}
                                               
                                            ></QuantityInput>

                                            <QuantityBtn 
                                                disabled={true}
                                             >+</QuantityBtn>
                                        </div>

                                       
                                        
                                    </td>

                                    <td style={{ textAlign: "center",verticalAlign: "middle",color: "#aaa"}}  >{FormattedPrice(item.price)}</td>
                                    <td style={{ textAlign: "center",verticalAlign: "middle",color: "#aaa"}}  >
                                            
                                        {FormattedPrice(item.quantity * item.price)}
                                        
                                        
                                    </td>
                                    <td style={{ textAlign: "center",verticalAlign: "middle"}} >
                                        <DeleteOption onClick={()=>HandleDelete(item._id)} >   Xóa </DeleteOption>
                                    </td>
                                
                                </tr>)

                                }))
                            )
                            :
                            <tr>
                                <td colSpan={6}>
                                <NoItem 
                                    // style={{ textAlign: "center", padding: "2rem", color: "var(--grey-500)" }}
                                >
                                    Chưa có sản phẩm nào trong mục không hoạt động
                                </NoItem>
                                </td>
                            </tr>
                        }
                           

                    </tbody>
                    
                </CartTable>
                </ScrollTable>
            </CartTableContainer>

        </>
    )
}

export default UnactiveCartProduct