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
    width:600px;
    height:600px;
`
const ContentContainer = styled.div`
    padding-left:1rem;

` 

export function DescriptionProduct({product}){
    
    return(

        <Accordion defaultActiveKey="0"  alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Mô tả</Accordion.Header>
                        <Accordion.Body>
                            <DescriptionItem>
                            <h1>{product?.name}</h1>
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
                                            <h3>
                                                Công dụng và ưu điểm của sản phẩm:
                                            </h3>
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
                                            <h3>
                                                Công dụng và ưu điểm của sản phẩm:
                                            </h3>
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


                                <h3>
                                    Quyền lợi khi mua hàng tại DCAT Store:
                                </h3>
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

                    <Accordion.Item eventKey="1">
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
                    </Accordion.Item>

                </Accordion>
    )



}