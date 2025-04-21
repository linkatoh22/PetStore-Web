// import "../styles/components/FilterBoard.css"
import { useEffect, useState } from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 20%;
`;

const FTitle = styled.h3`
  color: #003459;
  font-size: 30px;
  font-weight: bold;
`;

const FSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FLabelCheckbox = styled.label`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const FSubTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const FLineDivider = styled.div`
  border-top: 1px solid #bbb;
`;

const FPriceGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FPriceInput = styled.input`
  width: 45%;
  font-size: 18px;
`;

const FBtnPrice = styled.button`
  font-family: "Poppins", serif;
  background-color: #003459;
  color: white;
  border-radius: 15px;
  font-weight: bold;
  font-size: 16px;
  border: none;
  padding: 7px;
  transition: background-color 0.15s;

  &:active {
    background-color: #0063aa;
  }
`;

const Color = ["Trắng","Kem","Vàng","Nâu","Đỏ","Xám","Xanh","Đen","Tam Thể"]

function FilterBoard({GenderChosen,SetGender,ColorChosen,SetColor,SetPrice}){
    const [MinPrice,setMinPrice] = useState()
    const [MaxPrice,setMaxPrice] = useState()

    const handleSetMinPrice = (price)=>{
        setMinPrice(price)
    }

    const handleSetMaxPrice = (price)=>{
        setMaxPrice(price)
    }


    const ApplyPrice = ()=>{
        if( (!MinPrice && !MaxPrice) ){
            alert("Bạn vui lòng nhập mức giá hợp lệ!")
        }
        else{
            if((MinPrice&&MaxPrice)&& MaxPrice<MinPrice ){
                alert("Bạn vui lòng nhập mức giá hợp lệ!")

            }
            else
            {
                SetPrice({"minPrice":MinPrice,"maxPrice":MaxPrice})
            }
        }


    }

    const handleCheckGender = (gender)=>{
        if(GenderChosen===gender)
            SetGender("")
        else
            SetGender(gender)
    }

    const handleCheckColor = (color)=>{
        SetColor(

            (prev) =>{
                if (prev.some((c) => c === color) )
                {
                    
                    return prev.filter ((c)=>c !==color) 
                }
                else{
                   
                    return [...prev,color]
                }
            }

        )

    }

    return(
        <>
            <FilterContainer className="filter-container">
                <FTitle className="f-title">Filter</FTitle>

                {/*GENDER */}
                <FSection className="f-section">

                    <FSubTitle className="f-sub-title">
                        Giới Tính
                    </FSubTitle>

                    <FLabelCheckbox className="f-label-checkbox">
                        <input className="f-checkbox"
                        onChange={()=>handleCheckGender("Đực")}
                        type="checkbox" 
                        checked={(GenderChosen === "Đực")}
                        
                        ></input>
                        {" Đực"}
                    </FLabelCheckbox>

                    <FLabelCheckbox className="f-label-checkbox">
                        <input className="f-checkbox" 
                        onChange={()=>handleCheckGender("Cái")}
                        type="checkbox"
                        checked={(GenderChosen === "Cái")}
                        
                        ></input>
                        {" Cái"}
                    </FLabelCheckbox>

                    <FLineDivider className="f-Line-Divider"></FLineDivider>

                </FSection>

                
                {/*COLOR */}

                <FSection className="f-section">

                    
                    <FSubTitle className="f-sub-title">
                        Màu
                    </FSubTitle>


                    {

                        Color.map((item)=>{
                            return (
                                <laFLabelCheckboxbel className="f-label-checkbox">
                                    <input className="f-checkbox" type="checkbox" checked = { ColorChosen.some((c)=>c===item) } onChange={()=>handleCheckColor(item)}></input>
                                    {" "+item}
                                </laFLabelCheckboxbel>
                            )
                            
                        })
                    }


                    <FLineDivider className="f-Line-Divider"></FLineDivider>

                </FSection>

                {/*PRICE*/}

                <FSection className="f-section">
                    <FSubTitle className="f-sub-title">
                        Giá
                    </FSubTitle>

                   <FPriceGroup className="f-price-group">
                        <FPriceInput placeholder="Min" className="f-price-input" type="number" value={MinPrice} onChange = {(e)=>handleSetMinPrice(e.target.value)}></FPriceInput>
                        <FPriceInput placeholder="Max" className="f-price-input" type="number" value={MaxPrice} onChange = {(e)=>handleSetMaxPrice(e.target.value)}></FPriceInput>
                   </FPriceGroup>

                   
                        <FBtnPrice className="f-btn-price" onClick={()=>ApplyPrice()}>
                                Apply Price
                        </FBtnPrice>
                   
                   
                    <FLineDivider className="f-Line-Divider"></FLineDivider>

                </FSection>

                {/*BREED*/}
                {/* <FSection className="f-section">
                    <FSubTitle className="f-sub-title">
                        Breed
                    </FSubTitle>

                    <FLabelCheckbox className="f-label-checkbox">
                        <input className="f-checkbox" type="checkbox"></input>
                            Small
                    </FLabelCheckbox>

                    <FLabelCheckbox className="f-label-checkbox">
                        <input className="f-checkbox" type="checkbox"></input>
                            Medium
                    </FLabelCheckbox>

                    <FLabelCheckbox className="f-label-checkbox">
                        <input className="f-checkbox" type="checkbox"></input>
                            Large
                    </FLabelCheckbox>

                    <FLineDivider className="f-Line-Divider"></FLineDivider>

                </FSection> */}




            </FilterContainer>
        </>
    )

}

export default FilterBoard;