// import '../../styles/components/SignUpForm.css'
import { GrMailOption } from "react-icons/gr";
import { MdLockOutline } from "react-icons/md";
import Google from "../../assets/svg/google/google";
import styled from 'styled-components';
const SignUpFormContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 35%;
  border: 1px solid rgb(170, 169, 169);
  padding: 2rem;
`;

const SignUpFormTitle = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 1.8em;
`;

const GoogleIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const SignUpGgBtn = styled.button`
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

  &::before, &::after {
    flex: 1;
    content: '';
    padding: 0.5px;
    background-color: rgb(170, 169, 169);
    margin: 10px;
  }
`;

const SignUpFormItem = styled.form`
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

const InputForm = styled.input`
  width: 100%;
  padding-inline: 10px;
  padding-block: 5px;
  font-size: 1.2rem;
  border: none;

  &:focus {
    outline: none;
  }
`;

const SignUpButton = styled.button`
  background-color: var(--clr-dark-blue);
  color: white;
  font-size: var(--fs-m);
  font-weight: bold;
  border: none;
  padding-block: 10px;
`;


function SignUpForm()
{
    return(

        <>
            <SignUpFormContainer className="signup-form-container">
                
                <SignUpFormTitle className="signup-form-title">Sign Up with</SignUpFormTitle>

                <SignUpGgBtn className="signup-gg-btn">

                    <Google></Google>
                    Sign up with Google
                </SignUpGgBtn>

                <SeperatorText className="seperator-text">or</SeperatorText>

                <SignUpFormItem action="#" className="signup-form">

                    <InputWrapper className="input-wrapper"> 

                        <GrMailOption></GrMailOption>
                        <InputForm type="email" placeholder="Email Address" className="input-form"></InputForm>
                        
                    </InputWrapper>

                    <InputWrapper className="input-wrapper"> 
                        <MdLockOutline></MdLockOutline>
                        <InputForm type="password" placeholder="Password (minimum 8 words)" className="input-form"></InputForm>
                        
                    </InputWrapper>

                    <InputWrapper className="input-wrapper"> 
                        <MdLockOutline></MdLockOutline>
                        <InputForm type="password" placeholder="Confirm Password" className="input-form"></InputForm>
                        
                    </InputWrapper>


                    

                    <SignUpButton className="signup-button">Sign Up</SignUpButton>

                </SignUpFormItem>

                
                

            </SignUpFormContainer>
        </>
    )

}

export default SignUpForm;