import MainMenu from './../MainMenu';
import styled from 'styled-components';
import Background from "../../assets/background.png"
import HoldHandPic from "../../assets/holdhand.png"
import CategoryPic from "../../assets/background-0.jpg"
import { useState } from 'react';


import { useNavigate } from 'react-router-dom';


const BackgroundMenuContainer = styled.div`
  position: relative;
  width: 100%;
  height: 890px;
  background-image: url(${Background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (min-width: 0px) and (max-width: 598.99px) {
     height: 350px;
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
    height: 450px;
  }
  @media (min-width: 800px) and (max-width: 1199.98px) {
    height: 540px;
  }
  @media (min-width: 1200px) and (max-width: 1500px) {
    height: 650px;
  }
        
`;



const DescriptionMenu = styled.div`
  
  display: flex;
  position: absolute;
  flex-direction: column;
  gap: 0.5rem;
  left: 5%;
  top: 35%;

  @media (min-width: 0px) and (max-width: 598.99px) {
     gap: 0.3rem;
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
    gap: 0.3rem;
  }
  
`;

const Header1Menu = styled.div`
  color: #002a48;
  font-size: 4.5rem;
  font-weight: bold;

  
    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 1rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size: 2rem;
    }

    @media (min-width: 800px) and (max-width: 999.99px) {
        font-size: 2.5rem;
        
    }
    @media (min-width: 1000px) and (max-width: 1500px) {
        font-size: 3rem;
        
    }
`;

const Header2Menu = styled.div`
  color: #002a48;
  
  font-weight: 550;

  

  font-size: 3.5rem;
    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.7rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size: 1.5rem;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        font-size: 2rem;
    }
    @media (min-width: 1000px) and (max-width: 1500px) {
        font-size: 2.5rem;
        
    }
`;

const ParagraphMenu = styled.div`

  width: 40%;
  font-weight: 450;
  font-size: 1.2rem;
    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.5rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size: 0.6rem;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        font-size: 0.8rem;
        
    }
    @media (min-width: 1000px) and (max-width: 1500px) {
        font-size: 0.9rem;
        
    }
`;

const BtnGroupMenu = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
        margin-top: 0.5rem;
        gap: 0.5rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
      margin-top: 0.6rem;
       gap: 0.6rem;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        margin-top: 0.7rem;
        gap: 0.7rem;
        
    }

    @media (min-width: 1000px) and (max-width: 1500px) {
        margin-top: 0.8rem;
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


  @media (min-width: 0px) and (max-width: 598.99px) {
    border-width: 1px;
      font-size: 0.5rem ;
        padding-inline: 0.5rem;
        padding-block: 0.2rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        border-width: 1px;
        font-size: 0.5rem ;
       padding-inline: 0.8rem;
      padding-block: 0.6rem;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        font-size: 0.8rem ;
        padding-inline: 1rem;
        padding-block: 0.6rem;
        
    }
    
    @media (min-width: 1000px) and (max-width: 1500px) {

        font-size: 0.9rem ;
        padding-inline: 1rem;
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
            

                    
                   

                <DescriptionMenu>
               

                    <Header1Menu>Thêm một người bạn</Header1Menu>
                    <Header2Menu>Thêm vạn niềm vui!</Header2Menu>
                    <ParagraphMenu>Việc nuôi thú cưng đồng nghĩa với việc bạn sẽ có thêm niềm vui, một người bạn hạnh phúc luôn đồng hành cùng bạn để tận hưởng những khoảnh khắc vui vẻ. Chúng tôi có hơn 200+ loài thú cưng khác nhau để đáp ứng nhu cầu của bạn!</ParagraphMenu>

                    

                    <BtnGroupMenu>
                        <a href='/category/meo-canh'>
                        <TransparentBlueButton 
                        // onClick={()=>handleNavItem("Cat")}
                        className="transparent-blue-button" 
                        > Mèo cảnh</TransparentBlueButton>
                        </a>

                        <a href='/category/cho-canh'>
                        <TransparentBlueButton 
                        //  onClick={()=>handleNavItem("Dog")}
                        className="transparent-blue-button"> Chó cảnh</TransparentBlueButton>
                        </a>

                        <a href='/category/phu-kien'>
                        <TransparentBlueButton 
                        // onClick={()=>handleNavItem("Product")}
                        className="transparent-blue-button" 
                        
                        > Phụ kiện thú cưng</TransparentBlueButton>
                        </a>

                    </BtnGroupMenu>

                </DescriptionMenu>
            </BackgroundMenuContainer>
          
            
        </>
    )


}

export default BackgroundMenu;