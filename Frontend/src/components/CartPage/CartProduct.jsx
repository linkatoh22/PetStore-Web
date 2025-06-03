// import "../../styles/components/CartProduct.css"
import { useState } from 'react';
import detail4 from '../../assets/pic/detail-product/detail4.png';
import detail5 from '../../assets/pic/detail-product/detail5.png';
import detail6 from '../../assets/pic/detail-product/detail6.png';
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import { FormattedPrice } from '../../utils/FormatPrice';
const CartTableContainer = styled.div`
  width: 80%;
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
    text-align: center;
    vertical-align: middle;
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


function CartProduct(){
    const [Selection,SetSelection] = useState([])
    
    const ProductCart = [
        {   

            pic:detail4,
            id:"#SKU1236",
            name:"Shiba Inu Sepia 1",
            price: 1240000,
            quantity:2
        }
        ,
        
        {   
            pic:detail5,
            id:"#SKU1235",
            name:"Shiba Inu Sepia 2",
            price: 1240000,
            quantity:2
        },
        {   
            pic:detail6,
            id:"#SKU1234",
            name:"Shiba Inu Sepia 3",
            price: 4000000,
            quantity:2
        }
    ]

    const HandleSelection = (index) =>{
        if(index=="All"){
            if(Selection.length === ProductCart.length)
                SetSelection([])
            else
                SetSelection(
                    ProductCart.map((_,i)=>i)
                )
        }
        else{
            if( Selection.includes(index) )
                SetSelection(   Selection.filter(   item=>item !== index  )   )
            else
                SetSelection([...Selection,index])

        }

    }
    return(
        <>
            <CartTableContainer className="cartTable-container">
                <CartTitleContainer>
                    <h2 style={{fontWeight:"bold"}}>Giỏ hàng</h2>
                    <h3 style={{fontWeight:"bold"}}> 3 Sản Phẩm </h3>
                </CartTitleContainer>
                
                <LineDivider></LineDivider>
                <CartTable className="cartTable">
                    <thead >
                        <tr style={{color:"var(--grey-600)"}}>
                            <th>
                                <input type="checkbox" checked={Selection.length === ProductCart.length} onClick={()=>HandleSelection("All")}></input>
                            </th>

                            <th>Chi tiết sản phẩm</th>
                            <th> Số Lượng</th>
                            <th>Giá sản phẩm</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>

                    <tbody>

                        {ProductCart.map((item, index)=>{
                            return <tr>
                                
                                <td >
                                    <input type="checkbox" key={index} checked={Selection.includes(index)} onClick={()=>HandleSelection(index)} ></input>
                                </td>

                                <td>
                                    <ProductDetailContainer>
                                        <ProductDetailImage src={item.pic}></ProductDetailImage>

                                        <ProductDetailParagraph>
                                            <div>{item.id}</div>
                                            <div>{item.name}</div>
                                        </ProductDetailParagraph>
                                    </ProductDetailContainer>
                                </td>

                                <td style={{ textAlign: "center",verticalAlign: "middle"}} >{item.quantity}</td>
                                <td style={{ textAlign: "center",verticalAlign: "middle"}} >{FormattedPrice(item.price)}</td>
                                <td style={{ textAlign: "center",verticalAlign: "middle"}} >{FormattedPrice(item.quantity * item.price)}</td>
                            
                            </tr>

                        })}


                    </tbody>
                </CartTable>
            </CartTableContainer>

        </>
    )
}

export default CartProduct