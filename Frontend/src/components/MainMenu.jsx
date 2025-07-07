import logo from '../assets/logo.png'
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart,FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { Dropdown } from './Dropdown';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { useLogOut } from '../services/hook/LogOutHook';
import { toast } from "react-toastify";
import { IoMdMenu } from "react-icons/io";
const MainMenuContainer = styled.div`
    position:fixed;
    z-index:1111;
    width: 100%;
    background-color: #003459;
    
    
`
const MainMenuItem = styled.div`
    margin: auto;
    width:90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    
    
    @media (min-width: 0px) and (max-width: 598.99px) {
        width:95%; 
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        width:95%;
    }
    @media (min-width: 1312px) and (max-width: 1500.00px) {
        width:90%;
    }

    

    
`
const ButtonMenu = styled.div`
    display: flex;
    flex-direction: row;
    width:36%;
    justify-content:space-between;
    flex-shrink: 0;
    
    @media (min-width: 0px) and (max-width: 1050px) {
        display:none;
    }
`


const TitleBtnMenu = styled.div`
    position: relative;
    padding-block:1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.2rem;
    color: white;
    transition: opacity 0.15s;
    &:hover{
        color:rgba(255, 255, 255, 0.78);
    }

    .search-icon{
        width:30px; 
        height:30px;
        @media (min-width: 0px) and (max-width: 598.99px) {
            width:15px; 
            height:15px;
        
        }
    }

    @media (min-width: 0px) and (max-width: 399.99px) {
        font-size: 0.4rem;
        
    }
    @media (min-width: 400px) and (max-width: 598.99px) {
        font-size: 0.5rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.6rem;
        
    }
    @media (min-width: 800px) and (max-width: 1000.98px) {
        font-size: 0.6rem;
        
    }

    @media (min-width: 1001px) and (max-width: 1500px) {
        font-size: 0.7rem;
        
    }
    
`


const LogoImg = styled.img`
    width: 100px;
    height: 50px;
    object-fit: cover;
    @media (min-width: 0px) and (max-width: 399.99px) {
        width: 40px;
        height: 20px;
        
    }
    @media (min-width: 400px) and (max-width: 598.99px) {
        width: 50px;
        height: 30px;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        width: 80px;
        height: 50px;
        
    }

`


const SearchContainer = styled.div`
    width:35%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap:0.5rem;
    @media (min-width: 300px) and (max-width: 598.99px) {
        width:50%;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        width:60%;
        
    }
    @media (min-width: 800px) and (max-width: 1000px) {
        width:60%;
        
    }
`

const SearchInputWrapper = styled.div`
    background-color: white;
    border-radius: 15px;
    width: 75%;
    display: flex;
    
    flex-direction: row;
    align-items: center;
    padding: 0.6rem;
    @media (min-width: 300px) and (max-width: 598.99px) {
        padding: 0rem;
        
    }
     @media (min-width: 300px) and (max-width: 598.99px) {
        padding: 0.1rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding: 0.2rem;
        
    }
    
    
    
`


const SearchSelect = styled.select`
    border-radius: 15px;
    font-size: 0.9rem;
    width: 26%;
    padding-inline: 0.2rem;
    padding-left:0.3rem;
    @media (min-width: 300px) and (max-width: 598.99px) {
        font-size: 0.5rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.6rem;
    }
    @media (min-width: 800px) and (max-width: 1000px) {
        font-size: 0.7rem;
        
    }
        
`
const InputMenu = styled.input`
    
    margin-left: 3px;
    width: 100%;
    border:none;
    background-color: transparent;
    font-size: 0.9rem;
    &:focus{
    
        outline: none;
        border: none;
    
    }

    @media (min-width: 300px) and (max-width: 598.99px) {
        font-size: 0.5rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.6rem;
    }
    @media (min-width: 800px) and (max-width: 1000px) {
        font-size: 0.7rem;
        
    }

`

