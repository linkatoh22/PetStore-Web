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