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
    const [Limit,SetLimit] = useState(16);
    const [TotalPage,SetTotalPage] = useState(1);

    const isValidPriceMax =  (Price.maxPrice != null)? true:false
    const isValidPriceMin =  (Price.minPrice != null)? true:false
    
    const isValidGender = Gender !== undefined && Gender !== null && Gender !== "";
    const isValidColor = Array.isArray(Color) && Color.length > 0;
    var filterItem = [];

    if(type == "Chó" || type == "Mèo"){
      const {data} = usePetSearch({
        keyword: keyword,
        page: Page,
        limit: Limit,
        sort: Sort,
        species: type,
      });
      filterItem= data;
    }
    else if(type == "Phụ kiện"){
      const {data} = useProductSearch({
        keyword: keyword,
        page: Page,
        limit: Limit,
        sort: Sort,
      });
      
      filterItem=data;
      console.log('Phụ kiện',filterItem)
      
    }
    else if(type == "All"){
        const {data} = useSearchAll({
          keyword: keyword,
          page: Page,
          limit: Limit,
          sort: Sort,
        });
        console.log('All',data)
        filterItem=data
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


    
    const CardBody = (type )=>{
      switch(type){
        case "Chó":
          return <PetCardBody Pet={Item} SetPet={setPet} Header={header} SetSort={SetSort} Petlength={totalItems} type="Pet"></PetCardBody>
        case "Mèo":
            return <PetCardBody Pet={Item} SetPet={setPet} Header={header} SetSort={SetSort} Petlength={totalItems} type="Pet"></PetCardBody>
        case "Phụ kiện":
          return <PetCardBody Pet={Item} SetPet={setPet} Header={header} SetSort={SetSort} Petlength={totalItems} type="Product"></PetCardBody>
        case "All":
          return <PetCardBody Pet={Item} SetPet={setPet} Header={header} SetSort={SetSort} Petlength={totalItems} type="All"></PetCardBody>
      }
    }

    return (

        <>
        <MainMenu/>
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
            <Footer></Footer>
        </>
    )


}

export default CategorySearchPage;