const ButtonMenu_Responsive = styled.div`
    width:14%;
    
    display: flex;
    flex-direction: row;
    // gap:1rem;
    justify-content: space-between;
    
    flex-shrink: 0;
    @media (min-width: 300px) and (max-width: 598.99px) {
        width:20%; 
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        width:20%;   
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        width:20%;
        
    }
    
`
const SidebarBtn = styled.div`
    
    align-items:center;
    justify-content:center;
    padding:0.5rem;
    color:white;
    border-radius:100%;
    background-color:var(--main-blue);
    display:none;
    font-size:1.4rem;

    cursor:pointer;
    &:hover{
        background-color: rgb(2, 79, 134);
    }

    &:active{
        background-color: rgb(1, 84, 143);
    }

    @media (min-width: 0px) and (max-width: 1050px) {
        display:flex;
    }
    @media (min-width: 300px) and (max-width: 598.99px) {
        font-size:0.9rem; 
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size:1rem; 
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        font-size:1.2rem;
        
    }

`
function MainMenu({isSidebar,setIsSidebar}) {
    const {mutate:logoutHook} =useLogOut();
    const {accessToken,logout} = useContext(AuthContext);
    
    const [isHoverDog,setIsHoverDog] = useState(false);
    const [isHoverCat,setIsHoverCat] = useState(false);
    const [isHoverProduct,setIsHoverProduct] = useState(false);
    const [Keyword,setKeyword] = useState("");
    const [searchOption,setSearchOption] = useState("All");
    const navigate = useNavigate()

    
    const handleHoverIn = (menu) =>{
        if(menu==="Dog")
            setIsHoverDog(true)
        else if (menu==="Cat")
            setIsHoverCat(true)
        else
            setIsHoverProduct(true)
    }

    const handleHoverOut = (menu) =>{
        
        if(menu==="Dog")
            setIsHoverDog(false)
        else if (menu==="Cat")
            setIsHoverCat(false)
        else
            setIsHoverProduct(false)
    }

    const handleNavHome = ()=>{
            navigate("/")
    }
    const handleNavCart = ()=>{
            navigate("/cart")
    }
    const handleNavInfo = ()=>{
            navigate("/info")
    }
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
            case "Log In":
                navigate("/dang-nhap")
                break;
            case "Sign Up":
                navigate("/dang-ky")
                break;
        }
    }
    const handleKeyDown = (event) =>{
        if (event.key === 'Enter') {
            switch(searchOption){
                case "All":
                    navigate(`/category/tim-kiem/all/${Keyword}`)
                    break;
                case "Chó":
                    navigate(`/category/tim-kiem/cho-canh/${Keyword}`)
                    break;
                case "Mèo":
                    navigate(`/category/tim-kiem/meo-canh/${Keyword}`)
                    break;
                case "Phụ kiện":
                    navigate(`/category/tim-kiem/phu-kien/${Keyword}`)
                    break;
            }
            
        }

    }

    const HandleLogout =  ()=>{
        logoutHook(
            {},
            {
                onSuccess:(data)=>{
                    toast.success("Đăng xuất thành công")
                    
                    logout();
                },
                onError:(error)=>{
                    toast.error("Đăng xuất thất bại")
                }
            }
        )
    }
    return (
      <>
        <MainMenuContainer>
            <MainMenuItem>
                <SidebarBtn onClick={()=>setIsSidebar(!isSidebar)}>
                    <IoMdMenu></IoMdMenu>

                </SidebarBtn>
                <div className='logo-menu' style={{cursor:"pointer"}} onClick={()=>handleNavHome()}>
                    <LogoImg src={logo} width="115px" height="40px"/>
                </div>

                <ButtonMenu>
                    <TitleBtnMenu 
                        onClick={()=>handleNavHome()}
                    >
                        Trang chủ 
                        
                    </TitleBtnMenu>

                    <TitleBtnMenu 
                        onMouseOver={()=>handleHoverIn("Dog")} 
                        onMouseOut={()=>handleHoverOut("Dog")}
                        
                    >


                        <div onClick={()=>handleNavItem("Dog")} >Chó cảnh</div>
                        <RiArrowDropDownLine className="search-icon"  />

                        { isHoverDog? <Dropdown menuType={1} setHover={setIsHoverDog}
                            />:<></>  }
                        
                    </TitleBtnMenu>


                    
                    <TitleBtnMenu onMouseOver={()=>handleHoverIn("Cat")} 
                        onMouseOut={()=>handleHoverOut("Cat")}
                        
                        >
                        <div onClick={()=>handleNavItem("Cat")} >Mèo cảnh</div>

                        <RiArrowDropDownLine style={{width:"30px",height:"30px"}}
                        />

                        { isHoverCat? <Dropdown menuType={2} setHover={setIsHoverCat}/>:<></>  }

                    </TitleBtnMenu>

                    <TitleBtnMenu onMouseOver={()=>handleHoverIn("Product")} 
                        onMouseOut={()=>handleHoverOut("Product")}
                        >
                        <div onClick={()=>handleNavItem("Product")}>Phụ kiện</div>
                        <RiArrowDropDownLine style={{width:"30px",height:"30px"}}
                        />

                        { isHoverProduct? <Dropdown menuType={3}/>:<></>  }

                    </TitleBtnMenu>
                </ButtonMenu>

                <SearchContainer>

                        <SearchSelect onChange={(e)=>setSearchOption(e.target.value)}>
                            <option value="All">Tất cả</option>
                            <option value="Chó">Chó cảnh</option>
                            <option value="Mèo">Mèo cảnh</option>
                            <option value="Phụ kiện">Phụ kiện</option>
                        </SearchSelect>

                        
                            <SearchInputWrapper>
                                <CiSearch id="search-icon" style={{width: "1.5rem",height: "1.5rem"}}/>

                                <InputMenu 

                                    className='input-menu' 
                                    placeholder='Tìm kiếm...' 
                                    classtype="text" 
                                    onChange={(e)=>setKeyword(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                ></InputMenu>
                            
                            </SearchInputWrapper>
                        

                </SearchContainer>

                

                <ButtonMenu_Responsive>

                {accessToken?
                        <>
                            <TitleBtnMenu onClick={()=>handleNavCart()}>
                                <FaShoppingCart></FaShoppingCart>
                            </TitleBtnMenu>
                            <TitleBtnMenu onClick={()=>handleNavInfo()}>
                                
                                <FaUserCircle></FaUserCircle>
                            </TitleBtnMenu>
                                
                            
                            <TitleBtnMenu onClick={()=>HandleLogout()}>
                                Đăng xuất
                            </TitleBtnMenu>
                        </>
                    :
                    <>
                        <TitleBtnMenu onClick={()=>handleNavItem("Sign Up")}>
                            Đăng ký
                        </TitleBtnMenu>

                        <TitleBtnMenu  onClick={()=>handleNavItem("Log In")}>
                            Đăng nhập
                        </TitleBtnMenu>
                    </>


                    
                    }
                    

            </ButtonMenu_Responsive>

            </MainMenuItem>
                
            

        </MainMenuContainer>
          
      </>
    )
  }
export default MainMenu;