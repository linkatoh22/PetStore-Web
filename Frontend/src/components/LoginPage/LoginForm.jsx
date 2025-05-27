import { GrMailOption } from "react-icons/gr";
import { MdLockOutline } from "react-icons/md";

import Google from "../../assets/svg/google/google";
import styled from "styled-components";
import { useLogin } from "../../services/hook/LoginHook";
import { useContext, useState } from "react";
import { useNavigate, useLocation  } from 'react-router-dom';
import { AuthContext } from "../../context/AuthProvider";
import { useGoogleLogin } from '@react-oauth/google';
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
  cursor:pointer;
  &:active{
    background-color: var(--main-blue);
  }
`;
const BASE_URL = import.meta.env.VITE_BASE_URL;
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
        alert("Vui lòng nhập đầy đủ thông tin!");
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
              alert("Đăng nhập thành công!");

              if(data.token.accessToken){
                login(data.token.accessToken)
              }
              
              navigate(`/`);
            } 
          },
          onError:(error)=>{
            const message = error.response?.data?.message || error.message;
              alert("Lỗi đăng nhập " + message);
          }
        }
      )

    }

  const loginWithGoogle = useGoogleLogin({

    onSuccess: (tokenResponse) => {
      console.log('Đăng nhập thành công: ',tokenResponse);
      
      if(tokenResponse.access_token){
                alert(tokenResponse.access_token)
                login(tokenResponse.access_token)
              }
     
      navigate("/")
    },

    onError: () => {
      console.log('Login Failed');
    },


  });


    return(

        <>

            <LoginFormContainer className="login-form-container">
                
                <LoginFormTitle className="login-form-title">Đăng nhập với</LoginFormTitle>

                {/* <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                  >

                  </GoogleLogin> */}


               
                  <LoginGgBtn className="login-gg-btn" onClick={()=>loginWithGoogle()}>

                      <Google></Google>
                      Đăng nhập với Google

                  </LoginGgBtn>
                

                <SeperatorText className="seperator-text">hoặc</SeperatorText>




                <LoginFormMain className="login-form" onSubmit={handleSubmit}>

                    <InputWrapper className="input-wrapper"> 

                        <GrMailOption></GrMailOption>
                        <InputFormItem 
                        name="email"
                        type="email" 
                        placeholder="Nhập địa chỉ email" className="input-form"
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




                <p>Không có tài khoản <a href="#">Đăng ký ngay</a></p>
                

            </LoginFormContainer>
        </>
    )

}

export default LoginForm;