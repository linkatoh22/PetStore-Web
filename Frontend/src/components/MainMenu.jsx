import logo from '../assets/logo.png'
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaRegUser,FaCartPlus } from "react-icons/fa";
import styled from "styled-components";
import { Dropdown } from './Dropdown';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { useLogOut } from '../services/hook/LogOutHook';
import { toast } from "react-toastify";

const MainMenuContainer = styled.div`
    width: 100%;
    background-color: #003459;
`
const MainMenuItem = styled.div`
    margin: auto;
    width:85%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const ButtonMenu = styled.div`
    display: flex;
    flex-direction: row;
    gap:1.5rem;
    flex-shrink: 0;
`
const ButtonMenu2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content: space-between;
    gap:1.2rem;
    flex-shrink: 0;
`

const TitleBtnMenu = styled.div`
    position: relative;
    padding-block:1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    color: white;
    transition: opacity 0.15s;
    &:hover{
        color:rgba(255, 255, 255, 0.78);
    }
`
const SearchInputWrapper = styled.div`
    background-color: white;
    border-radius: 15px;
    width: 450px;
    display: flex;
    
    flex-direction: row;
    align-items: center;
    padding: 10px;
`

const LogoImg = styled.img`
    width: 100px;
    height: 50px;
    object-fit: cover;

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
`

const SearchContainer = styled.div`
    
    display: flex;
    flex-direction: row;
    gap:0.5rem;
    
`
const SearchSelect = styled.select`
    border-radius: 15px;
    font-size: 0.9rem;
    padding-inline: 0.2rem;
    padding-left:0.3rem;
`
const btnMenu = styled.button`
    margin-left: 25px;
    font-size: 16px;
    border:none;
    background-color:#003459;
    color:white;
    display: inline-block;
    padding: 10px 20px 10px 20px;
    border-radius: 20px;
    transition: opacity 0.15s;
    cursor: pointer;
    &:active{
        opacity: 0.8;
    }
`
function MainMenu() {
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
                    toast.success("Đăng xuất thất bại")
                }
            }
        )
    }
    return (
      <>
        <MainMenuContainer>
            <MainMenuItem>

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
                    <RiArrowDropDownLine style={{width:"30px",height:"30px"}} />

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

                    <div className='search-input-container'>
                        <SearchInputWrapper>
                            <CiSearch id="search-icon" style={{width: "1.5rem",height: "1.5rem"}}/>

                            <InputMenu 

                                className='input-menu' 
                                placeholder='Nhập từ khóa tìm kiếm' 
                                classtype="text" 
                                onChange={(e)=>setKeyword(e.target.value)}
                                onKeyDown={handleKeyDown}
                            ></InputMenu>
                        
                        </SearchInputWrapper>
                    </div>

            </SearchContainer>

            

            <ButtonMenu2>

            {accessToken?
                    <>
                        <TitleBtnMenu onClick={()=>handleNavCart()}>Cart</TitleBtnMenu>
                        <div>Info</div>
                        
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
                

            </ButtonMenu2>

            </MainMenuItem>
                
            

        </MainMenuContainer>
          
      </>
    )
  }
export default MainMenu;