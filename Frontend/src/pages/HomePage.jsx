
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
import { useLocation, useNavigate } from 'react-router-dom';
import MainMenu from "../components/MainMenu.jsx";
import Spinner from 'react-bootstrap/Spinner';

import { PetFetchHook,ProductFetchHook } from "../services/hook/homepageHook.js";
const PetsHomepageContainer = styled.div`
    width:80%;
    margin:auto;
    margin-top: 0.7rem;
    display: flex;
    flex-direction: column;
    gap:1rem;
    padding-bottom: 2rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
        gap:0.5rem;
        padding-bottom: 0.8rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        gap:0.5rem;
        padding-bottom: 0.8rem;
    }
    
    
`

const TitleContainer  = styled.div`
    text-align: left;
    font-weight: 500;
    font-size: 1.2rem;
    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.7rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.8rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.9rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1rem;
    }


`

const HomepageTitleContainer = styled.div`
    display: flex;
    align-items:center;
    flex-direction: row;
    justify-content: space-between;
    
    margin-bottom: 10px;
     color:var(--main-blue);
        font-size: 1.5rem;
        font-weight: bold;

    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 1rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 1.1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1.3rem;
        
    }
    

`

const HomepageTitleBtn = styled.button`
    background-color: transparent;
    border-style: solid;
    border-width: 2px;
    
    border-color: #003459;
    color: #003459;
    font-size: 1.2rem;
    
    font-weight: bold;
    cursor: pointer;
    border-radius: 100px;
    padding: 0.7rem 1rem;
    transition: background-color 0.15s;
    &:active{
        background-color: white;
    }

    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.5rem;
        padding: 0.2rem 0.4rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.9rem;
        padding: 0.5rem 0.9rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1rem;
        padding: 0.6rem 0.9rem;
    }
`
const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    column-gap: 1rem;
    row-gap: 1rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
        grid-template-columns: repeat(2,1fr);
        column-gap: 0.5rem;
        row-gap: 0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        grid-template-columns: repeat(3,1fr);
        column-gap: 0.7rem;
        row-gap: 0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        grid-template-columns: repeat(3,1fr);
        column-gap: 0.8rem;
        row-gap: 0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        grid-template-columns: repeat(4,1fr);
        column-gap: 0.8rem;
        row-gap: 0.8rem;
        
    }
    

`
const BgrImg = styled.div`
    width:100%;
    background-image:url(${Bgr});
    margin-top: 1rem;
    position:relative;
    background-size: cover;
    height: 530px;
    margin-bottom: 1rem;
    @media (min-width: 0px) and (max-width: 1500px) {
        display:none;
    }

`

const DescriptionSubMenu = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    top:20%;
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
    font-size: 1.5rem;
    font-weight: bold;
    color:#002A48;

    @media (min-width: 0px) and (max-width: 598.99px) {
         font-size: 0.8rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.8rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 1.1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1.1rem;
    }

    

`

const SpinnerContainer = styled.div`
    display:flex;
    width:100%;
    align-items:center;
    justify-content:center;
    height:200px;
    font-size:1.3rem;
    .mr-2{
        width: 4rem;
         height: 4rem;

        @media (min-width: 0px) and (max-width: 598.99px) {
            width: 2rem;
            height: 2rem;
        }
        @media (min-width: 599px) and (max-width: 799.99px) {
            width: 2rem;
            height: 2rem;
        }
        @media (min-width: 800px) and (max-width: 1199.98px) {
            width: 3rem;
            height:3rem;
        }
        @media (min-width: 1200px) and (max-width: 1500px) {
            width: 3rem;
            height:3rem;
        }
    
    }
    @media (min-width: 0px) and (max-width: 598.99px) {
        height:100px;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        height:100px;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        height:200px;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        height:200px;
    }
    

`

const BackgroundMenuWrapper = styled.div`
    min-height: 200px;
    
`


