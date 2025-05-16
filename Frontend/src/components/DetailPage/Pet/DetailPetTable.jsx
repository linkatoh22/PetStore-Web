import styled from "styled-components";
const DetailPetContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:1rem;
    width: 50%;
    padding:1.5rem;
`

const Table = styled.div`
  display: table;
  border-collapse: collapse;
  width: 100%;
  max-width: 600px;
`;

const Row = styled.div`
  display: table-row;
`;

const Cell = styled.div`
  display: table-cell;
  border: 1px dashed #aaa;
  padding: 8px 12px;
  vertical-align: top;
  width: 50%;
`;


const DetailNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DetailNameId = styled.div`
  font-size: 17px;
  color: gray;
`;

const DetailName = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const DetailPrice = styled.div`
  color: #002a48;
  font-size: 25px;
  font-weight: bold;
`;

const DetailBtnGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const BuyBtn = styled.button`
  background-color: #002a48;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
`;

const CartBtn = styled.button`
  background-color: transparent;
  color: #002a48;
  font-size: 18px;
  font-weight: bold;
  border: solid 2px #002a48;
  border-radius: 25px;
  padding: 10px 20px;
`;
const QuantityContainer = styled.div`

    display:flex;
    flex-direction:row;
    
    align-items:center;
    gap:1rem;
    font-size:1.3rem
    
`

const QuantityBtn = styled.button`
    
    padding:0.2rem;
    font-size:1.4rem;
    padding-inline:0.6rem;
    background-color:white;
    &:focus{
        outline:none;
    }
    border:1px solid var(--grey-600)

`
const QuantityInput = styled.input`
    width:20%;
    padding:0.15rem;
    font-size:1.4rem;
    border:1px solid var(--grey-600)
    &:focus{
        outline:none;
    }
    
`
export function DetailPetTable({label,value}){
      const labelMap = Object.assign({}, ...label);
    const valueMap = Object.assign({}, ...value);

     const entries = Object.keys(labelMap).map((key) => ({
            key,
            text: `${labelMap[key]}: ${valueMap[key] || ""}`,
        }));
     const rows = [];
  for (let i = 0; i < entries.length; i += 2) {
    rows.push(entries.slice(i, i + 2));
  }


    return(
        <DetailPetContainer>  

            <DetailNameContainer>

                    <DetailNameId>
                        SKU #1000078
                    </DetailNameId>

                    <DetailName>
                        Shiba Inu Sepia
                    </DetailName>

                    <DetailPrice>
                        34.000.000 VND
                    </DetailPrice>

                </DetailNameContainer>

            <QuantityContainer>
                <div>Số lượng: </div>
                <div>
                    <QuantityBtn>-</QuantityBtn>
                    <QuantityInput type="number"></QuantityInput>
                    <QuantityBtn>+</QuantityBtn>
                </div>
                
            </QuantityContainer>

             <Table>
                {rows.map((row, rowIndex) => (
                    <Row key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <Cell key={cellIndex}>{cell.text}</Cell>
                    ))}
                    {row.length === 1 && <Cell />} {/* Nếu lẻ, thêm ô trống */}
                    </Row>
                ))}
            </Table>
            
            

            <DetailBtnGroup>
                    

                    <BuyBtn>Mua ngay</BuyBtn>
                    <CartBtn>Bỏ vào giỏ hàng</CartBtn>
            </DetailBtnGroup>

            

        </DetailPetContainer>
           
        
    )

}
