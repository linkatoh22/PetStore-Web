import React, { useEffect, useState } from "react";
import { IoLogoOctocat } from "react-icons/io";
import Logo from "../assets/logo.png"
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Dog = ["Beagle","Boston Terrier","Corgi","Poodle","Husky","Chihuahua","Pug","Golden Retriever","Labrador","Phốc Sóc","Samoyed","Shiba Inu"];

const Cat =["Anh Lông Dài","Anh Lông Ngắn","Ba Tư","Himalaya","Munchkin","Ragdoll","Scottish Fold"];

const ProductFoodDog = ["Thức ăn Hạt","Sữa Cho Bé Lớn Và Nhỏ","Pate & Nước Sốt","Bánh thưởng & Xương Gặm"]
const ProductFoodCat = ["Thức ăn Hạt","Sữa Cho Bé Lớn Và Nhỏ","Pate & Nước Sốt","Bánh thưởng & Xương Gặm"]

const ProductAccessoriesDog=["Quần áo","Đồ chơi","Vòng cổ & Dây Dắt & Rọ mỏm","Bình nước & Bát ăn & Lược Chải"];
const ProductAccessoriesCat=["Quần áo","Đồ chơi","Vòng cổ & Dây Dắt & Phụ Kiện","Bình nước & Bát ăn & Lược Chải"];

const ProductHygineCareDog=["Sữa Tắm & Khăn Tắm & Nước Hoa","Bỉm & Tã & Khay Vệ Sinh"];
const ProductHygineCareCat=["Sữa Tắm & Khăn Tắm & Nước Hoa","Cát vệ sinh cho mèo"];

const ProductCageDog=["Chuồng & Nhà & Chậu Cát","Balo & Túi Vận Chuyển","Đệm & Nệm & Ổ nằm"];
const ProductCageCat=["Chuồng & Nhà & Chậu Cát","Balo & Túi Vận Chuyển","Đệm & Nệm & Ổ nằm"];

const ProductMedicineDog=["Thuốc Thú Y & Thiết bị y Tế","Thực Phẩm Chức Năng"];
const ProductMedicineCat=["Thuốc Thú Y & Thiết bị y Tế","Thực Phẩm Chức Năng"];


const SidebarContainer  = styled.div`
    padding-top: 3rem;
    position: fixed;
  
  height: 100vh;
  width: 300px;
  background-color: var(--main-blue);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.5s ease;
  transform: ${({ isVisible }) => (isVisible ? "translateX(0%)" : "translateX(-100%)")};
  z-index: 10;
  overflow-y: auto;

  @media (min-width: 300px) and (max-width: 598.99px) {
        width: 150px;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
    padding-top: 2.5rem;
        width: 200px;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        
        width: 250px;
        
    }
    
  
`
const NavList = styled.ul`
  list-style: none;
  width:100%;
  padding: 0;
`;

const NavItemContainer = styled.div`
    width:100%;
    cursor:pointer;
    color:white;
    
    display:flex;
    align-items:center;
    justify-content: space-between;

    
`

const NavLink = styled.a`
    width:100%;
    
  color: var(--grey-300);
  font-weight:bold;
  font-size:1rem;
  text-decoration: none;
  &:hover {
    color: white;
  }

    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size:0.4rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size:0.5rem;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        font-size:0.8rem;
        
    }
`;

const NavItem = styled.li`
    width:100%;
    border-top:1px solid white;
    border-bottom:1px solid white;
    padding-inline:1.5rem;
    padding-block:1rem;

    @media (min-width: 300px) and (max-width: 598.99px) {
        padding-inline:0.9rem;
        padding-block:0.6rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding-inline:1.1rem;
        padding-block:0.6rem;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        padding-inline:1.3rem;
        padding-block:0.8rem;
        
    }
        
`;

const NavSubItem = styled.li`
width:100%;
    border-left:1px solid white;
    // border-bottom:1px solid white;
    padding-inline:0.8rem;
    padding-block:0.4rem;


    @media (min-width: 300px) and (max-width: 598.99px) {
        padding-inline:0.4rem;
        padding-block:0.2rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding-inline:0.4rem;
        padding-block:0.2rem;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        padding-inline:0.8rem;
        padding-block:0.4rem;
        
    }
`;

const SubNavList = styled.ul`
width:100%;
  list-style: none;
  padding: 1rem;
`;

