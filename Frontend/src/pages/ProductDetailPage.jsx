import MainMenu from '../components/MainMenu'
// import DetailPic from '../components/DetailPage/DetailPic'
// import DetailInfo from '../components/DetailPage/DetailInfo'
// import Feedback from '../components/DetailPage/Feedback'
// import Recommmend from '../components/DetailPage/Recommend'
import { PetDetailContainter } from '../components/DetailPage/Pet/PetDetailContainer';
import { ProductDetailContainter } from '../components/DetailPage/Product/ProductDetailContainer';
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
            <PetDetailContainter id={id}></PetDetailContainter>
            :
            <ProductDetailContainter id={id}></ProductDetailContainter>}

            
            <Footer></Footer>
        </>
    )


}

export default ProductDetail