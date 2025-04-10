

import styled from "styled-components";
const CheckoutInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const CheckoutInputTitle = styled.div`
  font-size: var(--fs-l);
`;

const CheckoutInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: var(--fs-m);
`;

const CheckoutInputItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckoutInputInfo = styled.input`

    padding: 0.3rem;
    border-radius:5px;
    border: 1px solid gray;
    &:focus{
        outline: none;}
`

const CheckoutTitle = styled.label`
  font-weight: bold;
`;

const CheckoutInputField = styled.input`
  padding: 0.3rem;
  border-radius: 5px;
  border: 1px solid gray;

  &:focus {
    outline: none;
  }
`;
const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
function CheckoutInput(){
    return(
        <>
            <CheckoutInputContainer className="CheckoutInput-Container">

                <CheckoutInputTitle className="CheckoutInput-Title">
                    Billing Details
                </CheckoutInputTitle>


                <CheckoutInputGroup className="CheckoutInput-Group">

                    <CheckoutInputItem className="CheckoutInput">
                        <CheckoutTitle className="Checkout-Title">Full Name:</CheckoutTitle>
                        <CheckoutInputInfo  type="text" className="Checkout-Input" />
                    </CheckoutInputItem>

                    <CheckoutInputItem className="CheckoutInput">
                        <CheckoutTitle className="Checkout-Title">Phone Number:</CheckoutTitle>
                        <CheckoutInputInfo type="text" className="Checkout-Input" />
                    </CheckoutInputItem>

                    <CheckoutInputItem className="CheckoutInput">
                        <CheckoutTitle className="Checkout-Title">Tỉnh/Thành Phố:</CheckoutTitle>
                        <CheckoutInputInfo type="text" className="Checkout-Input" />
                    </CheckoutInputItem>

                    <CheckoutInputItem className="CheckoutInput">
                        <CheckoutTitle className="Checkout-Title">Quận/ Huyện:</CheckoutTitle>
                        <CheckoutInputInfo type="text" className="Checkout-Input" />
                    </CheckoutInputItem>

                    <CheckoutInputItem className="CheckoutInput">
                        <CheckoutTitle className="Checkout-Title">Phường/ Xã:</CheckoutTitle>
                        <CheckoutInputInfo type="text" className="Checkout-Input" />
                    </CheckoutInputItem>


                    <div className="CheckoutInput-PaymentMethod">
                    <CheckoutTitle className="Checkout-Title">Phương thức thanh toán:</CheckoutTitle>
                        
                        <List>
                            <li>
                                <input type="radio" id="f-option" name="selector"></input>
                                <label className="PaymentMethod-title">Thanh toán COD</label>
                            </li>
                            <li>
                                <input type="radio" id="f-option" name="selector"></input>
                                <label className="PaymentMethod-title">Chuyển khoản</label>
                            </li>

                        </List>
                        
                    </div>
                    <div className="buttonContainer">
                        <button className="Checkout-btn">Check Out</button>
                    </div>
                </CheckoutInputGroup>

            </CheckoutInputContainer>
        </>
    )


}

export default CheckoutInput;