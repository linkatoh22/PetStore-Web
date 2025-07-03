import MainMenu from './../MainMenu';
import styled from 'styled-components';
import Background from "../../assets/background.png"
import HoldHandPic from "../../assets/holdhand.png"
import CategoryPic from "../../assets/background-0.jpg"
import { useState } from 'react';


import { useNavigate } from 'react-router-dom';
const BackgroundMenuContainer = styled.div`
  width: 100%;
  height: 890px;
  background-image: url(${Background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 598.99px) {
    height: 520px;
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
    height: 720px;
  }
  @media (min-width: 800px) and (max-width: 1000px) {
    height: 620px;
  }
        
`;



const DescriptionMenu = styled.div`
  
  display: flex;
  position: absolute;
  flex-direction: column;
  gap: 0.5rem;
  left: 5%;
  top: 25%;
`;

const Header1Menu = styled.div`
  color: #002a48;
  font-size: 4.5rem;
  font-weight: bold;

  
    @media (min-width: 300px) and (max-width: 598.99px) {
        font-size: 1.5rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size: 2.5rem;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        font-size: 3.5rem;
        
    }
`;

const Header2Menu = styled.div`
  color: #002a48;
  
  font-weight: 550;

  

  font-size: 3.5rem;
    @media (min-width: 300px) and (max-width: 598.99px) {
        font-size: 1rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size: 1.5rem;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        font-size: 2.5rem;
        
    }
`;

const ParagraphMenu = styled.div`

  width: 40%;
  
  font-weight: 450;
  font-size: 1.2rem;
    @media (min-width: 300px) and (max-width: 598.99px) {
        font-size: 0.5rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size: 0.8rem;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        font-size: 1rem;
        
    }
`;

const BtnGroupMenu = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;

  @media (min-width: 300px) and (max-width: 598.99px) {
        gap: 0.5rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       gap: 0.7rem;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        gap: 0.8rem;
        
    }
`;

const TransparentBlueButton = styled.button`
  background-color: transparent;
  border-style: solid;
  border-width: 2px;
  font-weight: bold;
  border-color: var(--clr-dark-blue);
  color: var(--clr-dark-blue);
  font-size: 1.2rem ;
  cursor: pointer;
  border-radius: 100px;
  padding-inline: 2.2rem;
  padding-block: 0.8rem;
  transition: background-color 0.15s;

  &:active {
    background-color: white;
    color: #003459;
  }


  @media (min-width: 300px) and (max-width: 598.99px) {
    font-size: 0.5rem ;
        padding-inline: 0.8rem;
        padding-block: 0.5rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.7rem ;
       padding-inline: 1.2rem;
      padding-block: 0.6rem;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
    font-size: 1rem ;
        padding-inline: 1.5rem;
        padding-block: 0.6rem;
        
    }
`;
// const SlideShow =[Background,HoldHandPic,CategoryPic]
function BackgroundMenu(){
    const navigate = useNavigate()
    

    const handleNavItem = (type)=>{
      switch(type){
          case "Dog":
              navigate("/category/cho-canh")
              break;
          case "Cat":
              navigate("/category/meo-canh")
              break;
          case "Product":
              navigate("/category/phu-kien")
              break;
      }
  }


    return (

        <>
            <BackgroundMenuContainer src={Background}>
            </BackgroundMenuContainer>

                    
                   

                <DescriptionMenu>
               

                    <Header1Menu>Thêm một người bạn</Header1Menu>
                    <Header2Menu>Thêm vạn niềm vui!</Header2Menu>
                    <ParagraphMenu>Việc nuôi thú cưng đồng nghĩa với việc bạn sẽ có thêm niềm vui, một người bạn hạnh phúc luôn đồng hành cùng bạn để tận hưởng những khoảnh khắc vui vẻ. Chúng tôi có hơn 200+ loài thú cưng khác nhau để đáp ứng nhu cầu của bạn!</ParagraphMenu>

                    

                    <BtnGroupMenu>

                        <TransparentBlueButton className="transparent-blue-button" onClick={()=>handleNavItem("Cat")}> Mèo cảnh</TransparentBlueButton>

                        <TransparentBlueButton className="transparent-blue-button" onClick={()=>handleNavItem("Dog")}> Chó cảnh</TransparentBlueButton>
                        <TransparentBlueButton className="transparent-blue-button" onClick={()=>handleNavItem("Product")}> Phụ kiện thú cưng</TransparentBlueButton>

                    </BtnGroupMenu>

                </DescriptionMenu>
            
        </>
    )


}

export default BackgroundMenu;