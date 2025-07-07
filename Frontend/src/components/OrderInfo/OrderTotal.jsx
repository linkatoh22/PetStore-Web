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
  font-size: 1.2rem;
  padding: 1.3rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.7rem;
        padding: 0.8rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.8rem;
        padding: 0.9rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.9rem;
        padding: 1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1rem;
        padding: 1.1rem;

    }

`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, .09);

  
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


export default function OrderTotal({order}){
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
              {FormattedPrice(order.originalPrice)}
            </Value>

          </Row>


          <Row >
            <Label>Giảm giá phí vận chuyển</Label>
            <Value
            >
            { order.shippingFee ==0? "-":null}  { order.shippingFee ==0?FormattedPrice(30000) :FormattedPrice(0)}
            </Value>
          </Row>


          <Row >
            <Label>Phí vận chuyển</Label>
            <Value
            >
            {FormattedPrice(0)}
            </Value>
          </Row>

        

          <Row style={{fontWeight:"bold"}} >
            <Label>Thành tiền</Label>
            <Value style={{fontWeight:"bold",color:"red"}}
            >
            {FormattedPrice(order.totalPrice)}
            </Value>
          </Row>

        
      
    </TableContainer>
    )

}