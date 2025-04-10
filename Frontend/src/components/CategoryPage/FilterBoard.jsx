// import "../styles/components/FilterBoard.css"
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



function FilterBoard(){

    return(
        <>
            <FilterContainer className="filter-container">
                <FTitle className="f-title">Filter</FTitle>

                {/*GENDER */}
                <FSection className="f-section">

                    <FSubTitle className="f-sub-title">
                        Gender
                    </FSubTitle>

                    <FLabelCheckbox className="f-label-checkbox">
                        <input className="f-checkbox" type="checkbox"></input>
                        Male
                    </FLabelCheckbox>

                    <FLabelCheckbox className="f-label-checkbox">
                        <input className="f-checkbox" type="checkbox"></input>
                        Female
                    </FLabelCheckbox>

                    <FLineDivider className="f-Line-Divider"></FLineDivider>

                </FSection>

                

                {/*COLOR */}

                <FSection className="f-section">
                    <FSubTitle className="f-sub-title">
                        Color
                    </FSubTitle>

                    <laFLabelCheckboxbel className="f-label-checkbox">
                        <input className="f-checkbox" type="checkbox"></input>
                        Red
                    </laFLabelCheckboxbel>

                    <FLabelCheckbox className="f-label-checkbox">
                        <input className="f-checkbox" type="checkbox"></input>
                        Apricot
                    </FLabelCheckbox>

                    <FLabelCheckbox className="f-label-checkbox">
                        <input className="f-checkbox" type="checkbox"></input>
                        Black & White
                    </FLabelCheckbox>

                    <FLabelCheckbox className="f-label-checkbox">
                        <input className="f-checkbox" type="checkbox"></input>
                        Silver
                    </FLabelCheckbox>

                    <FLabelCheckbox className="f-label-checkbox">
                        <input className="f-checkbox" type="checkbox"></input>
                        Tan
                    </FLabelCheckbox>

                    <FLineDivider className="f-Line-Divider"></FLineDivider>

                </FSection>

                {/*PRICE*/}

                <FSection className="f-section">
                    <FSubTitle className="f-sub-title">
                        Price
                    </FSubTitle>

                   <FPriceGroup className="f-price-group">
                        <FPriceInput placeholder="Min" className="f-price-input" type="number"></FPriceInput>
                        <FPriceInput placeholder="Max" className="f-price-input" type="number"></FPriceInput>
                   </FPriceGroup>

                   
                        <FBtnPrice className="f-btn-price">
                                Apply Price
                        </FBtnPrice>
                   
                   
                    <FLineDivider className="f-Line-Divider"></FLineDivider>

                </FSection>

                {/*BREED*/}
                <FSection className="f-section">
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

                </FSection>




            </FilterContainer>
        </>
    )

}

export default FilterBoard;