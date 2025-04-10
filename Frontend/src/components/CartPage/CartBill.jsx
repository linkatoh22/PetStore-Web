// import "../styles/components/CartBill.css"
import styled from "styled-components";
const CartBillContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`;

const CartBillItem = styled.div`
  width: 80%;
  border-radius: 10px;
  background-color: #f5f7fa;
  padding-inline: 2rem;
  padding-block: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const CartBillTitle = styled.h2`
  font-size: var(--fs-l);
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
  font-size: var(--fs-m);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CartBillTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;
`;

const CartBillSubTitle = styled.span`
  font-weight: bold;
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

                    <CartBillTitle className="CartBill-Title">Order Summary</CartBillTitle>

                    <Sperator className="sperator"></Sperator>

                    <BillInfo className="Bill-Info">
                        <CartBillTitleContainer className="cartBill-title-contaniner">

                            <div style={{fontWeight:"bold"}}className="cartBill-Title">
                                SubTotals{"(3 items)"}:
                                </div>

                            <div className="subTotal-Value">$ 2.246</div>
                        </CartBillTitleContainer>


                        <CartBillTitleContainer className="cartBill-title-contaniner">

                            <div className="cartBill-Title">Saving:</div>

                            <div className="subTotal-Value">$ 2.246</div>
                        </CartBillTitleContainer>

                        <CartBillTitleContainer className="cartBill-title-contaniner">

                            <div className="cartBill-Title">Shipping:</div>

                            <div className="cartBill-Value">$ 2.246</div>
                        </CartBillTitleContainer>

                        
                    </BillInfo>

                    <CheckoutBtn className="checkout-btn">Proceed to checkout</CheckoutBtn>
                </CartBillItem>
            </CartBillContainer>
            
        </>
    )
}

export default CartBill