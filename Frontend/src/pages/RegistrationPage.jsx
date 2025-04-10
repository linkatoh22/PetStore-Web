
import Footer from "../components/Footer";
import Logo from "../assets/logo.png";
import SignUpForm from "../components/RegistrationPage/SignUpForm";
import styled from "styled-components";

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 80%;
  margin: auto;
`;

const SignupHeader = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  font-size: var(--fs-l);
  font-weight: bold;
`;

const BackgroundAccount = styled.div`
  background-image: url("../../assets/pic/Background/background-0.jpg");
  background-repeat: no-repeat;
  width: 100%;
  height: 500px;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

function RegistrationPage(){

    return(
        <>
            <SignupContainer className="signup-container">

                <SignupHeader className="signup-header">

                    <img src={Logo} className="logo-img"></img>
                    <div className="signup-title">Sign Up</div>

                </SignupHeader>
                
                
                <BackgroundAccount className="background-account">

                    
                        <SignUpForm>
                            
                        </SignUpForm>
                    
                </BackgroundAccount>

            </SignupContainer>
            <Footer></Footer>
        </>
    )
}

export default RegistrationPage;