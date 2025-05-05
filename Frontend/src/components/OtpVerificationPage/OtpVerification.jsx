// import '../../styles/components/SignUpForm.css'

import { MdLockOutline } from "react-icons/md";

import styled from 'styled-components';
const OtpVerifyContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  
  width: 30%;
  border: 1px solid rgb(170, 169, 169);
  padding-block: 5rem;
  padding-inline: 2rem;
  gap:2rem;
  
`;

const OtpVerifyFormTitle = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 1.8em;
`;


const SeperatorText = styled.div`
  background-color: rgb(170, 169, 169);
  width: 100%;
  height: 1px;
`;

const OtpVerifyFormItem = styled.form`
  
  display: flex;
  flex-direction: column;
  gap:1rem;
  
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 5px;
  gap: 5px;
  font-size: var(--fs-m);
  width: 100%;
  border: 1px solid rgb(170, 169, 169);
`;

const InputForm = styled.input`
  width: 100%;
  padding-inline: 10px;
  padding-block: 5px;
  font-size: 1.2rem;
  border: none;

  &:focus {
    outline: none;
  }
`;

const OtpVerifyButton = styled.button`
  background-color: var(--clr-dark-blue);
  color: white;
  font-size: var(--fs-m);
  font-weight: bold;
  border: none;
  padding-block: 10px;
`;
const ResendOTPButton = styled.div`
    text-decoration: underline;
    color: var(--clr-dark-blue);
    cursor: pointer;
`
function OtpVerificationForm()
{
    return(

        <>
            <OtpVerifyContainer className="signup-form-container">
                
                <OtpVerifyFormTitle className="signup-form-title">Xác thực OTP</OtpVerifyFormTitle>

                

                <SeperatorText className="seperator-text"></SeperatorText>

                <OtpVerifyFormItem action="#" className="signup-form">

                    
                    <InputWrapper className="input-wrapper"> 
                        <MdLockOutline></MdLockOutline>
                        <InputForm type="number" placeholder="Nhập mật khẩu (ít nhất 8 ký tự)" className="input-form"></InputForm>
                        
                    </InputWrapper>
                    <ResendOTPButton>Gửi lại mã OTP</ResendOTPButton>
                    


                    

                    <OtpVerifyButton className="signup-button">Xác nhận</OtpVerifyButton>

                </OtpVerifyFormItem>

                
                

            </OtpVerifyContainer>
        </>
    )

}

export default OtpVerificationForm;