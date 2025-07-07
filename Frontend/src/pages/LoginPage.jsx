import Footer from "../components/Footer"
import Bgr from "../assets/background-0.jpg"
import LoginForm from "../components/LoginPage/LoginForm"
import styled from "styled-components"
import MainMenu from "../components/MainMenu" 
const LoginContainer = styled.div`
    width: 100%;
  height: 100vh;
  background-image: url(${Bgr});
  display: flex;
  align-items: center;     
  justify-content: center; 
    
`;




function LoginPage(){

    return (

        <>
            

                <LoginContainer className="login-container">

                    
                        <LoginForm>

                            
                        </LoginForm>
                 


                </LoginContainer>
            
        </>
    )

}

export default LoginPage