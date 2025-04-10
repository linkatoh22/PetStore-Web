// import '../styles/components/Footer.css'
import logo from '../assets/logo.png'
import FbGraySVG from '../assets/svg/facebook/Fb-gray';
import InsGraySVG from '../assets/svg/instagram/Ins-gray';
import TwitterGraySVG from '../assets/svg/twitter/Twitter-gray';

import styled from "styled-components";


const MainFooter = styled.footer`
  background-color: #FCEED5;
  display: flex;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 30px;
  flex-direction: column;
  padding-left: 180px;
  padding-right: 180px;
  gap: 20px;
`;

const RegisterContainer = styled.div`
  width: 100%;
  padding: 30px;
  border-radius: 20px;
  background-color: #003459;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SubscribeTitle = styled.div`
  width: 30%;
  font-weight: bold;
  font-size: 30px;
  color: white;
`;

const SubscribeContainer = styled.div`
  border-radius: 10px;
  background-color: white;
  display: flex;
  width: 65%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SubscribeGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const EmailSubscribe = styled.input`
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  font-size: 18px;
  width: 80%;
  height: 30%;
  padding: 10px 15px;
  border-color: rgb(200, 200, 200);
  margin-right: 10px;

  &:focus {
    outline: none;
  }
`;

const EmailBtn = styled.button`
  background-color: #003459;
  color: white;
  font-size: 15px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  padding: 16px 10px;
`;

const MiniMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MiniMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 25px;
`;

const MenuBtn = styled.button`
  font-size: 15px;
`;

const LineDivider = styled.hr`
  border-top: 1px solid #bbb;
`;



function Footer(){
    return (
        <>
            <MainFooter className="main-footer">
                
                
                        <RegisterContainer className="register-container">

                            <SubscribeTitle className='subscribe-title'>Register Now So You Don't Miss Our Programs</SubscribeTitle >
                            <SubscribeContainer className="subscribe-container">
                                
                                    <EmailSubscribe 
                                    className="email-subscribe"
                                    placeholder="Enter your email" 
                                    type="text"/>
                                    <EmailBtn className="email-btn">Subscribe Now</EmailBtn>
                                
                            </SubscribeContainer>


                        </RegisterContainer>


                        <MiniMenu className="mini-menu">
                            <MiniMenuContainer className="mini-menu-container">
                                <MenuBtn className="menu-btn"> Home </MenuBtn>
                                <MenuBtn className="menu-btn"> Category </MenuBtn>
                                <MenuBtn className="menu-btn"> About </MenuBtn>
                                <MenuBtn className="menu-btn"> Contact </MenuBtn>
                            </MiniMenuContainer>


                            <MiniMenuContainer className="mini-menu-container">


                            
                                <MenuBtn className="menu-btn"> <FbGraySVG ></FbGraySVG> </MenuBtn>
                                <MenuBtn className="menu-btn"> <InsGraySVG ></InsGraySVG> </MenuBtn>
                                <MenuBtn className="menu-btn"> <TwitterGraySVG> </TwitterGraySVG> </MenuBtn>
                                
                            </MiniMenuContainer>
                            


                            <LineDivider className="line-divider"></LineDivider>
                        </MiniMenu>
                        
                        

                        
                
                       
            </MainFooter>

            
        </>
    )


}

export default Footer;