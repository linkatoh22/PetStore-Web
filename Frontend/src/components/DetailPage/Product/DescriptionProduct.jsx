import styled from "styled-components";
import Accordion from 'react-bootstrap/Accordion';
import { FeedBackItem } from "../FeedbackItem";
import { FeedbackInput } from "../FeedbackInput";
const DescriptionItem = styled.div`
    width:100%;
    padding:1.5rem;
    display:flex;
    flex-direction:column;
    gap:1rem;

`
const StyledList = styled.ol`
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



export function DescriptionProduct(){
    return(

        <Accordion defaultActiveKey="0"  alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Mô tả</Accordion.Header>
                        <Accordion.Body>
                            <DescriptionItem>
                            <h1>Quyền lợi có được khi mua Thú cưng tại DCAT Store:</h1>

                            <StyledList>
                                <li>Bảo hành thuần chủng trọn đời.</li>
                                <li>
                                Bảo hành bệnh truyền nhiễm nguy hiểm ở chó là Care và Parvo 7 ngày đầu về nhà mới. Ngoài ra, quý khách có thể mua thêm gói bảo hiểm sức khỏe 1 năm nếu có nhu cầu. (Thú cưng là động vật sống, nhạy cảm với môi trường sống, thức ăn... bởi vậy hãy chăm sóc theo hướng dẫn của PetHouse hướng dẫn bạn nhé)
                                </li>
                                <li>Miễn phí vận chuyển toàn quốc (đối với tàu hỏa và xe khách, taxi) – hỗ trợ 50-80% chi phí vận chuyển máy bay.</li>
                                <li>
                                Tặng kèm phụ kiện cho thú cưng gồm: Dây dắt cún, Vòng cổ, Bát ăn, Bình nước thông minh, Đồ chơi, Lược chải cho bé, Túi vận chuyển cho thú cưng nhỏ.
                                </li>
                                <li>
                                Giấy tờ đi kèm: Sổ theo dõi sức khỏe (sổ tiêm phòng vacxin), hợp đồng mua bán, hướng dẫn chăm sóc, giấy chứng nhận nguồn gốc của trại cung cấp, thiệp cảm ơn.
                                </li>
                                <li>Giảm giá 10% cho các lần mua thú cưng tiếp theo.</li>
                                <li>
                                Giảm 20% cho các dịch vụ Spa cắt tỉa trọn đời, giảm 10% dịch vụ trông giữ cún tại cửa hàng. Giảm 5% mua phụ kiện trọn đời.
                                </li>
                                <li>
                                Hỗ trợ bảo hiểm sức khỏe 1.000.000 VNĐ (trong trường hợp cún bị ốm và trong thời gian bảo hành theo điều khoản trong hợp đồng mua bán).
                                </li>
                                <li>
                                Tặng quà tặng trị giá 500.000 VNĐ khi giới thiệu bạn bè mua thú cưng tại Pet House. (Có thể quy đổi thành tiền mặt)
                                </li>
                                <li>Nói không với chó tàu bệnh, chó thải loại.</li>
                                <li>Đồng hành cùng khách chăm sóc cún trọn đời.</li>
                                <li>Hỗ trợ thu mua thú cưng khi sinh sản ra đời con với giá tốt nhất.</li>
                            </StyledList>
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