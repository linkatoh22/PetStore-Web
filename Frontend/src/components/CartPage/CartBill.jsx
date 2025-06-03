// import "../styles/components/CartBill.css"
import styled from "styled-components";
const CartBillContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const CartBillItem = styled.div`
  width: 80%;
  border-radius: 10px;
  background-color: #f5f7fa;
  padding-inline: 2rem;
  padding-block: 4rem;
  display: flex;
  flex-direction: column;
  
`;

const CartBillTitle = styled.h2`
  text-align:center;
  font-weight: bold;
`;

const Sperator = styled.hr`
  width: 100%;
  border: 0.1px solid gray;
`;

const SubTotal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BillInfo = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const CartBillTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;
`;

const CheckoutBtn = styled.button`
  cursor: pointer;
  background-color: var(--clr-dark-blue);
  color: white;
  font-size: var(--fs-m);
  border: none;
  padding: 0.5rem;
  border-radius: 25px;

  &:active {
    background-color: #005897;
  }
`;

function CartBill(){

    return(
        <>
            <CartBillContainer className="CartBillContainer">
                <CartBillItem className="cartBill">

                    <CartBillTitle className="CartBill-Title">Tóm tắt đơn hàng</CartBillTitle>

                    <Sperator className="sperator"></Sperator>

                    <BillInfo className="Bill-Info">
                        <CartBillTitleContainer className="cartBill-title-contaniner">

                            <div className="cartBill-Title">
                                Tổng đơn hàng {"(3 sản phẩm)"}:
                                </div>

                            <div className="subTotal-Value">$ 2.246</div>
                        </CartBillTitleContainer>


                        

                        <CartBillTitleContainer className="cartBill-title-contaniner">

                            <div className="cartBill-Title">Phí vận chuyển:</div>

                            <div className="cartBill-Value">$ 2.246</div>
                        </CartBillTitleContainer>
                        <Sperator className="sperator"></Sperator>
                        <CartBillTitleContainer className="cartBill-title-contaniner">

                            <div className="cartBill-Title" style={{fontWeight:"bold"}}>Tổng tiền:</div>

                            <div className="cartBill-Value">$ 2.246</div>
                        </CartBillTitleContainer>

                        <CheckoutBtn className="checkout-btn">Thanh toán</CheckoutBtn>
                    </BillInfo>

                    
                </CartBillItem>
            </CartBillContainer>
            
        </>
    )
}

export default CartBill