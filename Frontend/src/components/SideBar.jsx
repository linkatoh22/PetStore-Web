import React, { useState } from "react";
import { IoLogoOctocat } from "react-icons/io";
import Logo from "../assets/logo.png"
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";


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
    width: 25%;
  background-color: var(--main-blue);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100vh;
  transition: 1s ease-in-out;

//   transform: ${({ isVisible }) => (isVisible ? "translateX(0%)" : "translateX(-100%)")};
`




const NavList = styled.ul`
  list-style: none;
  width:100%;
  padding: 0;
`;

const NavItemContainer = styled.div`
    
    cursor:pointer;
    color:white;
    font-size:1.2rem;
    display:flex;
    align-items:center;
    justify-content: space-between;
`

const NavLink = styled.a`
    
    
  color: var(--grey-300);
  font-weight:bold;
  font-size:1.2rem;
  text-decoration: none;
  &:hover {
    color: white;
  }
`;

const NavItem = styled.li`
    width:100%;
    border-top:1px solid white;
    border-bottom:1px solid white;
    padding-inline:1.5rem;
    padding-block:1rem;
`;

const NavSubItem = styled.li`
    border-left:1px solid white;
    // border-bottom:1px solid white;
    padding-inline:0.8rem;
    padding-block:0.4rem;
`;

const SubNavList = styled.ul`
  list-style: none;
  padding: 1rem;
`;



export default function Sidebar ({isVisible,setIsSidebar}){
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
         
    >

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

                                                    <FaChevronUp  style={{fontSize:"2rem"}}onClick={()=>setIsProductFoodDog(isProductFoodDog?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown style={{fontSize:"2rem"}}  onClick={()=>setIsProductFoodDog(isProductFoodDog?false:true)} ></FaChevronDown>

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

                                                    <FaChevronUp  style={{fontSize:"2rem"}}onClick={()=>setIsProductAccessoriesDog(isProductAccessoriesDog?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown style={{fontSize:"2rem"}}  onClick={()=>setIsProductAccessoriesDog(isProductAccessoriesDog?false:true)} ></FaChevronDown>

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

                                                    <FaChevronUp  style={{fontSize:"1.5rem"}}onClick={()=>setIsProductHygineDog(isProductHygineDog?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown style={{fontSize:"1.5rem"}}  onClick={()=>setIsProductHygineDog(isProductHygineDog?false:true)} ></FaChevronDown>

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

                                                    <FaChevronUp  style={{fontSize:"2rem"}}onClick={()=>setIsProductCageDog(isProductCageDog?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown style={{fontSize:"2rem"}}  onClick={()=>setIsProductCageDog(isProductCageDog?false:true)} ></FaChevronDown>

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

                                                    <FaChevronUp  style={{fontSize:"2rem"}}onClick={()=>setIsProductMedicineDog(isProductMedicineDog?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown style={{fontSize:"2rem"}}  onClick={()=>setIsProductMedicineDog(isProductMedicineDog?false:true)} ></FaChevronDown>

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

                                                    <FaChevronUp  style={{fontSize:"2rem"}}onClick={()=>setIsProductFoodCat(isProductFoodCat?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown style={{fontSize:"2rem"}}  onClick={()=>setIsProductFoodCat(isProductFoodCat?false:true)} ></FaChevronDown>

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

                                                    <FaChevronUp  style={{fontSize:"2rem"}}onClick={()=>setIsProductAccessoriesCat(isProductAccessoriesCat?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown style={{fontSize:"2rem"}}  onClick={()=>setIsProductAccessoriesCat(isProductAccessoriesCat?false:true)} ></FaChevronDown>

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

                                                    <FaChevronUp  style={{fontSize:"2rem"}}onClick={()=>setIsProductCageCat(isProductCageCat?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown style={{fontSize:"2rem"}}  onClick={()=>setIsProductCageCat(isProductCageCat?false:true)} ></FaChevronDown>

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

                                                    <FaChevronUp  style={{fontSize:"2rem"}}onClick={()=>setIsProductMedicineCat(isProductMedicineCat?false:true)} ></FaChevronUp>
                                                    :
                                                    <FaChevronDown style={{fontSize:"2rem"}}  onClick={()=>setIsProductMedicineCat(isProductMedicineCat?false:true)} ></FaChevronDown>

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