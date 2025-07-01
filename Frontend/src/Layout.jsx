import styled from "styled-components";
import MainMenu from "./components/MainMenu";
import Sidebar from "./components/SideBar";
import { Outlet } from 'react-router-dom';
const ContentWrapper  = styled.div`
    display:flex;
`
export default function RootLayout(){
    return(
        <>
            
            
            <ContentWrapper>
                <Sidebar/>
                <div>
                    <MainMenu></MainMenu>
                    <Outlet />
                </div>
            </ContentWrapper>
        </>
    )
}