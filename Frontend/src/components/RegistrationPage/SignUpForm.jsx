
  import { GrMailOption } from "react-icons/gr";
  import { MdLockOutline } from "react-icons/md";
  import { BsPersonCheckFill } from "react-icons/bs";
  import Google from "../../assets/svg/google/google";
  import styled from 'styled-components';
  import React, { useState } from 'react';

  import { useSignUp } from "../../services/hook/SignUpHook";
  import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
  const SignUpFormContainer = styled.div`
    
    background-color: white;
    border-radius:10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    @media (min-width: 1312px) and (max-width: 1500.00px) {
        width:50%;
    }
  
  
  `;

  const SignUpFormTitle = styled.h2`
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


  const SignUpGgBtn = styled.button`
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

    &::before, &::after {
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

  const SignUpFormItem = styled.form`
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
  `;

  const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 0.5em;
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

  const InputForm = styled.input`
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

  const SignUpButton = styled.button`
    background-color: var(--clr-dark-blue);
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    padding-block: 0.5rem;
    cursor: pointer;
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


  function SignUpForm()
  {
    const navigate = useNavigate()
    const {mutate:signup} = useSignUp();
    const[formData, setFormData] = useState({ 
          username:'',
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
            username:formData.username,
            email: formData.email,
            password: formData.password,
          },
          {
            onSuccess:(data) =>{
              if(data.status == "Success"){
                toast.success("Đăng ký thành công")
                navigate(`/dang-ky/otp/${data.data.userid}`);
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

                          <BsPersonCheckFill></BsPersonCheckFill>
                          <InputForm 
                          type="text" 
                          placeholder="Nhập tên hiển thị của bạn" 
                          className="input-form"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          ></InputForm>
                          
                      </InputWrapper>

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