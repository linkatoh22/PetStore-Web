// import "../../styles/components/CartProduct.css"
import detail4 from '../../assets/pic/detail-product/detail4.png';
import detail5 from '../../assets/pic/detail-product/detail5.png';
import detail6 from '../../assets/pic/detail-product/detail6.png';
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";

const CartTableContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: flex-start;
`;

const CartTable = styled.table`
  border: none;
  width: 100%;
`;

const HeaderCartTable = styled.tr``;

const HeaderItemCartTable = styled.th`
  text-align: center;
  width: 80%;
  border-left: none;
  border-right: none;
  border-top: none;
  border-color: rgb(175, 175, 175);
  border-collapse: collapse;
  font-size: 1.2rem;
  padding: 1rem;
`;

const IdProduct = styled.td`
  font-size: 1rem;
  color: var(--clr-dark-blue);
`;

const ProductNameInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: left;
  gap: 0.5rem;
`;

const QuantityInfo = styled.input`
  width: 50%;
  font-size: 1rem;
  text-align: center;
`;

const ClearBtn = styled.button`
  padding-top: 7px;
  padding-inline: 7px;
  border: none;
  font-size: 1.5rem;
  border-radius: 59px;
  color: #4e5562;
  cursor: pointer;

  &:hover {
    background-color: red;
    color: white;
  }

  &:active {
    background-color: rgb(209, 7, 7);
  }
`;

const QuantityBtn = styled.button`
  font-size: 1rem;
  text-align: center;
`;


function CartProduct(){
    const ProductCart = [
        {   

            pic:detail4,
            id:"#SKU1236",
            name:"Shiba Inu Sepia 1",
            price: 34,
            quantity:2
        }
        ,
        
        {   
            pic:detail5,
            id:"#SKU1235",
            name:"Shiba Inu Sepia 2",
            price: 34,
            quantity:2
        },
        {   
            pic:detail6,
            id:"#SKU1234",
            name:"Shiba Inu Sepia 3",
            price: 34,
            quantity:2
        }
    ]
    return(
        <>
            <CartTableContainer className="cartTable-container">
                <CartTable className="cartTable">

                    <HeaderCartTable className="header-cartTable">

                        <HeaderItemCartTable className="header-item-cartTable">Product</HeaderItemCartTable>
                        <HeaderItemCartTable className="header-item-cartTable">Price</HeaderItemCartTable>
                        <HeaderItemCartTable className="header-item-cartTable">Quantity</HeaderItemCartTable>
                        <HeaderItemCartTable className="header-item-cartTable">Total</HeaderItemCartTable>
                        <HeaderItemCartTable className="header-item-cartTable">Clear Cart</HeaderItemCartTable>
                    
                    </HeaderCartTable>


                    {
                        ProductCart.map((product,index)=>{
                            return <HeaderCartTable className="header-cartTable">

                            <HeaderItemCartTable className="header-item-cartTable">

                                <ProductNameInfo className="product-name-info">

                                    <img src={product.pic} alt="" className="imgProduct" />
                                    
                                    <div className="info-Product">
                                        <IdProduct className="idProduct">{product.id}</IdProduct>
                                        <IdProduct className="nameProduct">{product.name}</IdProduct>
                                    </div>

                                </ProductNameInfo>

                            </HeaderItemCartTable>


                            <HeaderItemCartTable className="header-item-cartTable">


                                <div className="productPriceInfo">

                                    {product.price + " $"} 
                                </div>
                            </HeaderItemCartTable>


                            <HeaderItemCartTable className="header-item-cartTable">

                                <QuantityBtn className="quantity-btn">+</QuantityBtn>

                                <QuantityInfo type="number" className="QuantityInfo" value={product.quantity} />

                                <QuantityBtn className="quantity-btn">-</QuantityBtn>

                            </HeaderItemCartTable>

                            <HeaderItemCartTable className="header-item-cartTable">

                                <div className="totalInfo">
                                    {product.price*product.quantity +" $"}
                                </div>

                            </HeaderItemCartTable>

                            <HeaderItemCartTable className="header-item-cartTable">
                                
                                <ClearBtn className="clearBtn">

                                <MdOutlineClose />

                                </ClearBtn>

                            </HeaderItemCartTable>

                        </HeaderCartTable>

                        })


                    }

                    



                </CartTable>
            </CartTableContainer>

        </>
    )
}

export default CartProduct