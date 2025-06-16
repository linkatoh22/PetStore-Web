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
const CartTableContainer = styled.div`
  width: 100%;
  display:flex;
  flex-direction:column;
  gap:1rem;
  
 
`;
const CartTitleContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    
`
const LineDivider = styled.div`
    width:100%;
    border:1px solid var(--grey-200);
`
const CartTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1.2rem; 

  
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
`

const ProductDetailImage = styled.img`
    height:150px;
    width:150px;
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
    padding:7px;
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
    
    padding:0.35rem;
    font-size:1.2rem;
    
    background-color:white;
    &:focus{
        outline:none;
    }
    border:1px solid var(--grey-600)

`
const QuantityInput = styled.input`
    width:15%;
    padding-inline:0.12rem;
    padding-block:0.1rem;
    text-align:center;
    font-size:1.4rem;
    border:1px solid var(--grey-600)
    &:focus{
        outline:none;
    }
    
`


function CartProduct({cartInfo,setProductChosen,productChosen,updatedCart}){
    const [Selection,SetSelection] = useState([])
    const {accessToken}  = useContext(AuthContext)
    const {mutate: deleteItem}  = useDeleteCartItem(accessToken);
    const {mutate:updateItem} = useEditCartItem(accessToken)
    const [tempQuantities, setTempQuantities] = useState({});

    useEffect(()=>{
        if(cartInfo?.items){
            const QuantityIn ={};
            cartInfo.items.map((item)=>{
                QuantityIn[item._id] = item.quantity;

            })
            setTempQuantities(QuantityIn)   
        }
    },[cartInfo])
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
                         updatedCart();
                    },
                onError:(error)=>{
                        const message =  error.response?.data?.message || error.message;
                        console.log(message);
                    }
            }
        )
    }
    const HandleQuantity = (amount,ItemId,product)=>{
        console.log("amount: ",amount);

        if(amount > product.variants[0].stock){
            amount = product.variants[0].stock;
            setTempQuantities((prev) => ({
                            ...prev,
                            [ItemId]: amount,
                        }));
            
        }
        
        if(amount){
            updateItem(
                {
                    amount: amount,
                    ItemId: ItemId
                },
                {
                    onSuccess:(data)=>{
                        
                        alert("Chỉnh sửa Item thành công")
                        
                        
                    },
                    onError:(error)=>{
                        const message =  error.response?.data?.message || error.message;
                        console.log(message);
                    }
                }
            )

        }
        

    }
    const HandleQuantityCalc = (amount,ItemId,product)=>{
        
        if(amount > product.variants[0].stock){
            amount = product.stock
        }

        updateItem(
            {
                amount: amount,
                ItemId: ItemId
            },
            {
                onSuccess:()=>{

                    setTempQuantities((prev) => ({
                            ...prev,
                            [ItemId]: amount,
                        }));

                    alert("Chỉnh sửa Item thành công")            
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
    const HandleSelection = (index) =>{
        if(index=="All"){
                if(Selection.length === cartInfo?.items?.length){
                    SetSelection([])
                    setProductChosen([])
                }
                else
                {
                        SetSelection( cartInfo?.items?.map((_,i)=>i))
                        setProductChosen(cartInfo?.items)
                }
        }
        else{
                if( Selection.includes(index) ){
                        SetSelection(   Selection.filter(   item=>item !== index  )   )
                        setProductChosen(  productChosen.filter( item=>item != cartInfo?.items[index]) )
                }
                else{
                        SetSelection([...Selection,index])
                        setProductChosen([...productChosen,cartInfo?.items[index]])
                }
        }

    }
   
    return(
        <>
            <CartTableContainer className="cartTable-container">
                <CartTitleContainer>
                    <h2 style={{fontWeight:"bold"}}>Giỏ hàng</h2>
                    <h3 style={{fontWeight:"bold"}}> {Selection.length} Sản Phẩm </h3>
                </CartTitleContainer>
                
                <LineDivider></LineDivider>

                <ScrollTable>
                <CartTable className="cartTable">

                    <thead >
                        <tr style={{color:"var(--grey-600)"}}>
                            <th>
                                <input type="checkbox" checked={Selection.length === cartInfo?.items?.length} onChange={()=>HandleSelection("All")}></input>
                            </th>

                            <th>Chi tiết sản phẩm</th>
                            <th> Số Lượng</th>
                            <th>Giá sản phẩm</th>
                            <th>Tổng tiền</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody >
                        
                            {cartInfo?.items?.map((item, index)=>{
                                
                                return (<tr key={index}>
                                    
                                    <td >
                                        <input 
                                        
                                        type="checkbox" 
                                        key={index} 
                                        checked={Selection.includes(index)} 
                                        onChange={()=>HandleSelection(index)} >

                                        </input>
                                    </td>

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
                                        
                                        <div >
                                            <QuantityBtn 
                                            onClick={()=>HandleQuantityCalc(tempQuantities[item._id]-1, item._id,item.productItem)}
                                            >-</QuantityBtn>

                                            <QuantityInput 
                                            
                                                type="number" 
                                                onChange={  
                                                    (e) => {
                                                            const newVal = Number(e.target.value);
                                                            setTempQuantities((prev) => ({
                                                                ...prev,
                                                                [item._id]: newVal,
                                                            }));
                                                        }
                                                }
                                                onBlur={(e)=>HandleQuantity(e.target.value, item._id,item.productItem)}
                                                value = {tempQuantities[item._id]}
                                               
                                            ></QuantityInput>

                                            <QuantityBtn 
                                            onClick={()=>HandleQuantityCalc(tempQuantities[item._id]+1, item._id,item.productItem)} 
                                             >+</QuantityBtn>
                                        </div>

                                       
                                        
                                    </td>

                                    <td style={{ textAlign: "center",verticalAlign: "middle"}} >{FormattedPrice(item.price)}</td>
                                    <td style={{ textAlign: "center",verticalAlign: "middle"}}  >
                                            
                                        {FormattedPrice(item.quantity * item.price)}
                                        
                                        
                                    </td>
                                    <td style={{ textAlign: "center",verticalAlign: "middle"}} >
                                        <DeleteOption onClick={()=>HandleDelete(item._id)} >   Xóa </DeleteOption>
                                    </td>
                                
                                </tr>)

                            })}

                    </tbody>
                    
                </CartTable>
                </ScrollTable>
            </CartTableContainer>

        </>
    )
}

export default CartProduct