import MainMenu from '../components/MainMenu'
// import DetailPic from '../components/DetailPage/DetailPic'
// import DetailInfo from '../components/DetailPage/DetailInfo'
// import Feedback from '../components/DetailPage/Feedback'
// import Recommmend from '../components/DetailPage/Recommend'
import { PetDetailConainter } from '../components/DetailPage/Pet/PetDetailContainer';
import Footer from '../components/Footer'
import styled from 'styled-components';

// const ProductDetailContainer = styled.div`
//   margin:auto;
//   width: 80%;
//   gap: 20px;
//   margin-bottom: 50px;
//   padding-block:2rem;
//   display: flex;
//   flex-direction: column;
//   gap:1.5rem;
// `;

// const ProductDetailItem = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   width: 100%;
//   gap: 60px;
//   border: 1px solid rgb(175, 175, 175);
//   border-radius: 20px;
//   padding: 25px;
//   box-shadow: 15px;
// `;

// const StyledTable = styled.table`
//   border: 1px solid black;
//   border-collapse: collapse;

//   th,
//   td {
//     border: 1px solid black;
//   }
// `;



function ProductDetail({type}){
    return(
        <>
            <MainMenu></MainMenu>
            {type=="Pet"? <PetDetailConainter></PetDetailConainter>:null}

            {/* <ProductDetailContainer>
                
                
                
                <ProductDetailItem>

                    <DetailPic/>
                    <DetailInfo/>
                    

                </ProductDetailItem>

                <Feedback/>
                <Recommmend/>

            </ProductDetailContainer> */}
            <Footer></Footer>
        </>
    )


}

export default ProductDetail