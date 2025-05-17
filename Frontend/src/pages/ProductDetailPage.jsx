import MainMenu from '../components/MainMenu'
// import DetailPic from '../components/DetailPage/DetailPic'
// import DetailInfo from '../components/DetailPage/DetailInfo'
// import Feedback from '../components/DetailPage/Feedback'
// import Recommmend from '../components/DetailPage/Recommend'
import { PetDetailConainter } from '../components/DetailPage/Pet/PetDetailContainer';
import { ProductDetailConainter } from '../components/DetailPage/Product/ProductDetailContainer';
import Footer from '../components/Footer'
import styled from 'styled-components';


function ProductDetail({type}){
    return(
        <>
            <MainMenu></MainMenu>
            {type=="Pet"? <PetDetailConainter></PetDetailConainter>:<ProductDetailConainter></ProductDetailConainter>}

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