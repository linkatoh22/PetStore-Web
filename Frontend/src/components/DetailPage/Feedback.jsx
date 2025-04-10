// import "../../styles/components/Feedback.css"
import Detail1 from "../../assets/pic/feedback/detail1.jpg"
import Detail2 from "../../assets/pic/feedback/detail2.jpg"
import Detail3 from "../../assets/pic/feedback/detail3.jpg"
import Detail4 from "../../assets/pic/feedback/detail4.jpg"
import Detail5 from "../../assets/pic/feedback/detail5.jpg"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import styled from "styled-components";
const FeedbackCotainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FeedbackTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const FeedbackPicContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  flex-wrap: nowrap;
  overflow-x: hidden;
`;

const FeedbackPic = styled.div`
  width: 100%;
`;

const SwiperContainer = styled.div`
  width: 100%;
`;

// const SwiperSlide = styled.div`
//   margin-bottom: 40px;
// `;

const StyledSwiperSlide = styled.div`
  margin-bottom: 40px;
`;

const SwiperPaginationBullet = styled.div`
  width: 12px !important;
  height: 12px !important;
  background-color: gray !important;
  opacity: 0.6 !important;
  transition: all 0.3s ease-in-out !important;
`;

const SwiperPaginationBulletActive = styled.div`
  background-color: #003459 !important;
  opacity: 1 !important;
  transform: scale(1.3) !important;
  width: 18px !important;
  border-radius: 14px !important;
`;



function Feedback(){
    
    const myImage = [
        {img:Detail1},
        {img:Detail2},
        {img:Detail5},
        {img:Detail4},
        {img:Detail3},
        

    ]
    return(
        <>
            <FeedbackCotainer>
                <FeedbackTitle>Our lovely customers</FeedbackTitle>
                    
                    {/* <div className="Feedback-Pic-Container">
                        {myImage.map((Imgs,index)=>{
                            return <img className="Feedback-Pic" key={index} src={Imgs.img}></img>

                        })}

                    </div> */}

                <Swiper
                   style={{
                    
                    "--swiper-pagination-bullet-size": "14px",
                    "--swiper-pagination-bullet-horizontal-gap": "5px"
                  }}
                    modules={[Pagination]}
                    spaceBetween={10}
                    slidesPerView={4}
                    
                    pagination={{ clickable: true }}
                    
                    
                    >


                    
                  {myImage.map((Imgs, index) => (
                    <SwiperSlide key={index}>
                      <FeedbackPic className="Feedback-Pic" src={Imgs.img} />
                    </SwiperSlide>
                  ))}

                   


                </Swiper>                    

            </FeedbackCotainer>        
        </>
    )

}

export default Feedback