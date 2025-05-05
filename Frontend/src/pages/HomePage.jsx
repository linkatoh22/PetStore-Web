
import Bgr from "../assets/bgr-homepage.png"
import PetsCard from "../components/Card/PetsCard.jsx";
import ProductsCard from "../components/Card/ProductsCard.jsx";
import BrandPic from "../assets/brand.png"
import HoldhandPic from "../assets/holdhand.png"
import KnowledgeCard from "../components/Card/KnowledgedCard.jsx"; 
import Footer from "../components/Footer";
import BackgroundMenu from "../components/Homepage/BackgroundMenu.jsx";
import {useState,useEffect} from 'react';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MainMenu from "../components/MainMenu.jsx";

import { PetFetchHook,ProductFetchHook } from "../services/hook/homepageHook.js";
const PetsHomepageContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap:1rem;
    padding-bottom: 2rem;
    z-index:1;
`
const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    column-gap: 1rem;
    row-gap: 1rem;

`

const HomepageTitleContainer = styled.div`
    display: flex;

    flex-direction: row;
    justify-content: space-between;
    
    margin-bottom: 10px;

`

const HomepageTitleBtn = styled.button`
    background-color: transparent;
    border-style: solid;
    border-width: 2px;
    
    border-color: #003459;
    color: #003459;
    font-size: 18px;
    
    font-weight: bold;
    cursor: pointer;
    border-radius: 100px;
    padding: 10px 15px;
    transition: background-color 0.15s;
    &:active{
        background-color: white;
    }
`
const BgrImg = styled.div`
    margin-top: 20px;
    position:relative;
    
    min-height: 350px;
    margin-bottom: 120px;

`

const PicPets = styled.img`
    background-size: cover;
    position: absolute;
    width: 100%;
    height: 460px;
`

const DescriptionSubMenu = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    top:30%;
    right:5%;

`

const Header1SubMenu = styled.div`
    text-align: right;
    color: #002A48;
    font-size: 4rem;
    font-weight: bold;
`

const Header2SubMenu = styled.div`
    text-align: right;
    color: #002A48;
    font-size: 3rem;
    font-weight: 550;
`

const ParagraphSubMenu = styled.div`
    text-align: right;
    width: 400px;
    margin-bottom: 20px;
    font-size: 1.2rem;

`

const SubTransparentBlueButton = styled.button`
    background-color: transparent;
    border-style: solid;
    border-width: 2px;
    font-weight: bold;
    border-color: #003459;
    color: #003459;
    font-size: 18px;
    
    cursor: pointer;
    border-radius: 100px;
    padding: 10px 15px;
    transition: background-color 0.15s;
`

const SubBlueButton = styled.button`
    background-color:  #003459;
    color: white;
    font-size: 18px;
    font-weight: bold;
    border:none;
    
    border-radius: 100px;
    padding: 14px 15px;
    transition: background-color 0.15s;
    cursor: pointer;
`
const BigFont = styled.span`
    font-size: 20px;
    font-weight: bold;
    color:#002A48

`
const DescriptionSubMenuHoldHand = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    top:70px;
    left: 80px;
`
const ParagraphSubMenuHoldHand = styled.div`
     width: 400px;
    margin-top: 20px;
    margin-bottom: 20px;
    
    
    font-size: 20px;
`

const KnowledgeCardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    column-gap: 10px;
    row-gap: 20px;
