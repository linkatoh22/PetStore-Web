import styled from "styled-components";
import MainMenu from "./components/MainMenu";
import Sidebar from "./components/SideBar";
import { Outlet } from 'react-router-dom';
import { useState } from "react";

const ContentWrapper  = styled.div`
    display:flex;
`
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  z-index: 5; 
  transition: opacity 0.3s ease;
`;
export default function RootLayout(){
    const [isSidebar,setIsSidebar] = useState(false)
    return(
        <>
            <MainMenu isSidebar={isSidebar} setIsSidebar={setIsSidebar} ></MainMenu>
             
            <ContentWrapper>
                    <Sidebar isVisible={isSidebar} setIsSidebar={setIsSidebar}/>
                    {isSidebar && <Overlay onClick={() => setIsSidebar(false)} />}
                
                    
                    <Outlet />
                
            </ContentWrapper>
            
        </>
    )
}