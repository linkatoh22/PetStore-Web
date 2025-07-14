import styled from "styled-components";
import { FaMapMarkerAlt,FaCheck,FaPhoneAlt  } from "react-icons/fa";

const MainFooter = styled.footer`
  background-color: var(--main-blue);
  width:100%;
  color:white;
  font-size:1.1rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
         font-size:0.4rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       
        font-size:0.6rem;
        
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
      font-size:0.8rem;
     
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        
    }
  
`;

const MainFooterContainer = styled.div`
  width: 80%;
  margin:auto;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  padding-block:2rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
         padding-block:0.7rem;
         width: 95%;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding-block:0.9rem;
        width: 90%;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
      padding-block:1rem;
       width: 85%;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding-block:1.7rem;
        width: 80%;
    }
`;

const ParagraphContainer = styled.div`
  display:flex;
  flex-direction:column;
  width:25%;

  gap:0.8rem;
  

    @media (min-width: 0px) and (max-width: 598.99px) {
          width:30%;
         gap:0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        width:30%;
        
        gap:0.6rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
      gap:0.6rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        
    }
`

const HeaderParagraph = styled.div`
  font-weight:bold;
  font-size:1.5rem

  @media (min-width: 0px) and (max-width: 598.99px) {
         font-size:0.8rem;
        gap:0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size:0.9rem;
        gap:0.6rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
      font-size:1rem;
      gap:0.6rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        
    }


`
const DarkDivider= styled.div`
    width:15%;
    background-color: rgba(255, 255, 255, .3);

    height:0.2rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
         height:0.1rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        height:0.1rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
      height:0.1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        
    }
`

const HotlineCall = styled.div`
  width:60%;
  background-color:white;
  font-weight:bold;
  
  color:red;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:5px;
  gap:0.3rem;
  padding:0.4rem;

  

  

  
`
const FooterCopyright = styled.div`
  background-color:var(--clr-dark-blue);
  color:rgba(255, 255, 255, 0.37);
  width:100%;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  padding-block:1rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
        padding-block:0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding-block:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
      padding-block:0.8rem;
    }


`
function Footer(){
    return (
        <>
            <MainFooter className="main-footer">
                  <MainFooterContainer>

                      <ParagraphContainer>
                          <HeaderParagraph> SƠ LƯỢC VỀ DCAT STORE</HeaderParagraph>
                          <DarkDivider></DarkDivider>
                          <div>
                            <i>DCAT Store </i>là trại nhân giống cung cấp thú cảnh lớn tại Việt Nam. <i>DCAT Store</i> hiện tại có 3 cửa hàng chính tại <span style={{fontWeight:"bold"}}>428 Minh Khai, Quận Hai Bà Trưng, Tp Hà Nội; 1045 Kha Vạn Cân, Phường Linh Trung, Thủ Đức, Tp.Hcm</span>.</div>
                            
                            <div> Ngoài ra, trại nhân giống chính của <i>DCAT Store</i> có tại Sóc Sơn Hà Nội và Thủ Dầu Một, Bình Dương đang sở hữu hơn 500 con giống với các loại thú cảnh lớn nhỏ khác nhau.
                          </div>

                      </ParagraphContainer>


                      <ParagraphContainer>
                          <HeaderParagraph> THÔNG TIN LIÊN HỆ</HeaderParagraph>
                          <DarkDivider></DarkDivider>
                          <div>
                            <FaMapMarkerAlt /> Cửa Hàng Miền Nam: 1045 Kha Vạn Cân, Linh Trung, Thủ Đức, Tp.Hcm.
                          </div>

                          <div>
                            <FaMapMarkerAlt /> Trại nhân giống MN: Huỳnh Văn Lũy, Thủ Dầu Một, Bình Dương.
                          </div>


                          <div>
                            <FaMapMarkerAlt /> Trại nhân giống MN: Huỳnh Văn Lũy, Thủ Dầu Một, Bình Dương.
                          </div>


                          <div>
                             <FaMapMarkerAlt /> Trại nhân giống MB: Thôn Đức Hậu, Xã Đức Hòa, Sóc Sơn, Tp.Hà Nội.
                          </div>
                      </ParagraphContainer>


                      <ParagraphContainer>
                          <HeaderParagraph>
                            CAM KẾT CỦA CHÚNG TÔI
                          </HeaderParagraph>
                          <DarkDivider></DarkDivider>
                          <div> <FaCheck/> Thú cưng khỏe mạnh, bảo hành 1 năm. </div>
                          <div> <FaCheck/> Đổi trả hoàn tiền 100% khi có vấn đề. </div>
                          <div> <FaCheck/> Hỗ trợ trả góp 100%. </div>
                          <div> <FaCheck/> Bảo mật danh tính người mua 100%. </div>
                          <HotlineCall>
                            <FaPhoneAlt /> <div>HOTLINE: 0123456789</div>
                          </HotlineCall>

                      </ParagraphContainer>




                  </MainFooterContainer> 

                  <FooterCopyright>

                      Copyright {new Date().getFullYear()} © DCAT Store - Cung cấp phụ kiện và thú cưng
                  </FooterCopyright>
            </MainFooter>

            
        </>
    )


}

export default Footer;