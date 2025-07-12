import styled from "styled-components"
import ImageSlider from "../ImageSlider";
import { DetailPetTable } from "./DetailPetTable";
import { useGetDetailPet } from "../../../services/hook/DetailHook";
import { DescriptionPet } from "./DescriptionPet";
import Recommmend from "../Recommend";
import Spinner from 'react-bootstrap/Spinner';
import { usePetQueryFetchFilter } from "../../../services/hook/categoryHook";
import { useRecommendPet } from "../../../services/hook/DetailHook";
import { useEffect, useState } from "react";
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
        width:98%;
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

const PetLabel = [
    
    { "sku": "SKU"},
    { "age": "Tháng tuổi" },
    { "gender": "Giới tính"},
    { "breed": "Giống"},
    {"species":"Loài"},
    { "color": "Màu"},
    { "status": "Tình trạng" },
    { "dewormed": "Tẩy giun" },
    { "source": "Nguồn gốc" },
    { "health": "Sức khỏe" },
    { "shipping": "Vận chuyển"},
    { "vaccinated": "Tiêm phòng"}
];
const PetValue = [
   
    {"sku":"MK3001"},
    {"age":"2 tháng tuổi"},
    {"gender":"Đực"},
    {"breed":"Munchkin"},
     {"species":"Mèo"},
     { "color": "Màu"},
    { "status": "Có sẵn" },
    { "dewormed": "1 lần" },
    { "source": "Thuần chủng sinh sản tại trại Pethouse" },
    { "health": "Chân ngắn, lông mượt, nhanh nhẹn" },
    { "shipping": "Miễn phí"},
    { "vaccinated": "Đã tiêm phòng"}


]

export function PetDetailContainter({id}){
    const {data:pet,isLoading: isLoadingPet} = useGetDetailPet(id);

    const {data:petRecommend, isLoading:isLoadingRecommend} = useRecommendPet({
                  sort: 1,
                  species:pet?.PetDetail?.species,
                  page:1,
                  limit:12,
                  id:id
    },
    {
        enabled: !!pet?.PetDetail?.species
    })

    return(
        <>
            <DetailContainer>

                
                    {
                        isLoadingPet?
                        <SpinnerContainer>
                            <Spinner animation="border" variant="info" style={{ width: "4rem", height: "4rem" }} className='mr-2' />
                        </SpinnerContainer>
                        :
                        <DetailItem>
                            <ImageSlider PicImg={pet?.PetDetail?.image}></ImageSlider>
                            <DetailPetTable pet={pet?.PetDetail} label={PetLabel} value={PetValue}></DetailPetTable>
                        </DetailItem>

                    }
                
                    
                

                <DescriptionPet></DescriptionPet>
                <Recommmend data = {petRecommend?.pets} type="Pet" isLoading={isLoadingRecommend}></Recommmend>
                


            </DetailContainer>
        </>
    )


}