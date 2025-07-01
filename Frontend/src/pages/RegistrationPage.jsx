
import Footer from "../components/Footer";
import Logo from "../assets/logo.png";
import SignUpForm from "../components/RegistrationPage/SignUpForm";
import styled from "styled-components";
import MainMenu from "../components/MainMenu";
const SignupContainer = styled.div`
    
   
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

function RegistrationPage(){

    return(
        <>
          
          

            <SignupContainer className="signup-container">

              
                <BackgroundAccount className="background-account">

                
                        <SignUpForm>
                            
                        </SignUpForm>
                
                </BackgroundAccount>

            </SignupContainer>

            
        </>
    )
}

export default RegistrationPage;