`




function Homepage(){
    const navigate = useNavigate()
    const { data: pet, isLoading: loadingUser, error: errorUser } = PetFetchHook()
    const { data: product, isLoading: loadingPosts, error: errorPosts } = ProductFetchHook()

    const [PetData,setPetData] = useState([])
    const [ProductData,setProductData] = useState([])

    useEffect(()=>{
        // console.log('pet',pet)
        if(pet){
            setPetData(pet)
        }
    },[pet]);

    useEffect(()=>{
        // console.log('product',product)
        if(product){
            setProductData(product)
        }
    },[product]);

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
    

    return(
        
        <>
            <MainMenu></MainMenu>   
            <BackgroundMenu></BackgroundMenu>
            
            
            <div style={{width: "80%",margin:"auto"}}>
            
            <PetsHomepageContainer>

                <div className="homepage-title-1-pets" style={{
                        textAlign: "left",
                        fontWeight: "500",
                        fontSize: "18px"}}>

                    Có gì hot?</div>

                <HomepageTitleContainer className="homepage-title-container">

                    <div className="homepage-title-2-pets"
                        style={{
                            color:"#002A48",
                            fontSize: "25px",
                            fontWeight: "bold",

                        }}
                    >Best-seller của store tụi mình  </div>
                    <HomepageTitleBtn>Xem thêm</HomepageTitleBtn>

                </HomepageTitleContainer>

                <CardContainer>

                {
                    PetData.length >0?
                    (
                        PetData.map(
                            item =>
                                    <PetsCard 
                                        key={item._id}
                                        Item = {item}
                                        type="Pet"
                                    /> 
                        )
                    )
                    :
                    (<h1> NO DATA</h1>)
                } 
                   
                    
                </CardContainer>


                <BgrImg>
                    <PicPets src={Bgr}></PicPets>
                     
                    <DescriptionSubMenu>
                        <Header1SubMenu>Một người bạn mới</Header1SubMenu>

                            <Header2SubMenu>Thêm vạn niềm vui!</Header2SubMenu>

                            <ParagraphSubMenu>DCAT Store là nơi cung cấp đa dạng loại thú cưng và các phụ kiện mà bạn thỏa thích lựa chọn</ParagraphSubMenu>


                            <div  style={{display: "flex",gap: "20px"}}>

                                <SubTransparentBlueButton onClick={()=>handleNavItem("Cat")} > Mèo cảnh</SubTransparentBlueButton>

                                <SubBlueButton onClick={()=>handleNavItem("Dog")} >Chó cảnh</SubBlueButton>

                            </div>


                    </DescriptionSubMenu>
                    

                </BgrImg>

            



            

                <div className="homepage-title-1-pets"
                style={{
                    textAlign: "left",
                    fontWeight: "500",
                    fontSize: "18px"
                    
                }}>Khó khăn trong việc chọn lựa sản phẩm phù hợp với các boss?</div>

                <HomepageTitleContainer>
                    <div 
                        style={{
                            color:"#002A48",
                            fontSize: "25px",
                            fontWeight: "bold"
                        }}
                        className="homepage-title-2-pets">
                    Sản phẩm của tụi mình
                    
                    </div>

                    <HomepageTitleBtn onClick={()=>handleNavItem("Product")}> Xem thêm</HomepageTitleBtn>
                </HomepageTitleContainer>



                <CardContainer>
                    {
                        ProductData.length>0?
                        (
                            ProductData.map(
                                item =>
                                        <PetsCard 
                                            key={item._id}
                                            Item = {item}
                                            type="Product"
                                        /> 
                            )
                        )
                        :
                        (<h1> NO DATA</h1>)
                    } 
                        
                </CardContainer>



                <HomepageTitleContainer>
                    <div className="title-1-pets" style={{
                        textAlign: "left",
                        fontWeight: "500",
                        fontSize: "18px"

                    }}>
                        Proud to be part of <BigFont>Pet Sellers</BigFont> 
                    </div>

                    <HomepageTitleBtn>View all our sellers</HomepageTitleBtn>
                </HomepageTitleContainer>


                
                <img src={BrandPic} style={{marginTop: "20px",
                    position:"relative",
                    width: "100%",
                    marginBottom: "10px"}} 
                    className="bgr-img-brand"></img>
                     

                

                

            



            
                {/* <div className="homepage-title-1-pets"
                    style={
                        {
                            textAlign: "left",
                            fontWeight: "500",
                            fontSize: "18px"
                        }
                    }
                >You already know?</div>

                <HomepageTitleContainer className="homepage-title-container">

                    <div style={{
                        color:"#002A48",
                        fontSize: "25px",
                        fontWeight: "bold"
                    }}
                    
                    className="homepage-title-2-pets">Useful Pet Knowledge</div>
                    <HomepageTitleBtn >View More</HomepageTitleBtn>

                </HomepageTitleContainer>

                <KnowledgeCardContainer className="knowledge-card-container">
                    <KnowledgeCard/>
                    <KnowledgeCard/>
                    <KnowledgeCard/>
                </KnowledgeCardContainer> */}



            </PetsHomepageContainer>
                

            </div>

            
            
            <Footer/>
            
                        
        </>
    )

}

export default Homepage;