import MainMenu from '../components/MainMenu'
// import DetailPic from '../components/DetailPage/DetailPic'
// import DetailInfo from '../components/DetailPage/DetailInfo'
// import Feedback from '../components/DetailPage/Feedback'
// import Recommmend from '../components/DetailPage/Recommend'
import { PetDetailConainter } from '../components/DetailPage/Pet/PetDetailContainer';
import { ProductDetailConainter } from '../components/DetailPage/Product/ProductDetailContainer';
import {Router,useParams} from "react-router-dom"
import Footer from '../components/Footer'
import styled from 'styled-components';
import { useEffect } from 'react';


function ProductDetail({type}){
    const {id} = useParams();
    
    return(
        <>
            <MainMenu></MainMenu>
            {type=="Pet"? 
            <PetDetailConainter id={id}></PetDetailConainter>
            :
            <ProductDetailConainter id={id}></ProductDetailConainter>}

            
            <Footer></Footer>
        </>
    )


}

export default ProductDetail