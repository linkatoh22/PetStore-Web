import styled from "styled-components"

import ImageSlider from "../ImageSlider";
import { DetailProduct } from "./DetailProduct";
import { DescriptionProduct } from "./DescriptionProduct";
import { useGetDetailProduct } from "../../../services/hook/DetailHook";
import Recommmend from "../Recommend";
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from "react";
import { useProductQueryFetchFilter } from "../../../services/hook/categoryProductHook";
import { useRecommendProduct } from "../../../services/hook/DetailHook";
const SpinnerContainer = styled.div`
    display:flex;
    width:100%;
    align-items:center;
    justify-content:center;
    height:500px;

    @media (min-width: 0px) and (max-width: 598.99px) {
        height:200px;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        height:200px;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        height:400px;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        height:400px;
    }

`
const DetailContainer = styled.div`
  margin:auto;
  width: 80%;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  

    padding-block:5.5rem;
  @media (min-width: 0px) and (max-width: 598.99px) {
        padding-block:4.5rem;
        width:100%;
        gap:0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding-block:4.3rem; 
          width:90%;
          gap:0.8rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding-block:4.6rem;
        width:85%;
        gap:1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding-block:5.3rem;
        width:80%;
        gap:1rem;

    }
`;

const DetailItem = styled.div`
  padding:1.5rem;
  display: flex;
  flex-direction: row;
  gap:2rem;
  width: 100%;
  border: 1px solid rgb(175, 175, 175);
  border-radius: 20px;
  box-shadow: 15px;
     @media (min-width: 0px) and (max-width: 598.99px) {
        
        gap:0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        
          gap:0.8rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        
        gap:1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        
        gap:1.2rem;

    }
`;



export function ProductDetailContainter({id}){
    const {data:product,isLoading:isLoadingProduct} = useGetDetailProduct(id);

    const {data:filterProductRecommend = [], isLoading:isLoadingProductRecommend} = useProductQueryFetchFilter({
                      category: product?.ProductDetail?.category,
                      id:id,
                      sort: 1,
                      page:1,
                      limit:12,
        },
    {
        enabled: !!product?.ProductDetail?.category
    })
   
    return(
        <>
            <DetailContainer>
                {
                        isLoadingProduct?
                        <SpinnerContainer>
                            <Spinner animation="border" variant="info" style={{ width: "4rem", height: "4rem" }} className='mr-2' />
                        </SpinnerContainer>
                        :
                        <DetailItem>

                            <ImageSlider PicImg={product?.ProductDetail?.image}></ImageSlider>
                            <DetailProduct product={product?.ProductDetail} ></DetailProduct>
                        </DetailItem>
                }           

                <DescriptionProduct product={product?.ProductDetail}></DescriptionProduct>
                <Recommmend data={filterProductRecommend?.products} type={"Product"} isLoading={isLoadingProductRecommend}></Recommmend>
                


            </DetailContainer>
        </>
    )


}