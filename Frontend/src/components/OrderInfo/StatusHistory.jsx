import styled from "styled-components"
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  border-left: 2px solid #dee2e6;
  margin-left: 20px;
`;

const Item = styled.div`
  position: relative;
  padding-bottom: 20px;
  margin-left: 10px;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: -32px;
  top: 4px;
  font-size: 16px;
  color: #198754;
`;

const Time = styled.div`
  font-weight: bold;
  color: #333;
  font-size: 14px;
`;

const Title = styled.div`
  color: #198754;
  font-weight: bold;
  margin: 2px 0;
`;

const Description = styled.div`
  white-space: pre-line;
  color: #555;
  font-size: 13px;
`;

const historyStatus = [
  {
    time: "12:09 03-06-2025",
    title: "Đã giao",
    description: "Giao hàng thành công\nNgười nhận hàng: Tô Khánh Linhaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    status: "done", // trạng thái hiện tại hoặc hoàn tất
  },
  {
    time: "08:37 03-06-2025",
    title: "Đang vận chuyển",
    description: "Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại",
    status: "in_progress",
  },
  {
    time: "23:14 30-05-2025",
    title: "Đặt hàng thành công",
    description: "Đơn hàng đã được đặt",
    status: "done",
  },
  // ...
];
export default function StatusHistory(){
    return(
        <Container>
      {historyStatus.map((item, idx) => (
        <Item key={idx}>
          <IconWrapper status={item.status}>
            <FaCheckCircle />
          </IconWrapper>
          <Time>{item.time}</Time>
          <Title status={item.status}>{item.title}</Title>
          <Description>{item.description}</Description>
        </Item>
      ))}
    </Container>
    )


}