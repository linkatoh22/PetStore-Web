import styled from "styled-components"

import detail1 from "../../../assets/pic/detail-product/detail1.png";
import detail2 from "../../../assets/pic/detail-product/detail2.png";
import detail3 from "../../../assets/pic/detail-product/detail3.png";
import detail4 from "../../../assets/pic/detail-product/detail4.png";
import detail5 from "../../../assets/pic/detail-product/detail5.png";
import detail6 from "../../../assets/pic/detail-product/detail6.png";
import ImageSlider from "../ImageSlider";
import { DetailPetTable } from "./DetailPetTable";
import { IconButton  } from "@mui/material";
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Accordion from 'react-bootstrap/Accordion';
import { DescriptionPet } from "./DescriptionPet";
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
const myPic=[
        {pic:detail1},
        {pic:detail2},
        {pic:detail3},
        {pic:detail4},
        {pic:detail5},
        {pic:detail6},
        {pic:detail6},
    ]
export function PetDetailConainter(){
    return(
        <>
            <DetailContainer>
                <DetailItem>

                    <ImageSlider PicImg={myPic}></ImageSlider>
                    <DetailPetTable label={PetLabel} value={PetValue}></DetailPetTable>
                </DetailItem>

                <DescriptionPet></DescriptionPet>

            </DetailContainer>
        </>
    )


}