function Homepage(){
    const {pathname} = useLocation();
    const navigate = useNavigate()
    const { data: pet, isLoading: loadingUser } = PetFetchHook()
    const { data: product, isLoading: loadingProduct } = ProductFetchHook()

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

    const handleNavMenuItem = (type)=>{
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
            <div >
                <BackgroundMenuWrapper>
                    <BackgroundMenu></BackgroundMenu>
                </BackgroundMenuWrapper>
                
                
                
                
                
                <PetsHomepageContainer>

                    <TitleContainer>

                        Có gì hot?
                    </TitleContainer>

                    <HomepageTitleContainer>

                        <div className="homepage-title-1-pets">
                            Best-seller của store tụi mình  
                        </div>

                        {/* <a>
                        <HomepageTitleBtn>Xem thêm</HomepageTitleBtn>
                        </a> */}
                    </HomepageTitleContainer>

                    
                    {loadingUser? 
                            <SpinnerContainer>
                                <Spinner animation="border" variant="info" className='mr-2' />
                            </SpinnerContainer>
                        : 
                        (
                            PetData.length >0?
                            (
                                <CardContainer>
                                {PetData.map(
                                    item =>
                                            <PetsCard 
                                                key={item._id}
                                                
                                                Item = {item}
                                                type="Pet"
                                            /> 
                                )}
                                </CardContainer>
                            )
                            :
                            (<SpinnerContainer> <div> Không có dữ liệu hiển thị</div> </SpinnerContainer>)
                        )
                    }
                    
                    
                        
                    


                    <BgrImg>
                        {/* <PicPets src={Bgr}></PicPets> */}
                        
                        <DescriptionSubMenu>
                            <Header1SubMenu>Một người bạn mới</Header1SubMenu>

                                <Header2SubMenu>Thêm vạn niềm vui!</Header2SubMenu>

                                <ParagraphSubMenu>DCAT Store là nơi cung cấp đa dạng loại thú cưng và các phụ kiện mà bạn thỏa thích lựa chọn</ParagraphSubMenu>


                                <div  style={{display: "flex",gap: "20px"}}>

                                    <SubTransparentBlueButton onClick={()=>handleNavMenuItem("Cat")} > Mèo cảnh</SubTransparentBlueButton>

                                    <SubBlueButton onClick={()=>handleNavMenuItem("Dog")} >Chó cảnh</SubBlueButton>

                                </div>


                        </DescriptionSubMenu>
                        

                    </BgrImg>


                    <TitleContainer>Khó khăn trong việc chọn lựa sản phẩm phù hợp với các boss?</TitleContainer>

                    <HomepageTitleContainer>
                        <div 
                            className="homepage-title-1-pets">
                        Sản phẩm của tụi mình
                        
                        </div>

                        <a href="/category/phu-kien">
                        <HomepageTitleBtn 
                            // onClick={()=>handleNavMenuItem("Product")}
                        > Xem thêm</HomepageTitleBtn>
                        </a>
                    </HomepageTitleContainer>



                    
                        { loadingProduct?  
                            <SpinnerContainer>
                                <Spinner animation="border" variant="info" style={{ width: "4rem", height: "4rem" }} className='mr-2' />
                            </SpinnerContainer>
                            :
                            (
                                ProductData.length>0?
                                (
                                    <CardContainer>
                                    {ProductData.map(
                                        item =>
                                                <PetsCard 
                                                    key={item._id}
                                                    Item = {item}
                                                    onClick = {()=>handleNavItem("Product",item._id)}
                                                    type="Product"
                                                /> 
                                    )}
                                    </CardContainer>

                                )
                                :
                                (<SpinnerContainer> <div> Không có dữ liệu hiển thị</div> </SpinnerContainer>)
                            )
                        } 
                            
                    


                    <HomepageTitleContainer>
                        <TitleContainer style={{color:"black"}}>
                            Tự hào là một phần của phân phối <BigFont>Các Brand uy tín</BigFont> 
                        </TitleContainer>

                        
                    </HomepageTitleContainer>


                    
                    <img src={BrandPic} style={{marginTop: "20px",
                        position:"relative",
                        width: "100%",
                        marginBottom: "10px"}} 
                        className="bgr-img-brand"></img>


                </PetsHomepageContainer>
                    

                

            
            
           
            </div>
                        
        </>
    )

}

export default Homepage;