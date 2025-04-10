// import "../styles/pages/LoginPage.css"
import Footer from "../components/Footer"
import Logo from "../assets/logo.png"
import LoginForm from "../components/LoginPage/LoginForm"
import styled from "styled-components"

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 20px;
`;

const LoginHeader = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  font-size: var(--fs-l);
  font-weight: bold;
`;

const LoginWrapper = styled.div`
  width: 80%;
  margin: auto;
`;


function LoginPage(){

    return (

        <>
            
            <LoginContainer className="login-container">

                <LoginHeader className="login-header">

                    <img src={Logo} className="logo-img"></img>
                    <div className="login-title">Log In</div>

                </LoginHeader>

                <LoginForm>

                    
                </LoginForm>

            </LoginContainer>

            <Footer></Footer>
        </>
    )

}

export default LoginPage