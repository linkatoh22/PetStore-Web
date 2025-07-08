import styled from "styled-components"
import Bgr from "../assets/background-0.jpg"
import ResetPasswordForm from "../components/ResetPasswordPage/ResetPasswordForm"
const ResetPasswordContainer = styled.div`
    width: 100%;
      height: 100vh;
      background-image: url(${Bgr});
      display: flex;
      align-items: center;     
      justify-content: center; 
    `
export default function ResetPasswordPage(){



    return(


        <ResetPasswordContainer>
            <ResetPasswordForm/>
        
        </ResetPasswordContainer>
    )


}