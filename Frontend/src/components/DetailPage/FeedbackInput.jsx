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

const FeedbackInputContainer = styled.div`
    border: 3px solid var(--main-blue);
    padding:1.5rem;
    margin:auto;
    width:60%;
    display:flex;
    flex-direction:column;
    gap:0.5rem;
`
const FeedbackInputTitle = styled.div`
  font-size:1.2rem;
  font-weight:bold;

`
const FeedbackInputItemContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:0.5rem;
    font-size:1rem;
    padding-left:1rem;
`
const FeedbackContent = styled.textarea`
  width: 100%;
  height:150px;
  padding:15px 20px;


`
export function FeedbackInput({isAuthenticate}){
    
    
    return(
        <FeedbackInputContainer>
            <FeedbackInputTitle>
              <h5>Đánh giá của bạn</h5>
                  <FeedbackInputItemContainer>
                    <div>Đánh giá của bạn:</div>
                    
                    <div>Nhận xét của bạn:</div>
                    <FeedbackContent placeholder="Nhập nhận xét của bạn">

                    </FeedbackContent>
                  </FeedbackInputItemContainer>
              </FeedbackInputTitle>
        </FeedbackInputContainer>
    )

}

