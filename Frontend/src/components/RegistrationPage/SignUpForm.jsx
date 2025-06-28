
  import { GrMailOption } from "react-icons/gr";
  import { MdLockOutline } from "react-icons/md";
  import Google from "../../assets/svg/google/google";
  import styled from 'styled-components';
  import React, { useState } from 'react';

  import { useSignUp } from "../../services/hook/SignUpHook";
  import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
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


  const SignUpGgBtn = styled.button`
    justify-content: center;
    display: flex;
    align-items: center;
    gap: 3px;
    padding: 10px;
    background-color: rgba(255, 248, 248, 0.568);
    border: 1px solid rgb(170, 169, 169);
    font-size: 1.3rem;
    font-weight: 600; 
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
    background-color: var(--main-blue);
    color: white;
    font-size: var(--fs-m);
    font-weight: bold;
    border: none;
    padding-block: 10px;
    cursor: pointer;
    &:active{
      background-color: var(--clr-dark-blue);
    }
  `;


  function SignUpForm()
  {
    const navigate = useNavigate()
    var message = "";
    var FilterItem = [];
    const {mutate:signup} = useSignUp();
    const[formData, setFormData] = useState({ 
          email: '',
          password: '',
          confirmPassword: ''
    });

    const handleChange = (e) => {

      setFormData(prev => ({
          ...prev,
          [e.target.name]: e.target.value
      }));

      };

      const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
      };

      const signUpWithGoogle = useGoogleLogin({
          onSuccess: (tokenResponse) => {
            toast.success('Đăng ký thành công: ',tokenResponse);
            localStorage.setItem("accessToken",tokenResponse.access_token)
            navigate("/")
          },

          onError: () => {
            toast.error('Login Failed');
          },
      })

      const handleSubmit = (e) => {
          e.preventDefault();
          
          if (!isValidEmail(formData.email)) {
            toast.error("Lỗi đăng nhập: Email không hợp lệ");
            return;
          }
          if(formData.password !== formData.confirmPassword) {
            toast.error('Lỗi đăng nhập: Mật khẩu không khớp!');
            return;
          }
          else if(formData.password.length < 8) {
            toast.error('Lỗi đăng nhập: Mật khẩu phải có ít nhất 8 ký tự!');
            return;
          }
          
          signup({
            email: formData.email,
            password: formData.password,
          },
          {
            onSuccess:(data) =>{
              if(data.status == "Success"){
                toast.success(`/dang-ky/otp/${data.data.userid}`);
              } else {
                toast.error(data?.message ?? "Đăng ký thất bại");
              }
            }
          },
          {
            onError:(error)=>{
              toast.error("Lỗi đăng nhập:"+error.message)
            }
          }
          );
          
          


      };
    
    
      return(
          
          <>
              <SignUpFormContainer className="signup-form-container">
                  
                  <SignUpFormTitle className="signup-form-title">Đăng ký với</SignUpFormTitle>

                  <SignUpGgBtn className="signup-gg-btn" onClick={()=>signUpWithGoogle()}>

                      <Google></Google>
                      Đăng ký với Google
                  </SignUpGgBtn>

                  <SeperatorText className="seperator-text">or</SeperatorText>

                  <SignUpFormItem className="signup-form" onSubmit={handleSubmit}>

                      <InputWrapper className="input-wrapper"> 

                          <GrMailOption></GrMailOption>
                          <InputForm 
                          type="email" 
                          placeholder="Nhập email của bạn" 
                          className="input-form"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          ></InputForm>
                          
                      </InputWrapper>

                      <InputWrapper className="input-wrapper"> 
                          <MdLockOutline></MdLockOutline>
                          <InputForm 
                          type="password"
                          name="password"
                          placeholder="Nhập mật khẩu (ít nhất 8 ký tự)"
                          value={formData.password}
                          onChange={handleChange}></InputForm>
                          
                      </InputWrapper>

                      <InputWrapper className="input-wrapper"> 
                          <MdLockOutline></MdLockOutline>
                          <InputForm 
                          type="password"
                          name="confirmPassword"
                          placeholder="Nhập mật khẩu lại" 
                          className="input-form"
                          value={formData.confirmPassword}
                          onChange={handleChange}></InputForm>
                          
                      </InputWrapper>


                      

                      <SignUpButton type="submit" className="signup-button">Đăng ký</SignUpButton>

                  </SignUpFormItem>

                  
                  

              </SignUpFormContainer>
          </>
      )

  }

  export default SignUpForm;