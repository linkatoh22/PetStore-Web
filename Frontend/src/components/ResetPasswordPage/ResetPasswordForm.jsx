// import '../../styles/components/SignUpForm.css'

import { MdLockOutline } from "react-icons/md";
import { useNavigate,useParams } from 'react-router-dom';
import styled from 'styled-components';
import React, { useEffect, useMemo, useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useResetPassword } from "../../services/hook/ResetPasswordHook";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useLogOut } from "../../services/hook/LogOutHook";
const ResetPasswordContainer = styled.div`
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


    .paragraph{
        font-size:1.3rem;
        @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.6rem;
        }
        @media (min-width: 599px) and (max-width: 799.99px) {
            font-size: 0.8rem;
        }
        @media (min-width: 800px) and (max-width: 1311.99px) {
            font-size: 1rem;
        }


    }

  
`;

const ResetPasswordTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.8rem;
  display:flex;
  align-items:center;
  gap:0.2rem;
  justify-content:center;

    

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

const ResetPasswordItem = styled.form`
  
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

const ResetPasswordButton = styled.button`
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


  &:disabled {
    background-color: gray;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;



function ResetPasswordForm({id,setIsSuccessfully})
{
    const {mutate: ResetPasswordHook,isPending:isLoading }=useResetPassword();
    const {logout} =useContext(AuthContext)
    const navigate = useNavigate();
    const{mutate:LogoutHook} = useLogOut();
    const [password,setPassword]= useState("")


    useEffect(() => {
        document.body.style.cursor = isLoading ? "wait" : "default";
        }, [isLoading]);


    const handleChange = (e)=>{
      setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password.length<8){
            toast.error("Mật khẩu phải trên 8 ký tự")
            return;
        }
        if(!isLoading){
                ResetPasswordHook(
                    {
                        token:id,
                        password:password
                    },
                    {
                        onSuccess: (data) => {
                            if (data.status === "Success") {
                                toast.success("Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại");
                                LogoutHook(
                                        {},
                                        {
                                            onSuccess:(data)=>{
                                                console.log("Đăng xuất thành công")
                                                
                                                logout();
                                            },
                                            onError:(error)=>{
                                                console.error("Đăng xuất thất bại")
                                            }
                                        }
                                    )
                                setIsSuccessfully(true);
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
            <ResetPasswordContainer >
                
                <ResetPasswordTitle>
                    <div>Xác minh thành công </div>
                    <FaCheckCircle style={{color:"var(--success-500)"}}/> 
                </ResetPasswordTitle>
                  
                  <div className="paragraph">Chúng tôi đã xác minh thành công. Vui lòng hãy đặt lại mật khẩu.</div>
                

                <SeperatorText className="seperator-text"></SeperatorText>

                <ResetPasswordItem onSubmit={handleSubmit} >

                    
                    <InputWrapper className="input-wrapper"> 
                        <MdLockOutline></MdLockOutline>
                        <InputForm 
                        type="password"
                        value = {password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu" 
                        className="input-form"
                        ></InputForm>
                        
                    </InputWrapper>
                    

                    <ResetPasswordButton type="submit" disabled={isLoading}>
                        
                         {isLoading ? "Đang xử lý..." : "Xác nhận"}
                        
                        </ResetPasswordButton>

                </ResetPasswordItem>

                
                

            </ResetPasswordContainer>
        </>
    )

}

export default ResetPasswordForm;