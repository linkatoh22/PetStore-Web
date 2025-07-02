import Footer from "../components/Footer"
import LoginForm from "../components/LoginPage/LoginForm"
import styled from "styled-components"
import MainMenu from "../components/MainMenu" 
const LoginContainer = styled.div`
    width:100%;
    
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
            

                <LoginContainer className="login-container">

                    <BackgroundAccount>
                    <LoginForm>

                        
                    </LoginForm>
                    </BackgroundAccount>


                </LoginContainer>
            
        </>
    )

}

export default LoginPage