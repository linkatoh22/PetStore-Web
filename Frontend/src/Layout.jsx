import styled from "styled-components";
import MainMenu from "./components/MainMenu";
import Sidebar from "./components/SideBar";
import { Outlet } from 'react-router-dom';
import { useState } from "react";

const ContentWrapper  = styled.div`
    display:flex;
`
export default function RootLayout(){
    const [isSidebar,setIsSidebar] = useState(false)
    return(
        <>
            <MainMenu isSidebar={isSidebar} setIsSidebar={setIsSidebar} ></MainMenu>
            
            <ContentWrapper>
                    { isSidebar && <Sidebar isVisible={isSidebar} setIsSidebar={setIsSidebar}/> }
                
                
                    
                    <Outlet />
                
            </ContentWrapper>
        </>
    )
}