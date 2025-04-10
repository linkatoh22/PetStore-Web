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
  width: 22%;
  justify-content: space-between;
  align-items: baseline;
`;

const PcTitleName = styled.h2`
  font-weight: bold;
  font-size: 28px;
  color: #003459;
`;

const PcTitleQuantity = styled.span`
  color: #667479;
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



function PetCardBody({Pet,SetPet}){
  
    const options =[
        {label: "Sort By: All",value:0},
        {label: "Most Popular",value:1},
        {label: "Least Popular",value:2},
        {label: "Most Expensive",value:3},
        {label: "Cheapest",value:4},
    ]
    return(
        <>
            <PcContainer className="pc-container">
                <PcTitleContainer className="pc-title-container">

                    <PcTitle className="pc-title">
                        <PcTitleName className="pc-title-name">
                                Sản Phẩm
                        </PcTitleName>

                        <PcTitleQuantity className="pc-title-quantity">
                                {Pet.length} Kết quả
                        </PcTitleQuantity>
                    </PcTitle>


                    <div className="pc-title-select">
                        <PcSort className="pc-sort">
                            {
                                options.map(

                                    option=>(
                                        <option value={option.value}>
                                            {option.label}
                                        </option>
                                    )
                                )
                            }
                        </PcSort>
                    </div>

                </PcTitleContainer>


                <PcCardContainer className="pc-card-container">
                    
                  
                    {/* {
                                Pet.map((item)=>{
                                  return (<PetsCard 
                                  key={item._id}
                                  petImg = {item.image[0]}
                                  petName={item.name}
                                  petGender={item.gender}
                                  petAge={item.age}
                                  petPrice={item.price}></PetsCard>)

                                }
                              )
                    } */}
                  
                  {
                    Pet.length>0?
                    (
                                Pet.map((item)=>{
                                  return (<PetsCard 
                                  key={item._id}
                                  petImg = {item.image[0]}
                                  petName={item.name}
                                  petGender={item.gender}
                                  petAge={item.age}
                                  petPrice={item.price}></PetsCard>)

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