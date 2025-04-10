import { GrMailOption } from "react-icons/gr";
import { MdLockOutline } from "react-icons/md";

import Google from "../../assets/svg/google/google";
import styled from "styled-components";

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 35%;
  border: 1px solid rgb(170, 169, 169);
  padding: 2rem;
`;

const LoginFormTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.8em;
`;

const GoogleIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const LoginGgBtn = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 10px;
  background-color: rgba(255, 248, 248, 0.568);
  border: 1px solid rgb(170, 169, 169);
  font-size: var(--fs-m);
  font-weight: bold;
  cursor: pointer;
`;

const SeperatorText = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  color: rgb(49, 49, 49);

  &::before,
  &::after {
    flex: 1;
    content: '';
    padding: 0.5px;
    background-color: rgb(170, 169, 169);
    margin: 10px;
  }
`;

const LoginFormMain = styled.form`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 5px;
  gap: 5px;
  font-size: var(--fs-m);
  width: 100%;
  border: 1px solid rgb(170, 169, 169);
`;

const InputFormItem = styled.input`
  width: 100%;
  padding-inline: 10px;
  padding-block: 5px;
  font-size: 1.2rem;
  border: none;

  &:focus {
    outline: none;
  }
`;

const LoginButton = styled.button`
  background-color: var(--clr-dark-blue);
  color: white;
  font-size: var(--fs-m);
  font-weight: bold;
  border: none;
  padding-block: 10px;
`;

function LoginForm(){

    return(

        <>
            <LoginFormContainer className="login-form-container">
                
                <LoginFormTitle className="login-form-title">Log in with</LoginFormTitle>

                <LoginGgBtn className="login-gg-btn">

                    <Google></Google>
                    Log in Google
                </LoginGgBtn>

                <SeperatorText className="seperator-text">or</SeperatorText>
                <LoginFormMain action="#" className="login-form">

                    <InputWrapper className="input-wrapper"> 
                        <GrMailOption></GrMailOption>
                        <InputFormItem type="email" placeholder="Email Address" className="input-form"></InputFormItem>
                        
                    </InputWrapper>

                    <InputWrapper className="input-wrapper"> 
                        <MdLockOutline></MdLockOutline>
                        <InputFormItem type="password" placeholder="Password" className="input-form"></InputFormItem>
                        
                    </InputWrapper>


                    <a href="#" className="forgot-pass-link">Forgot Password?</a>

                    <LoginButton className="login-button">Log In</LoginButton>

                </LoginFormMain>

                <p>Don't have an account <a href="#">Sign up now</a></p>
                

            </LoginFormContainer>
        </>
    )

}

export default LoginForm;