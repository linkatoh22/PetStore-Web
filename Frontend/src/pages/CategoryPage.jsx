import MainMenu from "../components/MainMenu";
import PageDirect from "../components/PageDirect";
import PicIntro from "../components/CategoryPage/PicIntro";
import FilterBoard from "../components/CategoryPage/FilterBoard";
import PetCardBody from "../components/CategoryPage/PetCardBody";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useSearchParams } from 'react-router-dom';
import { useState,useEffect } from "react";
import { petQueryFetch } from "../services/CategoryAPI";

const CategoryPageWrapper = styled.div`
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



function CategoryPage(){
    const [Pet,setPet] = useState([])
    const [searchParams] = useSearchParams();

    useEffect(()=>
      {
          const FetchPet = async ()=>{

            const query = searchParams.toString();
            
            const PetFetch = await petQueryFetch(query);
            console.log(PetFetch);
            await setPet(PetFetch);

          }

          FetchPet();
      }
      ,[searchParams]);


    return (

        <>
        <MainMenu/>
            <CategoryPageWrapper className="CategoryPage">
                <CategoryPageContainer className="CategoryPage-Container">

                    
                    <PageDirect/>
                    <PicIntro/>

                    <CategoryPageBody className="CategoryPage-Body">
                        <FilterBoard></FilterBoard>
                        <PetCardBody Pet={Pet} SetPet={setPet}></PetCardBody>
                    </CategoryPageBody>

                </CategoryPageContainer>
                
            </CategoryPageWrapper>
            <Footer></Footer>
        </>
    )


}

export default CategoryPage;