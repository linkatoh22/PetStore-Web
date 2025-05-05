
import Footer from "../components/Footer";
import Logo from "../assets/logo.png";
import OtpVerificationForm from "../components/OtpVerificationPage/OtpVerification"
import styled from "styled-components";
import MainMenu from "../components/MainMenu";
const OtpVerifyContainer = styled.div`
    
   
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;


const BackgroundAccount = styled.div`
  
  width: 100%;
  display: flex;
  align-items: center;
    justify-content: center;
    padding-block: 5rem;
  
  
`

function OtpVerificationPage(){

    return(
        <>
          
          <MainMenu></MainMenu>

            <OtpVerifyContainer className="signup-container">

              
                <BackgroundAccount className="background-account">

                
                        <OtpVerificationForm>
                            
                        </OtpVerificationForm>
                
                </BackgroundAccount>

            </OtpVerifyContainer>

            <Footer></Footer>
        </>
    )
}

export default OtpVerificationPage;