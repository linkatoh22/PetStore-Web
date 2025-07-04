
import Footer from "../components/Footer";

import SignUpForm from "../components/RegistrationPage/SignUpForm";
import styled from "styled-components";
import Bgr from "../assets/background-0.jpg"
import MainMenu from "../components/MainMenu";
const SignupContainer = styled.div`
    width: 100%;
      height: 100vh;
      background-image: url(${Bgr});
      display: flex;
      align-items: center;     /* căn giữa theo chiều dọc */
      justify-content: center; /* căn giữa theo chiều ngang */
`;


function RegistrationPage(){

    return(
        <>
          
          

            <SignupContainer className="signup-container">

              
                

                
                        <SignUpForm>
                            
                        </SignUpForm>
                
                

            </SignupContainer>

            
        </>
    )
}

export default RegistrationPage;