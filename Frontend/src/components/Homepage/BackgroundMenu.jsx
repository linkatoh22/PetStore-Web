import MainMenu from './../MainMenu';
import styled from 'styled-components';
import Background from "../../assets/background.png"
import HoldHandPic from "../../assets/holdhand.png"
import CategoryPic from "../../assets/background-0.jpg"
import { useState } from 'react';


import { useNavigate } from 'react-router-dom';
const BackgroundMenuContainer = styled.img`
  
  // background-size: cover;
  // background-repeat: no-repeat;
  position: relative;
  width: 100%;
  height: 720px;
  object-fit:cover
`;



const DescriptionMenu = styled.div`
  
  display: flex;
  position: absolute;
  flex-direction: column;
  gap: 5px;
  left: 9%;
  top: 30%;
`;

const Header1Menu = styled.div`
  color: #002a48;
  font-size: var(--fs-xl);
  font-weight: bold;
`;

const Header2Menu = styled.div`
  color: #002a48;
  font-size: var(--fs-l);
  font-weight: 550;
`;

const ParagraphMenu = styled.div`

  width: 40%;
  font-size: var(--fs-m);
  font-weight: 450;
`;

const BtnGroupMenu = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;

const TransparentBlueButton = styled.button`
  background-color: transparent;
  border-style: solid;
  border-width: 2px;
  font-weight: bold;
  border-color: var(--clr-dark-blue);
  color: var(--clr-dark-blue);
  font-size: var(--fs-m);
  cursor: pointer;
  border-radius: 100px;
  padding-inline: 2vw;
  padding-block: 0.6vw;
  transition: background-color 0.15s;

  &:active {
    background-color: white;
    color: #003459;
  }
`;

const BlueButton = styled.button`
  background-color: #003459;
  color: white;
  font-size: var(--fs-m);
  font-weight: bold;
  border: none;
  border-radius: 100px;
  padding-inline: 2vw;
  padding-block: 0.5vw;
  transition: background-color 0.15s;
  cursor: pointer;

  &:active {
    background-color: #0063aa;
  }
`;
const SlideShow =[Background,HoldHandPic,CategoryPic]
function BackgroundMenu(){
    const navigate = useNavigate()
    const [slideShowIndex,setSlideShowIndex] = useState(0)

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
            <BackgroundMenuContainer src={SlideShow[slideShowIndex]}>
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