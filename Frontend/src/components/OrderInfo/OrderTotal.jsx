import styled from "styled-components";
const summary = [
  { label: "Tổng tiền hàng", value: "₫20.315" },
  { label: "Phí vận chuyển", value: "₫30.000" },
  { label: "Giảm giá phí vận chuyển", value: "-₫30.000" },
  { label: "Voucher từ Shop", value: "-₫407" },
  { label: "Khuyến mãi thẻ tín dụng", value: "-₫10.000" },
  { label: "Thành tiền", value: "₫9.908", highlight: true },
  { label: "Phương thức Thanh toán", value: "Ví ShopeePay" },
];

const TableContainer = styled.div`
  width: 100%;
  border: 1px solid #eee;
  background: #f9f9f9;
  font-size: 14px;
  padding: 16px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px dashed #eee;
`;

const Label = styled.div`
  color: #666;
  border-right:1px dashed #eee;
`;

const Value = styled.div`
    
  color: ${(props) =>
    props.highlight
      ? "#ee4d2d"
      : props.negative
      ? "#333"
      : "#333"};
  font-weight: ${(props) => (props.highlight ? "600" : "normal")};
`;


export default function OrderTotal(){
    return(
        <TableContainer>
      {summary.map((item, index) => (
        <Row key={index}>
          <Label>{item.label}</Label>
          <Value
            highlight={item.highlight}
            negative={item.value.toString().includes("-")}
          >
            {item.value}
          </Value>
        </Row>
      ))}
    </TableContainer>
    )

}