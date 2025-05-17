// import '../../styles/components/Recommend.css'
import PetsCard from '../Card/PetsCard'
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle'

const RecommendContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RecommendContext = styled.div`
  font-weight: bold;
  font-size: 25px;
  color: #003459;
`;

const RecommendPetcard = styled.div`
  padding-block:1rem;
`;


function Recommmend(){

    return(
        <>
            <RecommendContainer className='recommend-container'>
                

                <RecommendContext className='recommend-context'>Các sản phẩm tương tự</RecommendContext>

                <RecommendPetcard className='recommend-petcard'>
                        <Swiper
                          modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={4}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        >
                          <SwiperSlide><PetsCard/></SwiperSlide>
                          <SwiperSlide><PetsCard/></SwiperSlide>
                          <SwiperSlide><PetsCard/></SwiperSlide>
                          <SwiperSlide><PetsCard/></SwiperSlide>
                          <SwiperSlide><PetsCard/></SwiperSlide>
                          <SwiperSlide><PetsCard/></SwiperSlide>
                          <SwiperSlide><PetsCard/></SwiperSlide>
                          <SwiperSlide><PetsCard/></SwiperSlide>
                        </Swiper>
                        
                        
                        
                </RecommendPetcard>
            </RecommendContainer>

        </>
    )
}

export default Recommmend;