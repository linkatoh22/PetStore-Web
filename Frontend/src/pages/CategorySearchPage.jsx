import MainMenu from "../components/MainMenu";
import PageDirect from "../components/PageDirect";
import PicIntro from "../components/CategoryPage/PicIntro";
import FilterBoard from "../components/CategoryPage/FilterBoard";
import PetCardBody from "../components/CategoryPage/PetCardBody";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useState,useEffect } from "react";
import { usePetSearch,useProductSearch,useSearchAll } from "../services/hook/CategorySearchHook";

import { GenNavSearch } from "../utils/GenNav";

const CategoryPageWrapper = styled.div`
  width:80%;
  margin:auto;
  display: flex;
  padding-block:5.5rem;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
        
        padding-block:4.5rem;
        width:90%;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          padding-block:4.3rem;
          width:90%;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding-block:4.6rem;
        width:85%;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding-block:5.3rem;
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



function CategorySearchPage({type}){
  const [Pet,setPet] = useState([])
    const [NavDirect,setNavDirect] = useState([])
    const [header,setHeader] = useState("Kết quả tìm kiếm")
    const { keyword } = useParams();


    const [Price,SetPrice] =useState([])
    const [Gender,SetGender] = useState()
    const [Color,SetColor] = useState([])
    const [Sort,SetSort] = useState(0)

    const [Page,SetPage] = useState(1);
    const [Limit,SetLimit] = useState(12);
    const [TotalPage,SetTotalPage] = useState(1);

    const isValidPriceMax =  (Price.maxPrice != null)? true:false
    const isValidPriceMin =  (Price.minPrice != null)? true:false
    
    const isValidGender = Gender !== undefined && Gender !== null && Gender !== "";
    const isValidColor = Array.isArray(Color) && Color.length > 0;
    var filterItem = [];
    var isLoadingPet =false;
    var isLoadingProduct =false;
    var isLoadingAll =false;
    if(type == "Chó" || type == "Mèo"){
      const {data, isLoading:isLoading} = usePetSearch({
        keyword: keyword,
        page: Page,
        limit: Limit,
        sort: Sort,
        species: type,
      });
      filterItem= data;
      isLoadingPet=isLoading;
    }
    else if(type == "Phụ kiện"){
      const {data, isLoading:isLoading} = useProductSearch({
        keyword: keyword,
        page: Page,
        limit: Limit,
        sort: Sort,
      });
      
      filterItem=data;
      isLoadingProduct=isLoading;
      
      
    }
    else if(type == "All"){
        const {data, isLoading:isLoading} = useSearchAll({
          keyword: keyword,
          page: Page,
          limit: Limit,
          sort: Sort,
        });

        filterItem=data
        isLoadingAll=isLoading;
    }

    const GetItem = (type)=>{
      switch(type){
        case "Chó":
          return filterItem?.pets ?? [];
        case "Mèo":
          return filterItem?.pets ?? [];
        case "Phụ kiện":
          return filterItem?.products ?? [];
        case "All":
          return filterItem?.results ?? [];
      }
    }
    var Item = GetItem(type);
    
    useEffect(()=>
          {
            setNavDirect( GenNavSearch(type) );
            
            
          }
          ,[type]);
    const totalItems = filterItem?.totalItems ?? 0;
    const totalPage = filterItem?.totalPage ?? 0;
    useEffect(() => {
            document.title = "Tìm kiếm | DCAT Store";
            }, []);

    
    const CardBody = (type )=>{
      switch(type){
        case "Chó":
          return <PetCardBody Pet={Item} SetPet={setPet} Header={header} SetSort={SetSort} Petlength={totalItems} type="Pet"
            Page={Page}
            SetPage={SetPage}
            TotalPage={totalPage}
            isLoading={isLoadingPet}
          ></PetCardBody>
        case "Mèo":
            return <PetCardBody Pet={Item} SetPet={setPet} Header={header} SetSort={SetSort} Petlength={totalItems} type="Pet"
            Page={Page}
            SetPage={SetPage}
            TotalPage={totalPage}
            isLoading={isLoadingPet}
            ></PetCardBody>
        case "Phụ kiện":
          return <PetCardBody Pet={Item} SetPet={setPet} Header={header} SetSort={SetSort} Petlength={totalItems} type="Product"
            Page={Page}
            SetPage={SetPage}
            TotalPage={totalPage}
            isLoading={isLoadingProduct}
          ></PetCardBody>
        case "All":
          return <PetCardBody Pet={Item} SetPet={setPet} Header={header} SetSort={SetSort} Petlength={totalItems} type="All"
            Page={Page}
            SetPage={SetPage}
            TotalPage={totalPage}
            isLoading={isLoadingAll}
            ></PetCardBody>
      }
    }

    return (

        <>
        
            <CategoryPageWrapper className="CategoryPage">
                <CategoryPageContainer className="CategoryPage-Container">

                    
                    
                    <PicIntro/>
                    <PageDirect NavDirect={NavDirect}/>

                    <CategoryPageBody className="CategoryPage-Body">
                        {/* {type =="Pet"?
                        <FilterBoard GenderChosen={Gender} SetGender={SetGender} ColorChosen={Color} SetColor={SetColor} SetPrice={SetPrice} ></FilterBoard>
                        :""
                        } */}
                       
                        {/* <PetCardBody Pet={product} SetPet={setPet} Header={header} SetSort={SetSort} Petlength={totalItems} type="Pet"></PetCardBody> */}
                        {CardBody(type)}
                    </CategoryPageBody>

                </CategoryPageContainer>
                
            </CategoryPageWrapper>
           
        </>
    )


}

export default CategorySearchPage;