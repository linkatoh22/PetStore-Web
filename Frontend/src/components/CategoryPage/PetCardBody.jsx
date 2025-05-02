import { useEffect } from "react";
import PetsCard from "../Card/PetsCard";
// import "../../styles/components/PetCardBody.css"
import styled from "styled-components";


const PcContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const PcTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PcTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap:1rem;
  align-items: baseline;
`;

const PcTitleName = styled.h2`
  font-weight: bold;
  font-size: 28px;
  color: #003459;
`;

const PcTitleQuantity = styled.span`
  color: var(--grey-600);
  font-size: 20px;
`;

const PcSort = styled.select`
  font-size: 18px;
  padding: 10px 15px;
  
  &:focus {
    outline: none;
  }
`;

const PcCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;



function PetCardBody({Pet,SetPet,Header,SetSort,Petlength,type}){
  
    const options =[
        {label: "Sắp xếp theo: Tất cả",value:0},
        {label: "Phổ biến nhất",value:1},
        {label: "Ít phổ biến",value:2},
        {label: "Đắt nhất",value:3},
        {label: "Rẻ nhất",value:4},
    ]
    return(
        <>
            <PcContainer className="pc-container">
                <PcTitleContainer className="pc-title-container">

                    <PcTitle className="pc-title">
                        <PcTitleName className="pc-title-name">
                                {Header}
                        </PcTitleName>

                        <PcTitleQuantity className="pc-title-quantity">
                                {Petlength} Kết quả
                        </PcTitleQuantity>
                    </PcTitle>


                    <div className="pc-title-select">
                        <PcSort className="pc-sort" onChange={(e)=>SetSort(Number(e.target.value))}>
                            {
                                options.map(

                                    option=>(
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    )
                                )
                            }
                        </PcSort>
                    </div>

                </PcTitleContainer>

                <PcCardContainer className="pc-card-container">
                
                  {
                    Pet.length>0?
                    (
                                Pet.map((item)=>{
                                  return (<PetsCard 
                                  key={item._id}
                                  Item = {item} type={type}></PetsCard>)

                                }
                              )
                    )
                    :
                    (<div>Không tìm thấy kết quả</div>)
                }
                 
                </PcCardContainer> 

                
            </PcContainer>          
        </>
    );


}

export default PetCardBody;