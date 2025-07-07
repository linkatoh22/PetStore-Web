

import Bgr from "../assets/background-0.jpg"
import OtpVerificationForm from "../components/OtpVerificationPage/OtpVerification"
import styled from "styled-components";

const OtpVerifyContainer = styled.div`
    width: 100%;
      height: 100vh;
      background-image: url(${Bgr});
      display: flex;
      align-items: center;     
      justify-content: center; 
    `




function OtpVerificationPage(){

    return(
        <>
          
          

            <OtpVerifyContainer className="signup-container">

              
                

                
                        <OtpVerificationForm>
                            
                        </OtpVerificationForm>
                
              

            </OtpVerifyContainer>

           
        </>
    )
}

export default OtpVerificationPage;