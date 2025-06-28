import styled from "styled-components"

import detail1 from "../../../assets/pic/detail-product/detail1.png";
import detail2 from "../../../assets/pic/detail-product/detail2.png";
import detail3 from "../../../assets/pic/detail-product/detail3.png";
import detail4 from "../../../assets/pic/detail-product/detail4.png";
import detail5 from "../../../assets/pic/detail-product/detail5.png";
import detail6 from "../../../assets/pic/detail-product/detail6.png";
import ImageSlider from "../ImageSlider";
import { DetailPetTable } from "./DetailPetTable";
import { useGetDetailPet } from "../../../services/hook/DetailHook";
import { DescriptionPet } from "./DescriptionPet";

import Recommmend from "../Recommend";
import Spinner from 'react-bootstrap/Spinner';
const SpinnerContainer = styled.div`
    display:flex;
    width:100%;
    align-items:center;
    justify-content:center;
    height:500px;

`
const DetailContainer = styled.div`
  margin:auto;
  width: 80%;
  gap: 20px;
  margin-bottom: 50px;
  padding-block:2rem;
  display: flex;
  flex-direction: column;
  gap:1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: row;
  gap:2rem;
  width: 100%;
  
  border: 1px solid rgb(175, 175, 175);
  border-radius: 20px;
    
  
  box-shadow: 15px;
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
                {/* <Recommmend></Recommmend> */}
                


            </DetailContainer>
        </>
    )


}