import MainMenu from '../components/MainMenu'
import DetailPic from '../components/DetailPage/DetailPic'
import DetailInfo from '../components/DetailPage/DetailInfo'
import Footer from '../components/Footer'
import Feedback from '../components/DetailPage/Feedback'
import Recommmend from '../components/DetailPage/Recommend'
import styled from 'styled-components';

const ProductDetailContainer = styled.div`
  margin:auto;
  width: 80%;
  gap: 20px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  gap:1.5rem;
`;

const ProductDetailItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 60px;
  border: 1px solid rgb(175, 175, 175);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 15px;
`;

// const StyledTable = styled.table`
//   border: 1px solid black;
//   border-collapse: collapse;

//   th,
//   td {
//     border: 1px solid black;
//   }
// `;



function ProductDetail(){
    return(
        <>
            <ProductDetailContainer>
                
                <MainMenu></MainMenu>
                
                <ProductDetailItem>

                    <DetailPic/>
                    <DetailInfo/>
                    

                </ProductDetailItem>

                <Feedback/>
                <Recommmend/>

            </ProductDetailContainer>
            <Footer></Footer>
        </>
    )


}

export default ProductDetail