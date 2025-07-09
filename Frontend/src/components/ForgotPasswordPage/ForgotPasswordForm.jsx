// import '../../styles/components/SignUpForm.css'

import { MdLockOutline } from "react-icons/md";

import { GrMailOption } from "react-icons/gr";
import { useNavigate,useParams } from 'react-router-dom';
import styled from 'styled-components';
import React, { useEffect, useMemo, useState } from 'react';
import {useSendLinkToEmail } from "../../services/hook/ResetPasswordHook";
import { toast } from "react-toastify";
const ForgotPasswordContainer = styled.div`
  background-color: white;
  border-radius:10px;
  display: flex;
  flex-direction: column;
  width: 30%;
  border: 1px solid rgb(170, 169, 169);
  padding-block: 5rem;
  padding-inline: 2rem;
  gap:2rem;
  cursor: ${(props) => (props.isLoading ? 'wait' : 'auto')};

  @media (min-width: 0px) and (max-width: 598.99px) {
        width: 90%;
        padding-block: 3rem;
        padding-inline: 0.8rem;
        
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
        width: 70%;
        padding-block: 2rem;
        padding-inline: 1rem;
  }
  @media (min-width: 800px) and (max-width: 1311.99px) {
        width: 55%;
        padding-block: 3rem;
        padding-inline: 1.5rem;
  }
  @media (min-width: 1312px) and (max-width: 1500.00px) {
        width: 40%;
        padding-block: 4rem;
        padding-inline: 2rem;
        gap:2rem;
    }

  
`;

const ForgotPasswordTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.8rem;
  .paragraph{
    font-size:1.3rem;
    @media (min-width: 0px) and (max-width: 598.99px) {
      font-size: 0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1311.99px) {
          font-size: 1rem;
    }


  }
  @media (min-width: 0px) and (max-width: 598.99px) {
      font-size: 1.3rem;
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
      font-size: 1.5rem;
  }
  @media (min-width: 800px) and (max-width: 1311.99px) {
        font-size: 1.5rem;
  }


`;


const SeperatorText = styled.div`
    background-color: rgb(170, 169, 169);
    width: 100%;
    height: 1px;
`;

const ForgotPasswordItem = styled.form`
  
    display: flex;
    flex-direction: column;
    gap:1rem;
  
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 5px;
  gap: 0.3rem;
  font-size: 1.2rem;
  width: 100%;
  border: 1px solid rgb(170, 169, 169);

  @media (min-width: 0px) and (max-width: 598.99px) {
      font-size: 0.7rem;
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
      font-size: 0.8rem;
  }
  @media (min-width: 800px) and (max-width: 1311.99px) {
        font-size: 0.9rem;
  }
  @media (min-width: 1312px) and (max-width: 1500.00px) {
        font-size: 1rem;
  }

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

  @media (min-width: 0px) and (max-width: 598.99px) {
      font-size: 0.7rem;
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
      font-size: 0.8rem;
  }
  @media (min-width: 800px) and (max-width: 1311.99px) {
        font-size: 0.9rem;
  }
  @media (min-width: 1312px) and (max-width: 1500.00px) {
        font-size: 1rem;
  }


`;

const ForgotPasswordButton = styled.button`
  background-color: var(--clr-dark-blue);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  padding-block: 10px;
  cursor: pointer;
  &:active{
    background-color: var(--main-blue);
  }

  @media (min-width: 0px) and (max-width: 598.99px) {
      font-size: 0.7rem;
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
      font-size: 0.8rem;
  }
  @media (min-width: 800px) and (max-width: 1311.99px) {
        font-size: 0.9rem;
  }
  @media (min-width: 1312px) and (max-width: 1500.00px) {
        font-size: 1rem;
  }
`;



function ForgotPasswordForm({setIsSuccessfully,setEmailChosen})
{
    const {mutate: SendLink }=useSendLinkToEmail();
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const [email,setEmail]= useState("")

    const handleChange = (e)=>{
      setEmail(e.target.value)
    }
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!isLoading){
            setIsLoading(true);
            SendLink(
              {
                  email: email
              },
              {
                onSuccess: (data) => {
                  if (data.status === "Success") {
                    toast.success("Đã gửi link thay đổi mật khẩu vào email.Vui lòng hãy check email");
                    setIsSuccessfully(true);
                    setEmailChosen(email);
                    setIsLoading(false);
                  }
                },
                onError: (error) => {
                  
                  const message = error.response?.data?.message || error.message;
                  toast.error("Lỗi: " + message);
                }
              }
            )

        }
        else{
          toast.warning("Yêu cầu đang được xử lý...")
        }
        
    }

    return(

        <>
            <ForgotPasswordContainer isLoading={isLoading}>
                
                <ForgotPasswordTitle className="signup-form-title">Đặt lại mật khẩu</ForgotPasswordTitle>
                  <div className="paragraph">Vui lòng nhập email của bạn để chúng tôi có thể gửi email set lại mật khẩu cho bạn.</div>
                

                <SeperatorText className="seperator-text"></SeperatorText>

                <ForgotPasswordItem onSubmit={handleSubmit} >

                    
                    <InputWrapper className="input-wrapper"> 
                        <GrMailOption></GrMailOption>
                        <InputForm 
                        type="email"
                        name="email"
                        value = {email}
                        onChange={handleChange}
                        placeholder="Nhập email" 
                        className="input-form"
                        ></InputForm>
                        
                    </InputWrapper>
                    

                    <ForgotPasswordButton type="submit">Xác nhận</ForgotPasswordButton>

                </ForgotPasswordItem>

                
                

            </ForgotPasswordContainer>
        </>
    )

}

export default ForgotPasswordForm;