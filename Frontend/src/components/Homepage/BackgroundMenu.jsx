import MainMenu from './../MainMenu';
import styled from 'styled-components';
import Background from "../../assets/background.png"
const BackgroundMenuContainer = styled.div`
  background-image: ${`url(${Background})`};
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  max-width: 100%;
  height: 680px;
`;

const MenuContainer = styled.div`
  width: 80%;
  margin: auto;
`;

const DescriptionMenu = styled.div`
  max-width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  gap: 5px;
  left: 10%;
  top: 32%;
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

const ParagaphMenu = styled.div`
  max-width: 50%;
  font-size: var(--fs-m);
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

function BackgroundMenu(){

    return (

        <>
            <BackgroundMenuContainer>

                {/* <MenuContainer>

                    <MainMenu/>

                </MenuContainer> */}


                <DescriptionMenu>
                    
                    <Header1Menu>One More Friend</Header1Menu>
                    <Header2Menu>Thousands More Fun!</Header2Menu>
                    <ParagaphMenu>Having a pet meas you have more joy, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!</ParagaphMenu>
                    <BtnGroupMenu>

                        <TransparentBlueButton className="transparent-blue-button"> View Intro</TransparentBlueButton>

                        <BlueButton className="blue-button"> Explore Now</BlueButton>

                    </BtnGroupMenu>

                </DescriptionMenu>
            </BackgroundMenuContainer>
        </>
    )


}

export default BackgroundMenu;