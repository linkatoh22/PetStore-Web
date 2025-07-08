import styled from "styled-components"
import Bgr from "../assets/background-0.jpg"
import ForgotPasswordForm from "../components/ForgotPasswordPage/ForgotPasswordForm"
const OtpVerifyContainer = styled.div`
    width: 100%;
      height: 100vh;
      background-image: url(${Bgr});
      display: flex;
      align-items: center;     
      justify-content: center; 
    `


export default function ForgotPasswordPage(){
    return(

        <OtpVerifyContainer>
            <ForgotPasswordForm/>
        </OtpVerifyContainer>
    )


}