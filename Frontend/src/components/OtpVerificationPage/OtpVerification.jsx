// import '../../styles/components/SignUpForm.css'

import { MdLockOutline } from "react-icons/md";
import { useNavigate,useParams } from 'react-router-dom';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useVerifyOtp, useResendOtp} from "../../services/hook/OtpVerificationHook";
const OtpVerifyContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  
  width: 30%;
  border: 1px solid rgb(170, 169, 169);
  padding-block: 5rem;
  padding-inline: 2rem;
  gap:2rem;
  
`;

const OtpVerifyFormTitle = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 1.8em;
`;


const SeperatorText = styled.div`
  background-color: rgb(170, 169, 169);
  width: 100%;
  height: 1px;
`;

const OtpVerifyFormItem = styled.form`
  
  display: flex;
  flex-direction: column;
  gap:1rem;
  
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

const OtpVerifyButton = styled.button`
  background-color: var(--clr-dark-blue);
  color: white;
  font-size: var(--fs-m);
  font-weight: bold;
  border: none;
  padding-block: 10px;
  cursor: pointer;
  &:active{
    background-color: var(--main-blue);
  }
`;
const ResendOTPButton = styled.div`
    text-decoration: underline;
    color: var(--clr-dark-blue);
    
    cursor: pointer;
    &:active{
        color: var(--main-blue);
    }
`
function OtpVerificationForm()
{
    
    const { mutate:otpData } = useVerifyOtp();
    const {mutate: resendOtpData} = useResendOtp();
    const{id}= useParams();
    const navigate = useNavigate();
    const [formData,setFormData]= useState({
      otp:"",
      userId:id
    })

    const handleChange = (e)=>{
      setFormData(prev =>({
        ...prev,
        [e.target.name]:e.target.value
      }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData.otp);
        otpData(
          {
              userId: formData.userId,
              otp: formData.otp
          },
          {
            onSuccess: (data) => {
              if (data.status === "Success") {
                alert("Tạo tài khoản thành công");
                navigate("/");
              }
            },
            onError: (error) => {
              
              const message = error.response?.data?.message || error.message;
              alert("Lỗi xác thực OTP: " + message);
            }
          }


          
        )
    }

    const ResendOTP = () =>{
      resendOtpData
      (
          {
            userId:id
          },
          {
            onSuccess:(data)=>{
              if(data.status === "Success"){
                alert("Mã OTP đã được gửi lại vào email của bạn")
              }
            }
          },
          {
            onError:(error)=>{
              const message = error.response?.data?.message || error.message;
              alert("Lỗi khi gửi lại OTP: " + message);
            }
          }
      )
        
    }

    return(

        <>
            <OtpVerifyContainer className="signup-form-container">
                
                <OtpVerifyFormTitle className="signup-form-title">Xác thực OTP</OtpVerifyFormTitle>

                

                <SeperatorText className="seperator-text"></SeperatorText>

                <OtpVerifyFormItem onSubmit={handleSubmit} >

                    
                    <InputWrapper className="input-wrapper"> 
                        <MdLockOutline></MdLockOutline>
                        <InputForm type="number"
                        name="otp"
                        value = {formData.otp}
                        onChange={handleChange}
                        placeholder="Nhập mã OTP ở đây" 
                        className="input-form"
                        ></InputForm>
                        
                    </InputWrapper>
                    <ResendOTPButton onClick={()=>ResendOTP()}>Gửi lại mã OTP</ResendOTPButton>
                    


                    

                    <OtpVerifyButton className="signup-button" type="submit">Xác nhận</OtpVerifyButton>

                </OtpVerifyFormItem>

                
                

            </OtpVerifyContainer>
        </>
    )

}

export default OtpVerificationForm;