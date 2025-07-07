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
  gap: 0.3rem;
  top: 20%;
  right: 2%;
  width: 38%;
`;

const CategoryTitle = styled.h1`
  font-size: 3.7rem;
  font-weight: bold;
  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.6rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size: 1.1rem;
    }

    @media (min-width: 800px) and (max-width: 999.99px) {
        font-size: 1.6rem;
        
    }
    @media (min-width: 1000px) and (max-width: 1500px) {
        font-size: 1.8rem;
        
    }
`;

const CategorySubTitle = styled.h2`
  text-align: right;
  font-size: 2rem;
  font-weight: bold;
  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.5rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size: 1rem;
    }

    @media (min-width: 800px) and (max-width: 999.99px) {
        font-size: 1.2rem;
        
    }
    @media (min-width: 1000px) and (max-width: 1500px) {
        font-size: 1.4rem;
        
    }
`;

const CategoryParagraph = styled.p`
  text-align: right;
  display: flex;
  justify-content: right;
  font-size: 1.2rem;
  font-weight:600;
   @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.24rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size: 0.5rem;
    }

    @media (min-width: 800px) and (max-width: 1000px) {
        font-size: 0.6rem;
        
    }
    @media (min-width: 1000px) and (max-width: 1500px) {
        font-size: 0.7rem;
        
    }

`;




function PicIntro(){

    return(
        <>
            <div style={{position:"relative"}}className="Category-Pic-Container">


                <CategoryPic className="Category-Pic" src={Pic}/>
                
                <CategoryParagraphContainer className="Category-paragraph-container">

                    <CategoryTitle className="Category-title">Một người bạn mới!</CategoryTitle>

                    <CategorySubTitle className="Category-sub-title">Một niềm vui mới</CategorySubTitle>

                    <CategoryParagraph className="Category-paragraph">Sắm thú cưng cùng DCAT STORE – nơi bạn dễ dàng tìm thấy những chú chó, mèo siêu đáng yêu, thân thiện và khỏe mạnh. DCAT STORE – bạn đồng hành lý tưởng cho những ai yêu thú cưng và muốn tìm một người bạn bốn chân thật sự!</CategoryParagraph>

                    

                    {/* <CBtnGroup className="c-btn-group">
                        <CTransparentBtn className="c-transparent-btn">View Intro</CTransparentBtn>

                        <CBlueBtn className="c-blue-btn">Explore Now</CBlueBtn>

                    </CBtnGroup> */}

                </CategoryParagraphContainer>
            </div>
        </>
    )

}
export default PicIntro;