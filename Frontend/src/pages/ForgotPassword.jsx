import styled from "styled-components"
import Bgr from "../assets/background-0.jpg"
import ForgotPasswordForm from "../components/ForgotPasswordPage/ForgotPasswordForm"
import SuccessfullySent from "../components/ForgotPasswordPage/SuccessfullySent"
import { useState } from "react"
const OtpVerifyContainer = styled.div`
    width: 100%;
      height: 100vh;
      background-image: url(${Bgr});
      display: flex;
      align-items: center;     
      justify-content: center; 
    `


export default function ForgotPasswordPage(){
    const [isSuccessfully,setIsSuccessfully] = useState(false);
    const [emailChosen, setEmailChosen] = useState();
    return(

        <OtpVerifyContainer>
            {isSuccessfully? 
            <SuccessfullySent Header={"Đã gửi Link vào Email"}  Content={`Vui lòng check mail ${emailChosen} của bạn, chúng tôi đã gửi link set lại mật khẩu cho bạn.`}></SuccessfullySent>:
            <ForgotPasswordForm setIsSuccessfully={setIsSuccessfully} setEmailChosen={setEmailChosen}/>
            }
            
        </OtpVerifyContainer>
    )


}