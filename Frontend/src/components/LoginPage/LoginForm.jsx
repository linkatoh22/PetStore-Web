import { GrMailOption } from "react-icons/gr";
import { MdLockOutline } from "react-icons/md";

import Google from "../../assets/svg/google/google";
import styled from "styled-components";
import { useLogin } from "../../services/hook/LoginHook";
import { useContext, useState } from "react";
import { useNavigate, useLocation  } from 'react-router-dom';
import { AuthContext } from "../../context/AuthProvider";
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from "react-toastify";


const LoginFormContainer = styled.div`
  background-color:white;
  border-radius:10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40%;
  border: 1px solid rgb(170, 169, 169);
  padding-inline: 2rem;
  padding-block: 4rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
        padding-inline: 1rem;
      padding-block: 2rem;
        width:80%; 
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
      padding-inline: 1rem;
      padding-block: 3rem;
        width:60%;
    }

    @media (min-width: 599px) and (max-width: 799.99px) {
        width:60%;
        
    }
    @media (min-width: 1312px) and (max-width: 1500.00px) {
        width:50%;
    }
`;

const LoginFormTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.8rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 1.2rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 1.5rem;
    }
`;

const LoginGgBtn = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 3px;

  padding: 0.8rem;
  background-color: rgba(255, 248, 248, 0.568);
  border: 1px solid rgb(170, 169, 169);
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;

  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.8rem;
        font-size: 0.4rem;
        font-size: 0.8rem;
  
    }
  @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 1rem;
        padding: 0.6rem;
        font-size: 1rem;
    }

`;

const SeperatorText = styled.div`
  font-size: 1.2rem;
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

  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.8rem;
        
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 1rem;
  }
`;

const LoginFormMain = styled.form`
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
   
  
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 0.5rem;
  gap: 5px;
  font-size: 1.2rem;
  width: 100%;
  border: 1px solid rgb(170, 169, 169);

  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.8rem;
        
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 1rem;
  }


`;

const InputFormItem = styled.input`
  width: 100%;
  padding-inline: 0.5rem;
  padding-block: 0.3rem;
  font-size: 1.2rem;
  border: none;

  &:focus {
    outline: none;
  }
  
  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.8rem;
        
        
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 1rem;
        
        
  }


`;

const LoginButton = styled.button`
  background-color: var(--clr-dark-blue);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  padding-block: 0.5rem;
  cursor:pointer;
  &:active{
    background-color: var(--main-blue);
  }

  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.8rem;
        
        
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 1rem;
        
        
  }
`;
const BASE_URL = import.meta.env.VITE_BASE_URL_ORG;

function LoginForm(){
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation();
    const {mutate:logIn}  = useLogin();
    
    const [formData,setFormData] = useState({
        email: "",
        password:"",
    })
    const handleChange = (e)=>{
        setFormData(prev=>(
          {
            ...prev,
            [e.target.name] :e.target.value
          }
        ))
    }
    const handleSubmit = (e)=>{
      e.preventDefault();
      if(formData.email == "" || formData.password == ""){
        // alert("Vui lòng nhập đầy đủ thông tin!");
        toast.error(`Vui lòng nhập đầy đủ thông tin!`);
        return;
      }
      logIn(

        {
          email: formData.email,
          password: formData.password,
        },

        {
          onSuccess:(data)=>{
            if(data.status == "Success"){
              console.log(data)
              toast.success(`Đăng nhập thành công!`);
              
              if(data.token.accessToken){
                login(data.token.accessToken)
              }
              
              navigate(`/`);
            } 
          },
          onError:(error)=>{
            const message = error.response?.data?.message || error.message;
              toast.error("Lỗi đăng nhập: " + message);
              
          }
        }
      )

    }

  const loginWithGoogle = ()=>{
    
    window.location.href = `${BASE_URL}/api/auth/google`;
  };


    return(

        <>

            <LoginFormContainer className="login-form-container">
                
                <LoginFormTitle className="login-form-title">Đăng nhập với</LoginFormTitle>



               
                  <LoginGgBtn className="login-gg-btn" onClick={()=>loginWithGoogle()}>

                      <Google className="google-icon"></Google>
                      Đăng nhập với Google

                  </LoginGgBtn>
                

                <SeperatorText className="seperator-text">hoặc</SeperatorText>




                <LoginFormMain className="login-form" onSubmit={handleSubmit}>

                    <InputWrapper className="input-wrapper"> 

                        <GrMailOption></GrMailOption>
                        <InputFormItem 
                        name="email"
                        type="email" 
                        placeholder="Nhập email" className="input-form"
                        value = {formData.email}
                        onChange = {handleChange}

                        ></InputFormItem>
                        
                    </InputWrapper>

                    <InputWrapper className="input-wrapper"> 

                        <MdLockOutline></MdLockOutline>
                        <InputFormItem 
                          name="password"
                          type="password" 
                          placeholder="Mật khẩu" 
                          className="input-form"
                          value = {formData.password}
                          onChange = {handleChange}
                          ></InputFormItem>
                        
                    </InputWrapper>

                      <a href="#" className="forgot-pass-link">Quên mật khẩu?</a>

                    <LoginButton 
                      type="submit" 
                      className="login-button"
                    > Đăng nhập</LoginButton>

                </LoginFormMain>




                <p>Không có tài khoản <a href="/dang-ky">Đăng ký ngay</a></p>
                

            </LoginFormContainer>
        </>
    )

}

export default LoginForm;