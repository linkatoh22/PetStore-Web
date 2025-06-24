// import "../styles/pages/LoginPage.css"
import Footer from "../components/Footer"
import Logo from "../assets/logo.png"
import LoginForm from "../components/LoginPage/LoginForm"
import styled from "styled-components"
import MainMenu from "../components/MainMenu" 
const LoginContainer = styled.div`
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


function LoginPage(){

    return (

        <>
            <MainMenu></MainMenu>

            <LoginContainer className="login-container">

                <BackgroundAccount>
                  <LoginForm>

                      
                  </LoginForm>
                </BackgroundAccount>


            </LoginContainer>

            <Footer></Footer>
        </>
    )

}

export default LoginPage