
import Bgr from "../assets/bgr-homepage.png"
import PetsCard from "../components/Card/PetsCard.jsx";
import ProductsCard from "../components/Card/ProductsCard.jsx";
import BrandPic from "../assets/brand.png"
import HoldhandPic from "../assets/holdhand.png"
import KnowledgeCard from "../components/Card/KnowledgedCard.jsx"; 
import Footer from "../components/Footer";
import BackgroundMenu from "../components/Homepage/BackgroundMenu.jsx";
import {useState,useEffect} from 'react';
import { PetFetch } from '../services/homepageAPI';
import styled from 'styled-components';

import MainMenu from "../components/MainMenu.jsx";

const PetsHomepageContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap:10px;
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
    top:60px;
    right:110px;

`

const Header1SubMenu = styled.div`
    text-align: right;
    color: #002A48;
    font-size: 70px;
    font-weight: bold;
`

const Header2SubMenu = styled.div`
    text-align: right;
    color: #002A48;
    font-size: 50px;
    font-weight: 550;
`

const ParagraphSubMenu = styled.div`
    text-align: right;
    width: 400px;
    margin-bottom: 20px;
    font-size: 16px;

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
    font-weight: 300;
    border:none;
    font-family: Roboto;
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
    const [PetData,setPetData] = useState([])
    useEffect(()=>{
        const fetchData = async () =>{
            const Pet = await PetFetch();
            
            await setPetData(Pet);
            
            console.log('Data nhan dc: ',Pet);
            
        }


        fetchData();


    },[]);

    useEffect(()=>{
        console.log("TEST: " , PetData)


    },[PetData]);
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

                    What's new?</div>

                <HomepageTitleContainer div className="homepage-title-container">

                    <div className="homepage-title-2-pets"
                        style={{
                            color:"#002A48",
                            fontSize: "25px",
                            fontWeight: "bold",

                        }}
                    >Take A Look At Some Of Our Pets</div>
                    <HomepageTitleBtn>View More</HomepageTitleBtn>

                </HomepageTitleContainer>

                <CardContainer>

                {
                    PetData.length >0?
                    (
                        PetData.map(
                            item =>
                                    <PetsCard 
                                        key={item._id}
                                        petImg = {item.image[0]}
                                        petName={item.name}
                                        petGender={item.gender}
                                        petAge={item.age}
                                        petPrice={item.price}
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
                        <Header1SubMenu>One More Friend</Header1SubMenu>

                            <Header2SubMenu>Thousands More Fun!</Header2SubMenu>

                            <ParagraphSubMenu>Having a pet meas you have more joy, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!</ParagraphSubMenu>


                            <div  style={{display: "flex",gap: "20px"}}>

                                <SubTransparentBlueButton> View Intro</SubTransparentBlueButton>

                                <SubBlueButton> Explore Now</SubBlueButton>

                            </div>


                    </DescriptionSubMenu>
                    

                </BgrImg>

            



            

                <div className="homepage-title-1-pets"
                style={{
                    textAlign: "left",
                    fontWeight: "500",
                    fontSize: "18px"
                    
                }}>Hard to choose product for your pets?</div>

                <div className="homepage-title-container">
                    <div 
style={{
                            color:"#002A48",
                            fontSize: "25px",
                            fontWeight: "bold"
                        }}
                        className="homepage-title-2-pets">
                    Our Products
                    
                    </div>

                    <HomepageTitleBtn>View More</HomepageTitleBtn>
                </div>



                <CardContainer>
                        <ProductsCard/>
                        <ProductsCard/>
                        <ProductsCard/>
                        <ProductsCard/>

                        <ProductsCard/>
                        <ProductsCard/>
                        <ProductsCard/>
                        <ProductsCard/>
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
                     

                

                <BgrImg>
                    <PicPets src={HoldhandPic} className="pic-pets"></PicPets>
                     
                    <DescriptionSubMenuHoldHand>

                        <div style={{color: "#002A48",
                            fontSize: "70px",
                            fontWeight: "bold",}} 

                            className="header1-sub-menu-hold-hand">Adoption</div>

                            <div 
                            style={{color: "#002A48",
                                fontSize: "50px",
                                fontWeight: "550"}}
                            className="header2-sub-menu-hold-hand">We need help. so do they.</div>


                            <ParagraphSubMenuHoldHand>Adopt a pet and give it a home,<br/> it will be love you back unconditionally.</ParagraphSubMenuHoldHand>

                            <div className="btn-group-sub-menu-hold-hand"
                            style={{display: "flex",gap: "20px"}}>
                            
                                <SubTransparentBlueButton > View Intro</SubTransparentBlueButton>


                                <SubBlueButton className="sub-blue-button"> Explore Now</SubBlueButton>

                                
                            </div>


                    </DescriptionSubMenuHoldHand>
                    

                </BgrImg>

            



            
                <div className="homepage-title-1-pets"
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
                </KnowledgeCardContainer>



            </PetsHomepageContainer>
                

            </div>

            
            
            <Footer/>
            
                        
        </>
    )

}

export default Homepage;