const SidebarBtn = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    padding:0.5rem;
    color:white;
   
    border-radius:100%;
    background-color:var(--main-blue);
    font-size:1.4rem;
    cursor:pointer;
    &:hover{
        background-color: rgb(2, 79, 134);
    }

    &:active{
        background-color: rgb(1, 84, 143);
    }

    

`

export default function Sidebar ({isVisible,setIsSidebar}){

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1050) {
            setIsSidebar(false);
            }
        };

        // Run once on mount
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [isDogMenu,setIsDogMenu] = useState(false);
    const [isCatMenu,setIsCatMenu] = useState(false);

    const [isProduct, setIsProduct] = useState(false);

    const [isProductTypeDog,setIsProductTypeDog] = useState(false);
    const [isProductFoodDog,setIsProductFoodDog] = useState(false);
    const [isProductAccessoriesDog,setIsProductAccessoriesDog] = useState(false);
    const [isProductHygineDog,setIsProductHygineDog] = useState(false);
    const [isProductCageDog,setIsProductCageDog] = useState(false);
    const [isProductMedicineDog,setIsProductMedicineDog] = useState(false);

    const [isProductTypeCat,setIsProductTypeCat] = useState(false);
    const [isProductFoodCat,setIsProductFoodCat] = useState(false);
    const [isProductAccessoriesCat,setIsProductAccessoriesCat] = useState(false);
    const [isProductHygineCat,setIsProductHygineCat] = useState(false);
    const [isProductCageCat,setIsProductCageCat] = useState(false);
    const [isProductMedicineCat,setIsProductMedicineCat] = useState(false);

  return (
    <SidebarContainer
         isVisible={isVisible}
    >
        <div style={{padding:"1rem",width:"100%",display:"flex",justifyContent:'flex-end'}}>
            <SidebarBtn onClick={()=>setIsSidebar(!isVisible)}>
                <IoMdClose></IoMdClose>
            </SidebarBtn>
        </div>

            <NavList>
                <NavItem style={{borderTop:"3px solid white"}} >
                    <NavLink href="/">TRANG CHỦ</NavLink>
                </NavItem>


                <NavItem>
                    <NavItemContainer>
                        <NavLink 
                        href="/category/cho-canh" 

                        >
                            CHÓ CẢNH
                            
                            
                        </NavLink>

                            {
                                isDogMenu?
                                <FaChevronUp  onClick={()=>setIsDogMenu(isDogMenu?false:true)} ></FaChevronUp>:
                                <FaChevronDown  onClick={()=>setIsDogMenu(isDogMenu?false:true)} ></FaChevronDown>

                            }
                            
                    </NavItemContainer>
                    
                    
                    {isDogMenu&&(
                        <SubNavList>
                            {Dog.map(item=>{
                                return <NavSubItem>
                                            <NavLink href={`/category/cho-canh/${item}`}>{item}</NavLink>
                                        </NavSubItem>
                            })}
                        </SubNavList>

                    )}
                    
                </NavItem>


                <NavItem>
                    <NavItemContainer>
                        <NavLink 
                        href="/category/meo-canh"
                        
                        >   
                            
                            MÈO CẢNH
                        </NavLink>

                         {
                                isCatMenu?
                                <FaChevronUp  onClick={()=>setIsCatMenu(isCatMenu?false:true)} ></FaChevronUp>:
                                <FaChevronDown  onClick={()=>setIsCatMenu(isCatMenu?false:true)} ></FaChevronDown>

                        }

                    </NavItemContainer>

                    {isCatMenu&&(
                    <SubNavList>
                        {Cat.map(item=>{
                            return <NavSubItem>
                                        <NavLink href={`/category/meo-canh/${item}`} >{item}</NavLink>
                                    </NavSubItem>
                        })}
                    </SubNavList>
                    )}

                </NavItem>

                <NavItem style={{borderBottom:"3px solid white"}}>
                        <NavItemContainer >
                            <NavLink 
                                href="/category/phu-kien"
                                
                            >PHỤ KIỆN</NavLink>

                            {
                                isProduct?
                                <FaChevronUp  onClick={()=>setIsProduct(isProduct?false:true)} ></FaChevronUp>:
                                <FaChevronDown  onClick={()=>setIsProduct(isProduct?false:true)} ></FaChevronDown>

                            }

                        </NavItemContainer>
                    
                    {isProduct && (
                        <SubNavList>
                            <NavSubItem>

                                <NavItemContainer>
                                    <NavLink 
                                        href="/category/phu-kien/phu-kien-cua-cho"
                                    >   PHỤ KIỆN CỦA CHÓ </NavLink> 

                                    {
                                        isProductTypeDog?
                                        <FaChevronUp  onClick={()=>setIsProductTypeDog(isProductTypeDog?false:true)} ></FaChevronUp>:
                                        <FaChevronDown  onClick={()=>setIsProductTypeDog(isProductTypeDog?false:true)} ></FaChevronDown>

                                    }


                                </NavItemContainer>


                                {isProductTypeDog && (
                                    <SubNavList>

                                        <NavSubItem>
                                           <NavItemContainer>
                                                <NavLink 
                                            
                                                href={`/category/phu-kien/phu-kien-cua-cho/Thức%20ăn%20&%20Thực%20phẩm%20dinh%20dưỡng`} 
                                                >THỨC ĂN & THỰC PHẨM DINH DƯỠNG
                                                </NavLink>

                                                 {
                                                    isProductFoodDog?

                                                    <FaChevronUp   onClick={()=>setIsProductFoodDog(isProductFoodDog?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown    onClick={()=>setIsProductFoodDog(isProductFoodDog?false:true)} ></FaChevronDown>

                                                }
                                            </NavItemContainer> 

                                            {isProductFoodDog&&(<SubNavList>
                                                {ProductFoodDog.map((item)=>{
                                                    return <NavSubItem>
                                                                <NavLink href={`/category/phu-kien/phu-kien-cua-cho/Thức%20ăn%20&%20Thực%20phẩm%20dinh%20dưỡng/${item}`}>{item}</NavLink>
                                                            </NavSubItem>
                                                })}
                                            </SubNavList>)}

                                        </NavSubItem>
                                            
                                            


                                        <NavSubItem>
                                            <NavItemContainer>
                                                <NavLink 
                                                

                                                    href="/category/phu-kien/phu-kien-cua-cho/Đồ%20dùng%20&%20Đồ%20chơi%20&%20Phụ%20kiện"
                                                    >ĐỒ DÙNG & ĐỒ CHƠI & PHỤ KIỆN
                                                </NavLink>
                                                
                                                 {
                                                    isProductAccessoriesDog?

                                                    <FaChevronUp   onClick={()=>setIsProductAccessoriesDog(isProductAccessoriesDog?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown    onClick={()=>setIsProductAccessoriesDog(isProductAccessoriesDog?false:true)} ></FaChevronDown>

                                                }

                                            </NavItemContainer>


                                            { isProductAccessoriesDog &&(<SubNavList>
                                                {ProductAccessoriesDog.map((item)=>{
                                                    return <NavSubItem>
                                                        <NavLink href={`/category/phu-kien/phu-kien-cua-cho/Đồ%20dùng%20&%20Đồ%20chơi%20&%20Phụ%20kiện/${item}`}>{item}</NavLink>
                                                    </NavSubItem>
                                                })}
                                            </SubNavList>)}


                                        </NavSubItem>

                                            
                                        <NavSubItem>
                                            <NavItemContainer>
                                                <NavLink 
                                                onClick={()=>setIsProductHygineDog(isProductHygineDog? false:true)}
                                                href="/category/phu-kien/phu-kien-cua-cho/Vệ%20sinh%20&%20Chăm%20sóc" >VỆ SINH & CHĂM SÓC</NavLink>

                                                 {
                                                    isProductHygineDog?

                                                    <FaChevronUp  onClick={()=>setIsProductHygineDog(isProductHygineDog?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown    onClick={()=>setIsProductHygineDog(isProductHygineDog?false:true)} ></FaChevronDown>

                                                }
                                            
                                                
                                            </NavItemContainer>
                                                {isProductHygineDog &&(
                                                    <SubNavList>
                                                    {ProductHygineCareDog.map((item)=>{
                                                        return <NavSubItem>
                                                            <NavLink href={`/category/phu-kien/phu-kien-cua-cho/Vệ%20sinh%20&%20Chăm%20sóc/${item}`}>{item}</NavLink>
                                                        </NavSubItem>
                                                    })}
                                                </SubNavList>
                                                )}
                                               
                                            
                                        </NavSubItem>

                                            

                                        <NavSubItem>
                                            <NavItemContainer>
                                                <NavLink 
                                                onClick={()=>setIsProductCageDog(isProductCageDog? false:true)}
                                                href="/category/phu-kien/phu-kien-cua-cho/Chuồng%20&%20Nhà%20&%20Balo%20&%20Quây%20&%20Đệm" > CHUỒNG, NHÀ, BALO, QUÂY, ĐỆM
                                                </NavLink>

                                                {
                                                    isProductCageDog?

                                                    <FaChevronUp   onClick={()=>setIsProductCageDog(isProductCageDog?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown    onClick={()=>setIsProductCageDog(isProductCageDog?false:true)} ></FaChevronDown>

                                                }
                                            </NavItemContainer>
                                            {isProductCageDog && (
                                                <ul>
                                                {ProductCageDog.map((item)=>{
                                                    return <li>
                                                        <NavLink href={`/category/phu-kien/phu-kien-cua-cho/Chuồng%20&%20Nhà%20&%20Balo%20&%20Quây%20&%20Đệm/${item}`}>
                                                            {item}
                                                        </NavLink>
                                                    </li>
                                                })}
                                            </ul>

                                            )}
                                            
                                        </NavSubItem>
                                            

                                            
                                        
                                        <NavSubItem>
                                            <NavItemContainer>
                                                <NavLink 
                                                    onClick={()=>setIsProductMedicineDog(isProductMedicineDog? false:true)}
                                                href="/category/phu-kien/phu-kien-cua-cho/Thuốc%20&%20Thực%20phẩm%20chức%20năng" >
                                                    THUỐC VÀ THỰC PHẨM CHỨC NĂNG
                                                </NavLink>

                                                {
                                                    isProductMedicineDog?

                                                    <FaChevronUp   onClick={()=>setIsProductMedicineDog(isProductMedicineDog?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown    onClick={()=>setIsProductMedicineDog(isProductMedicineDog?false:true)} ></FaChevronDown>

                                                }
                                            </NavItemContainer>

                                                {isProductMedicineDog && (
                                                    <ul>
                                                        {ProductMedicineDog.map((item)=>{
                                                            return <li>
                                                                <NavLink href={`/category/phu-kien/phu-kien-cua-cho/Thuốc%20&%20Thực%20phẩm%20chức%20năng/${item}`}>{item}</NavLink>
                                                            </li>
                                                        })}
                                                    </ul>

                                                )}
                                            

                                        </NavSubItem>

                                    
                                </SubNavList>
                                )}
                            
                            
                            </NavSubItem>

                                

                            <NavSubItem>
                                <NavItemContainer>
                                    <NavLink 
                                        href="/category/phu-kien/phu-kien-cua-meo"
                                       
                                        >   PHỤ KIỆN CỦA MÈO 
                                    </NavLink> 

                                    {
                                                    isProductTypeCat?

                                                    <FaChevronUp  onClick={()=>setIsProductTypeCat(isProductTypeCat?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown   onClick={()=>setIsProductTypeCat(isProductTypeCat?false:true)} ></FaChevronDown>

                                                }


                                </NavItemContainer>
                                {isProductTypeCat && (
                                <SubNavList>

                                    <NavSubItem>
                                        <NavItemContainer>
                                            <NavLink 
                                            
                                            href="/category/phu-kien/phu-kien-cua-meo/Thức%20ăn%20&%20Thực%20phẩm%20dinh%20dưỡng">THỨC ĂN VÀ THỰC PHẨM DINH DƯỠNG</NavLink>

                                            {
                                                    isProductFoodCat?

                                                    <FaChevronUp   onClick={()=>setIsProductFoodCat(isProductFoodCat?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown    onClick={()=>setIsProductFoodCat(isProductFoodCat?false:true)} ></FaChevronDown>

                                                }


                                        </NavItemContainer>

                                        {isProductFoodCat && (
                                            <SubNavList>
                                                {ProductFoodCat.map((item)=>{
                                                    return <NavSubItem>
                                                        <NavLink href={`/category/phu-kien/phu-kien-cua-meo/Thức%20ăn%20&%20Thực%20phẩm%20dinh%20dưỡng/${item}`}>{item}</NavLink>
                                                    </NavSubItem>
                                                })}
                                            </SubNavList>

                                        )}
                                        
                                    </NavSubItem>
                                        


                                    <NavSubItem>
                                        <NavItemContainer>
                                            <NavLink 
                                            
                                            href="/category/phu-kien/phu-kien-cua-meo/Đồ%20dùng%20&%20Đồ%20chơi%20&%20Phụ%20kiện" >ĐỒ DÙNG & ĐỒ CHƠI & PHỤ KIỆN</NavLink>
                                            {
                                                    isProductAccessoriesCat?

                                                    <FaChevronUp   onClick={()=>setIsProductAccessoriesCat(isProductAccessoriesCat?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown    onClick={()=>setIsProductAccessoriesCat(isProductAccessoriesCat?false:true)} ></FaChevronDown>

                                                }
                                        </NavItemContainer>

                                        {isProductAccessoriesCat && (
                                            <SubNavList>
                                            {ProductAccessoriesCat.map((item)=>{
                                                return <NavSubItem>
                                                    <NavLink href={`/category/phu-kien/phu-kien-cua-meo/Đồ%20dùng%20&%20Đồ%20chơi%20&%20Phụ%20kiện/${item}`}>{item}</NavLink>
                                                </NavSubItem>
                                            })}
                                        </SubNavList>
                                        )}
                                        

                                    </NavSubItem>
                                        

                                        


                                    <NavSubItem>
                                        <NavItemContainer>
                                        <NavLink 
                                        
                                        onClick={()=>setIsProductHygineCat(isProductHygineCat? false:true)}
                                        href="/category/phu-kien/phu-kien-cua-meo/Vệ%20sinh%20&%20Chăm%20sóc" >VỆ SINH & CHĂM SÓC</NavLink>

                                        {
                                                    isProductHygineCat?

                                                    <FaChevronUp  onClick={()=>setIsProductHygineCat(isProductHygineCat?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown  onClick={()=>setIsProductHygineCat(isProductHygineCat?false:true)} ></FaChevronDown>

                                                }
                                        </NavItemContainer>
                                        {isProductHygineCat && (
                                            <SubNavList>
                                                {ProductHygineCareCat.map((item)=>{
                                                    return <NavSubItem>
                                                        <NavLink href={`/category/phu-kien/phu-kien-cua-meo/Vệ%20sinh%20&%20Chăm%20sóc/${item}`}>{item}</NavLink>
                                                    </NavSubItem>
                                                })}
                                            </SubNavList>
                                        )}
                                        
                                    </NavSubItem>
                                        
                                        
                                    <NavSubItem>
                                        <NavItemContainer>
                                            <NavLink 
                                            
                                            href="/category/phu-kien/phu-kien-cua-meo/Chuồng%20&%20Nhà%20&%20Balo%20&%20Quây%20&%20Đệm"> CHUỒNG, NHÀ, BALO, QUÂY, ĐỆM</NavLink>

                                            {
                                                    isProductCageCat?

                                                    <FaChevronUp   onClick={()=>setIsProductCageCat(isProductCageCat?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown    onClick={()=>setIsProductCageCat(isProductCageCat?false:true)} ></FaChevronDown>

                                                }
                                        </NavItemContainer>
                                        {isProductCageCat && (
                                            <SubNavList>
                                                {ProductCageCat.map((item)=>{
                                                    return <NavSubItem>
                                                        <NavLink href={`/category/phu-kien/phu-kien-cua-meo/Chuồng%20&%20Nhà%20&%20Balo%20&%20Quây%20&%20Đệm/${item}`}>{item}</NavLink>
                                                    </NavSubItem>
                                                })}
                                            </SubNavList>

                                        )}
                                        
                                    </NavSubItem>
                                            
                                    
                                    <NavSubItem>
                                        <NavItemContainer>
                                            <NavLink 
                                            onClick={()=>setIsProductMedicineCat(isProductMedicineCat? false:true)}
                                            href="/category/phu-kien/phu-kien-cua-meo/Thuốc%20&%20Thực%20phẩm%20chức%20năng">
                                                THUỐC VÀ THỰC PHẨM CHỨC NĂNG
                                            </NavLink>

                                            {
                                                    isProductMedicineCat?

                                                    <FaChevronUp   onClick={()=>setIsProductMedicineCat(isProductMedicineCat?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown    onClick={()=>setIsProductMedicineCat(isProductMedicineCat?false:true)} ></FaChevronDown>

                                                }

                                        </NavItemContainer>
                                        {isProductMedicineCat && (
                                            <SubNavList>
                                            {ProductCageCat.map((item)=>{
                                                return <NavSubItem>
                                                    <NavLink href={`/category/phu-kien/phu-kien-cua-meo/Thuốc%20&%20Thực%20phẩm%20chức%20năng/${item}`}>{item}</NavLink>
                                                </NavSubItem>
                                            })}
                                        </SubNavList>

                                        )}
                                        

                                    </NavSubItem>
                                </SubNavList>
                                    )}
                                
                            
                            
                            </NavSubItem>
                            

                        </SubNavList>
                    )}
                    
                    
                </NavItem>


            </NavList>
    </SidebarContainer>
  );
}