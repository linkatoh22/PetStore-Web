// import '../../styles/components/SignUpForm.css'

import { MdLockOutline } from "react-icons/md";

import { GrMailOption } from "react-icons/gr";
import { useNavigate,useParams } from 'react-router-dom';
import styled from 'styled-components';
import React, { useEffect, useMemo, useState } from 'react';
import {useSendLinkToEmail } from "../../services/hook/ResetPasswordHook";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
const ForgotPasswordContainer = styled.div`
  background-color: white;
  border-radius:10px;
  display: flex;
  flex-direction: column;
  width: 30%;
  border: 1px solid rgb(170, 169, 169);
  padding-block: 5rem;
  padding-inline: 2rem;
  gap:1rem;


  @media (min-width: 0px) and (max-width: 598.99px) {
        width: 90%;
        padding-block: 3rem;
        padding-inline: 0.8rem;
        gap:0.5rem;
        
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
        width: 70%;
        padding-block: 2rem;
        padding-inline: 1rem;
        gap:0.6rem;
  }
  @media (min-width: 800px) and (max-width: 1311.99px) {
        width: 55%;
        padding-block: 3rem;
        padding-inline: 1.5rem;
        gap:0.8rem;
  }
  @media (min-width: 1312px) and (max-width: 1500.00px) {
        width: 40%;
        padding-block: 4rem;
        padding-inline: 2rem;
        gap:1rem;
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



const IconWrapper = styled.div`
    width:100%;
    display:flex;
    font-size:4rem;
    align-items:center;
    justify-content:center;

    
  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size:2rem;
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
        font-size:2.5rem;
  }
  @media (min-width: 800px) and (max-width: 1311.99px) {
        font-size:3rem;
  }
  @media (min-width: 1312px) and (max-width: 1500.00px) {
        font-size:3.5rem;
    }

`

function SuccessfullySent({Header,Content})
{
    return(

        <>
            <ForgotPasswordContainer>
                <IconWrapper>
                    <FaCheckCircle style={{color:"var(--success-500)"}}/> 

                </IconWrapper>
                
                <ForgotPasswordTitle className="signup-form-title">{Header}</ForgotPasswordTitle>
                        <div className="paragraph">{Content}</div>
                <SeperatorText className="seperator-text"></SeperatorText>

                

                
                

            </ForgotPasswordContainer>
        </>
    )

}

export default SuccessfullySent;