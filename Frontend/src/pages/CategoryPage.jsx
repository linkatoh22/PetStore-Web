import MainMenu from "../components/MainMenu";
import PageDirect from "../components/PageDirect";
import PicIntro from "../components/CategoryPage/PicIntro";
import FilterBoard from "../components/CategoryPage/FilterBoard";
import PetCardBody from "../components/CategoryPage/PetCardBody";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useState,useEffect } from "react";
import { petQueryFetch,petQueryFetchFilter } from "../services/CategoryAPI";

const CategoryPageWrapper = styled.div`
  padding-block:1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 50px;
`;

const CategoryPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 150px;
  padding-right: 150px;
  gap: 15px;
`;

const CategoryPageBody = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;



function CategoryPage({type}){
    const [Pet,setPet] = useState([])
    const [NavDirect,setNavDirect] = useState([])
    const [header,setHeader] = useState("Sản Phẩm")
    const { breed } = useParams();


    const [Price,SetPrice] =useState([])
    const [Gender,SetGender] = useState()
    const [Color,SetColor] = useState([])
    const [Sort,SetSort] = useState(0)

    useEffect (()=>{
      const FetchFilter= async () =>{
          const isValidPriceMax =  (Price.maxPrice != null)? true:false
          const isValidPriceMin =  (Price.minPrice != null)? true:false
          console.log(Price);
          const isValidGender = Gender !== undefined && Gender !== null && Gender !== "";
          const isValidColor = Array.isArray(Color) && Color.length > 0;
          
          
          const PetFilter=  await petQueryFetchFilter(
                  isValidGender?Gender:"",
                  isValidColor?Color:[],
                  isValidPriceMax?Price.maxPrice:"",
                  isValidPriceMin?Price.minPrice:"",
                  Sort,
                  breed
                );
            
          await setPet(PetFilter);
          
      }
      
     FetchFilter();

    },[Price,Gender,Color,Sort])



    useEffect(()=>
      {
          const FetchPet = async ()=>{
            const query = `breed=${breed}`
            const PetFetch = await petQueryFetch(query);
            await setPet(PetFetch);

            setNavDirect(type==="cho-canh"? 
              [
                { "Nav" : "Trang chủ" , "URL" : "/"}
                ,
                { "Nav":"Chó cảnh", "URL":"/category/cho-canh" }
                ,
                {  "Nav":`Chó ${breed}`, "URL":`/category/cho-canh/${breed}`}
              ]
              :
              [
                { "Nav" : "Trang chủ" , "URL" : "/"}
                ,
                { "Nav":"Mèo cảnh", "URL":"/category/meo-canh" }
                ,
                {  "Nav":`Mèo ${breed}`, "URL":`/category/meo-canh/${breed}`}
              ]
          
          )

            setHeader(type==="cho-canh"?`Chó ${breed}`:`Mèo ${breed}`)

          }

          FetchPet();
      }
      ,[breed]);


    return (

        <>
        <MainMenu/>
            <CategoryPageWrapper className="CategoryPage">
                <CategoryPageContainer className="CategoryPage-Container">

                    
                    
                    <PicIntro/>
                    <PageDirect NavDirect={NavDirect}/>

                    <CategoryPageBody className="CategoryPage-Body">
                        <FilterBoard GenderChosen={Gender} SetGender={SetGender} ColorChosen={Color} SetColor={SetColor} SetPrice={SetPrice} ></FilterBoard>
                        <PetCardBody Pet={Pet} SetPet={setPet} Header={header}SetSort={SetSort}></PetCardBody>
                    </CategoryPageBody>

                </CategoryPageContainer>
                
            </CategoryPageWrapper>
            <Footer></Footer>
        </>
    )


}

export default CategoryPage;