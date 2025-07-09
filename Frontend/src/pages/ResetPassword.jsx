import styled from "styled-components"
import Bgr from "../assets/background-0.jpg"
import ResetPasswordForm from "../components/ResetPasswordPage/ResetPasswordForm"
import { useParams } from "react-router-dom";
import { useState } from "react";
import SuccessfullySent from "../components/ForgotPasswordPage/SuccessfullySent";
const ResetPasswordContainer = styled.div`
    width: 100%;
      height: 100vh;
      background-image: url(${Bgr});
      display: flex;
      align-items: center;     
      justify-content: center; 
    `
export default function ResetPasswordPage(){
    const [isSuccessfully,setIsSuccessfully] = useState(false);
    
    const { id } = useParams();
    return(


        <ResetPasswordContainer>
            {
                isSuccessfully?
                <SuccessfullySent Header={"Thay đổi mật khẩu thành công"}  Content={`Đã thay đổi mật khẩu thành công. Vui lòng đăng nhập với mật khẩu mới!.`}></SuccessfullySent>
                    :
                <ResetPasswordForm id={id} setIsSuccessfully={setIsSuccessfully}/>
            
            }
                
                
           
            
        
        </ResetPasswordContainer>
    )


}