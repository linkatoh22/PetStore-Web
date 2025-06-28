import styled from "styled-components";
import { FormattedPrice } from "../../utils/FormatPrice";
const summary = [
  { label: "Tổng tiền hàng", value: "₫20.315" },
  { label: "Phí vận chuyển", value: "₫30.000" },
  { label: "Giảm giá phí vận chuyển", value: "-₫30.000" },
  { label: "Thành tiền", value: "₫9.908"},
  { label: "Phương thức Thanh toán", value: "Ví ShopeePay" },
];

const TableContainer = styled.div`
  width: 100%;
  
  
  font-size: 1rem;
  padding: 16px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid rgba(0, 0, 0, .09);;
`;

const Label = styled.div`
 
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


export default function TotalPrice({totalPrice,shippingFee}){
    return(
        <TableContainer>
          
          <Row >
            <Label>Phương thức Thanh toán</Label>
            <Value
            >
              Ship COD
            </Value>
          </Row>

          <Row >
            <Label>Tổng tiền hàng</Label>

            <Value>
              {FormattedPrice(totalPrice)}
            </Value>

          </Row>


          <Row >
            <Label>Phí vận chuyển</Label>
            <Value
            >
            {FormattedPrice(shippingFee)}
            </Value>
          </Row>

        

          <Row style={{fontWeight:"bold",borderBottom:"none"}} >
            <Label>Thành tiền</Label>
            <Value style={{fontWeight:"bold",color:"red"}}
            >
            {FormattedPrice(totalPrice+shippingFee)}
            </Value>
          </Row>

        
      
    </TableContainer>
    )

}