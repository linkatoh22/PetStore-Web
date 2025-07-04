// import "../styles/components/FilterBoard.css"
import { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
const FilterContainer = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 20%;
    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          font-size: 0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.9rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1rem;
    }
`;

const FTitle = styled.div`
  color: #003459;
  font-size: 1.5rem;
  font-weight: bold;
  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.8rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          font-size: 0.9rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 1.1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1.3rem;
    }
`;

const FSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  .f-checkbox{
    height:1rem;
    width:1rem;

     @media (min-width: 0px) and (max-width: 598.99px) {
        height:0.4rem;
        width:0.4rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       height:0.6rem;
        width:0.6rem;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        height:0.8rem;
        width:0.8rem;
        
    }
    @media (min-width: 1000px) and (max-width: 1500px) {
        height:0.8rem;
        width:0.8rem;
        
    }
  
  }
`;

const FLabelCheckbox = styled.label`
  display: flex;
  flex-direction: row;
  align-items:center;
  gap: 0.3rem;
  
`;

const FSubTitle = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.7rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          font-size: 0.8rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1.1rem;
    }
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
  font-size: 1.2rem;
  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          font-size: 0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.9rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1rem;
    }
`;

const FBtnPrice = styled.button`
  
  background-color: var(--clr-dark-blue);
  color: white;
  border-radius: 15px;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  padding: 7px;
  transition: background-color 0.15s;

  &:active {
    background-color: var(--main-blue);
  }

  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          font-size: 0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 0.9rem;
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
            toast.error("Bạn vui lòng nhập mức giá hợp lệ!")
        }
        else{
            if((MinPrice&&MaxPrice)&& MaxPrice<MinPrice ){
                toast.error("Bạn vui lòng nhập mức giá hợp lệ!")
                
            }
            else
            {
                SetPrice({"minPrice":MinPrice,"maxPrice":MaxPrice})
                SetPage(1)
                
                 
            }
        }
        

    }

    const handleCheckGender = (gender)=>{
        if(GenderChosen===gender)
            SetGender("")
        else
            SetGender(gender)
        
        SetPage(1)
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
        
        SetPage(1)

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
                                Áp dụng
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