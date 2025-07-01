import MainMenu from "../components/MainMenu";
import PageDirect from "../components/PageDirect";
import PicIntro from "../components/CategoryPage/PicIntro";
import FilterBoard from "../components/CategoryPage/FilterBoard";
import PetCardBody from "../components/CategoryPage/PetCardBody";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useState,useEffect } from "react";
import { usePetQueryFetch,usePetQueryFetchFilter } from "../services/hook/categoryHook";
import { GenHeaderPet } from "../utils/GenHeader";
import { GenNavPet } from "../utils/GenNav";
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



function CategoryPage({type,typePage}){
  const [Pet,setPet] = useState([])
    const [NavDirect,setNavDirect] = useState([])
    const [header,setHeader] = useState("Sản Phẩm")
    const { breed } = useParams();


    const [Price,SetPrice] =useState([])
    const [Gender,SetGender] = useState()
    const [Color,SetColor] = useState([])
    const [Sort,SetSort] = useState(0)

    const [Page,SetPage] = useState(1);
    const [Limit,SetLimit] = useState(16);

    const isValidPriceMax =  (Price.maxPrice != null)? true:false
    const isValidPriceMin =  (Price.minPrice != null)? true:false
    
    const isValidGender = Gender !== undefined && Gender !== null && Gender !== "";
    const isValidColor = Array.isArray(Color) && Color.length > 0;

    const {data:filterPet = [], isLoading:isLoadingPet} = usePetQueryFetchFilter({
                  gender: isValidGender ? Gender:"",
                  color: isValidColor ? Color:[],
                  maxPrice:isValidPriceMax ? Price.maxPrice:"",
                  minPrice: isValidPriceMin ? Price.minPrice:"",
                  sort: Sort,
                  breed: breed,
                  species:type,
                  page:Page,
                  limit:Limit
    })

    const pets = filterPet?.pets ?? [];
    const totalItems = filterPet?.totalItems ?? 0;
    const TotalPage = totalItems/Limit;
    
    useEffect(()=>
      {
            setNavDirect( GenNavPet(type,typePage,breed)  )
            setHeader(  GenHeaderPet(type,typePage,breed) );
         
      }
      ,[typePage,type]);


    return (

        <>
            <CategoryPageWrapper className="CategoryPage">
                <CategoryPageContainer className="CategoryPage-Container">

                    
                    
                    <PicIntro/>
                    <PageDirect NavDirect={NavDirect} SetPage={SetPage}/>

                    <CategoryPageBody className="CategoryPage-Body">
                        <FilterBoard 
                          GenderChosen={Gender} 
                          SetGender={SetGender} 
                          ColorChosen={Color} 
                          SetColor={SetColor} 
                          SetPrice={SetPrice}
                          Page={Page}
                          SetPage={SetPage}
                        ></FilterBoard>

                        <PetCardBody 
                          Pet={pets} 
                          
                          Header={header}
                          SetSort={SetSort} 
                          Petlength={totalItems} 
                          type="Pet"
                          Page={Page}
                          SetPage={SetPage}
                          TotalPage={Math.ceil(TotalPage)}
                          isLoading = {isLoadingPet}
                          ></PetCardBody>
                    </CategoryPageBody>

                </CategoryPageContainer>
                
            </CategoryPageWrapper>
           
        </>
    )


}

export default CategoryPage;