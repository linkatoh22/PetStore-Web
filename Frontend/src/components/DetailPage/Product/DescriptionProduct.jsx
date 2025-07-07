import styled from "styled-components";
import Accordion from 'react-bootstrap/Accordion';
import { FeedBackItem } from "../FeedbackItem";
import { FeedbackInput } from "../FeedbackInput";
import { useEffect } from "react";
const DescriptionItem = styled.div`
    width:100%;
    padding:1.5rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    font-size:1.1rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size:0.7rem;
        gap:0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
            font-size:0.8rem;
          gap:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size:0.9rem;
        gap:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size:1rem;
        gap:0.9rem;

    }

`
const StyledList = styled.ul`
    li{
        margin-bottom:0.5rem;
        margin-left:1rem;
    }

`

const FeedbackContainer = styled.div`
    margin:auto;
    width:90%;
    display:flex;
    flex-direction:column;
    gap:1rem;

`

const FeedbackItemContainer = styled.div`
    margin:auto;
    width:90%;
    display:flex;
    flex-direction:column;
    gap:0.7rem;

`
const ImgDescription = styled.img`
    width:100%;
    aspect-ratio: 1 / 1;
`
const ContentContainer = styled.div`
    padding-left:1rem;

` 
const HeaderTitle = styled.div`
    font-size:2.5rem;
    font-weight:bold;

    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size:0.9rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
            font-size:1rem;
        
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size:1.5rem;
        
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size:2rem;
        

    }


`
export function DescriptionProduct({product}){
    
    return(

        <Accordion defaultActiveKey="0"  alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Mô tả</Accordion.Header>
                        <Accordion.Body>
                            <DescriptionItem>
                            <HeaderTitle>{product?.name}</HeaderTitle>
                            <div>{product?.description}</div>
                            <div style={{margin:"auto"}}>
                                {
                                    product?.image[0]?
                                    <ImgDescription src={product.image[0]}/> :
                                    null
                                }
                            </div>
                            
                            <ContentContainer>
                               
                                {product?.features?.length>0?
                                        <>
                                            <HeaderTitle>
                                                Công dụng và ưu điểm của sản phẩm:
                                            </HeaderTitle>
                                            <StyledList>
                                            {
                                                product?.features?.map((item)=>
                                                    {
                                                        return <li>{item}</li>
                                                    }
                                                )
                                            }
                                            
                                            </StyledList>
                                        </>
                                    :
                                        null
                            
                                }


                                {product?.ingredients?.length>0?
                                        <>
                                            <HeaderTitle>
                                                Công dụng và ưu điểm của sản phẩm:
                                            </HeaderTitle>
                                            <StyledList>
                                            {
                                                product?.features?.map((item)=>
                                                    {
                                                        return <li>{item}</li>
                                                    }
                                                )
                                            }
                                            
                                            </StyledList>
                                        </>
                                    :
                                        null
                            
                                }


                                <HeaderTitle>
                                    Quyền lợi khi mua hàng tại DCAT Store:
                                </HeaderTitle>
                                <StyledList>
                                    <li> Cam kết hàng chính hãng 100% </li>
                                    <li>Hoàn tiền và đổi trả sản phẩm nếu không đúng miêu tả. Nếu phát hiện ra hàng Fake hoàn tiền gấp đôi sản phẩm</li>
                                    <li>Nếu có bất kì điều gì cần hỗ trợ với sản phẩm vui lòng liên hệ ngay với PetHouse</li>
                                    <li>Chúng tôi cam kết đặt uy tín và chất lượng sản phẩm lên hàng đầu</li>
                                </StyledList>
                           
                            </ContentContainer>
                            </DescriptionItem>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* <Accordion.Item eventKey="1">
                        <Accordion.Header>Đánh giá</Accordion.Header>
                        <Accordion.Body>
                            <FeedbackContainer>
                            <h4>Đánh giá:</h4>
                            <FeedbackItemContainer>
                                <FeedBackItem></FeedBackItem>
                                
                                <FeedBackItem></FeedBackItem>
                            </FeedbackItemContainer>
                            <h4>Nhận xét của bạn:</h4>
                                <FeedbackInput></FeedbackInput>
                            </FeedbackContainer>
                        </Accordion.Body>
                    </Accordion.Item> */}

                </Accordion>
    )



}