// import "../../styles/components/PicIntro.css"
import Pic from "../../assets/CategoryBack.png"
import styled from "styled-components";

const CategoryPic = styled.img`
  width: 100%;
  object-fit: cover;
`;

const CategoryParagraphContainer = styled.div`
  color: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
  top: 100px;
  right: 140px;
  width: 35%;
`;

const CategoryTitle = styled.h1`
  font-size: 3.7rem;
  font-weight: bold;
`;

const CategorySubTitle = styled.h2`
  text-align: right;
  font-size: 40px;
  font-weight: bold;
`;

const CategoryParagraph = styled.p`
  text-align: right;
  display: flex;
  justify-content: right;
  font-size: 17px;
`;

const CBtnGroup = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: right;
`;

const CTransparentBtn = styled.button`
  color: white;
  background-color: transparent;
  font-weight: bold;
  font-size: 18px;
  border-width: 1px;
  border-radius: 20px;
  border-color: white;
  padding: 13px 30px;
`;

const CBlueBtn = styled.button`
  color: #002A48;
  background-color: white;
  font-weight: bold;
  font-size: 18px;
  border: none;
  border-radius: 20px;
  padding: 13px 30px;
`;

function PicIntro(){

    return(
        <>
            <div style={{position:"relative"}}className="Category-Pic-Container">


                <CategoryPic className="Category-Pic" src={Pic}/>
                
                <CategoryParagraphContainer className="Category-paragraph-container">

                    <CategoryTitle className="Category-title">One More Friend</CategoryTitle>

                    <CategorySubTitle className="Category-sub-title">Thousands More Fun!</CategorySubTitle>

                    <CategoryParagraph className="Category-paragraph">Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!</CategoryParagraph>

                    <CBtnGroup className="c-btn-group">
                        <CTransparentBtn className="c-transparent-btn">View Intro</CTransparentBtn>

                        <CBlueBtn className="c-blue-btn">Explore Now</CBlueBtn>

                    </CBtnGroup>

                </CategoryParagraphContainer>
            </div>
        </>
    )

}
export default PicIntro;