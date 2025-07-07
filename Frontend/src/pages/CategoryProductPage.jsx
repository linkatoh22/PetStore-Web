import MainMenu from "../components/MainMenu";
import PageDirect from "../components/PageDirect";
import PicIntro from "../components/CategoryPage/PicIntro";
import FilterBoard from "../components/CategoryPage/FilterBoard";
import PetCardBody from "../components/CategoryPage/PetCardBody";
import Footer from "../components/Footer";
import styled from "styled-components";
import { Router, useParams } from 'react-router-dom';
import { useState,useEffect } from "react";
import { petQueryFetch,petQueryFetchFilter } from "../services/api/CategoryAPI";
import { GenNavProduct } from "../utils/GenNav";
import { GenHeaderProduct } from "../utils/GenHeader";
import { useProductQueryFetchFilter } from "../services/hook/categoryProductHook";
const CategoryPageWrapper = styled.div`
  width:80%;
  margin:auto;
  padding-top:5.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  @media (min-width: 0px) and (max-width: 598.99px) {
        padding-top:4.5rem;
        width:100%;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding-top:4.3rem;  
        width:90%;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding-top:4.6rem;
        width:85%;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding-top:5.3rem;
        width:80%;
    }
  
`;

const CategoryPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
`;

const CategoryPageBody = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.8rem;
        
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 1rem;
  }
`;



function CategoryProductPage({type,typePage}){
    const [Pet,setPet] = useState([])
    const [NavDirect,setNavDirect] = useState([])
    const [header,setHeader] = useState("Sản Phẩm")
    const { ProductCategory,ProductSubCategory } = useParams();
    
    const [Sort,SetSort] = useState(0)
    const [Page,SetPage] = useState(1);
    const [Limit,SetLimit] = useState(16);


    const {data:filterProduct = [], isLoading:isLoadingProduct} = useProductQueryFetchFilter({
                  subcategory: ProductSubCategory ??"",
                  category: ProductCategory ??"",
                  sort: Sort,
                  species:type??"",
                  page:Page,
                  limit:Limit,
                  
    })

    const products = filterProduct?.products ?? [];
    const totalItems = filterProduct?.totalItems ?? 0;
    const totalPage = filterProduct?.totalPage??0;


    useEffect(()=>
      {
        setNavDirect( GenNavProduct(type,typePage,ProductCategory,ProductSubCategory) );
        
        setHeader(GenHeaderProduct(type,typePage,ProductCategory,ProductSubCategory));
        
      }
      ,[typePage,type]);


    return (

        <>
        
            <CategoryPageWrapper className="CategoryPage">
                <CategoryPageContainer className="CategoryPage-Container">

                    
                    
                    <PicIntro/>
                    <PageDirect NavDirect={NavDirect} SetPage={SetPage}/>

                    <CategoryPageBody className="CategoryPage-Body">
                        {/* <FilterBoard GenderChosen={Gender} SetGender={SetGender} ColorChosen={Color} SetColor={SetColor} SetPrice={SetPrice} ></FilterBoard> */}
                        <PetCardBody Pet={products} SetPet={setPet} Header={header}SetSort={SetSort} Petlength={totalItems} type="Product" 
                          Page={Page}
                          SetPage={SetPage}
                          TotalPage={totalPage}
                          isLoading={isLoadingProduct}
                        ></PetCardBody>
                    </CategoryPageBody>

                </CategoryPageContainer>
                
            </CategoryPageWrapper>
            
        </>
    )


}

export default CategoryProductPage;