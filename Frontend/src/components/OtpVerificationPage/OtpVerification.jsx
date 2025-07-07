// import '../../styles/components/SignUpForm.css'

import { MdLockOutline } from "react-icons/md";
import { useNavigate,useParams } from 'react-router-dom';
import styled from 'styled-components';
import React, { useEffect, useMemo, useState } from 'react';
import { useVerifyOtp, useResendOtp} from "../../services/hook/OtpVerificationHook";
import { toast } from "react-toastify";
const OtpVerifyContainer = styled.div`
  background-color: white;
  border-radius:10px;
  display: flex;
  flex-direction: column;
  width: 30%;
  border: 1px solid rgb(170, 169, 169);
  padding-block: 5rem;
  padding-inline: 2rem;
  gap:2rem;


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

const OtpVerifyFormTitle = styled.div`
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

const OtpVerifyButton = styled.button`
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
    // const email = useMemo(()=>{
      
    //   if(otpData.data){
    //     return otpData.data.email
    //   }
    //   return ""
    // },[otpData])

    useEffect(()=>{
      console.log(otpData)
    },[otpData])
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
                toast.success("Tạo tài khoản thành công. Vui lòng đăng nhập để vào tài khoản.");
                navigate("/");
              }
            },
            onError: (error) => {
              
              const message = error.response?.data?.message || error.message;
              toast.error("Lỗi xác thực OTP: " + message);
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
                toast.success("Mã OTP đã được gửi lại vào email của bạn")
              }
            }
          },
          {
            onError:(error)=>{
              const message = error.response?.data?.message || error.message;
              toast.error("Lỗi khi gửi lại OTP: " + message);
            }
          }
      )
        
    }

    return(

        <>
            <OtpVerifyContainer className="signup-form-container">
                
                <OtpVerifyFormTitle className="signup-form-title">Xác thực OTP</OtpVerifyFormTitle>
                  <div className="paragraph">Chúng tôi vừa gửi mã OTP vào email của bạn vui lòng kiểm tra. OTP có hiệu lực trong 5 phút.</div>
                

                <SeperatorText className="seperator-text"></SeperatorText>

                <OtpVerifyFormItem onSubmit={handleSubmit} >

                    
                    <InputWrapper className="input-wrapper"> 
                        <MdLockOutline></MdLockOutline>
                        <InputForm type="number"
                        name="otp"
                        value = {formData.otp}
                        onChange={handleChange}
                        placeholder="Nhập mã OTP" 
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