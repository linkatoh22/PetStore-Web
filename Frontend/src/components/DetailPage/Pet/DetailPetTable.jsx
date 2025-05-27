import { useContext,useEffect, useState } from "react";
import styled from "styled-components";
import { useAddToCart } from "../../../services/hook/DetailHook";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
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
    width:25%;
    text-align:center;
    padding:0.15rem;
    font-size:1.4rem;
    border:1px solid var(--grey-600)
    &:focus{
        outline:none;
    }
    
`

const PetLabel = [
    
    { "sku": "SKU"},
    { "age": "Tháng tuổi" },
    { "gender": "Giới tính"},
    { "breed": "Giống"},
    {"species":"Loài"},
    { "color": "Màu"},
    { "status": "Tình trạng" },
    { "dewormed": "Tẩy giun" },
    { "source": "Nguồn gốc" },
    { "health": "Sức khỏe" },
    { "shipping": "Vận chuyển"},
    { "vaccinated": "Tiêm phòng"}
];

export function DetailPetTable({pet}){
    
    const {accessToken} = useContext(AuthContext);
    const {mutate:addToCart} = useAddToCart(accessToken);
    const petQuantity = pet?.quantity??0;
    const price = pet?.price;
    const navigate = useNavigate();
    const [cartQuantity,SetCartQuantity] = useState(1);
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    
    const PetValue = [
   
    {"sku":pet?.sku??"Chưa cập nhập"},
    {"age":pet?.age??"Chưa cập nhập"},
    {"gender":pet?.gender??"Chưa cập nhập"},
    {"breed":pet?.breed??"Chưa cập nhập"},
     {"species":pet?.species??"Chưa cập nhập"},
     { "color": pet?.color??"Chưa cập nhập"},
    { "status": pet?.status ??"Chưa cập nhập"},
    { "dewormed":pet?.dewormed ==true?"Đã tẩy giun":"Chưa tẩy giun" },
    { "source": pet?.source ??"Chưa cập nhập"},
    { "health": pet?.health ??"Chưa cập nhập"},
    { "shipping": pet?.shipping??"Chưa cập nhập"},
    { "vaccinated": pet?.vaccinated ==true? "Đã tiêm phòng":"Chưa tiêm phòng"}


  ]

    const labelMap = Object.assign({}, ...PetLabel);
    const valueMap = Object.assign({}, ...PetValue);
    const rows = [];

    const entries = Object.keys(labelMap).map((key) => ({
            key,
            text: `${labelMap[key]}: ${valueMap[key] || ""}`,
        }));

    for (let i = 0; i < entries.length; i += 2) {
        rows.push(entries.slice(i, i + 2));
      }

     const HandleQuantity = (quantity)=>{
        if(quantity>petQuantity)
          SetCartQuantity(petQuantity)
        else if(quantity<0)
          SetCartQuantity(0)
        else
          SetCartQuantity(quantity)
     }

     const HandleAddToCart = () => { 
        console.log("Thêm vào giỏ hàng với số lượng: " + cartQuantity);
        if(accessToken){
           
            addToCart({
              itemType:"Pet",
              item: pet._id,
              quantity:cartQuantity
            },
            {
              onSuccess:(data)=>{
                alert("Thêm vào giỏ hàng thành công!");
              },
              onError:(error)=>{
                const message =  error.response?.data?.message || error.message;
              }
            }
          )
        }
        else{
          navigate("/dang-nhap");
        }
        
     }
    return(
        <DetailPetContainer>  

            <DetailNameContainer>

                    <DetailNameId>
                        {pet?.sku}
                    </DetailNameId>

                    <DetailName>
                        {pet?.name}
                    </DetailName>

                    <DetailPrice>
                       {formattedPrice}
                    </DetailPrice>

                </DetailNameContainer>

            <QuantityContainer>
                <div>Số lượng: </div>
                <div>

                    <QuantityBtn 
                      onClick={()=>HandleQuantity(cartQuantity-1)}
                      >-</QuantityBtn>

                    <QuantityInput 
                    onChange={(e)=>HandleQuantity(e.target.value)}
                    value={cartQuantity}
                    type="number" 
                    min="1" 
                    ></QuantityInput>

                    <QuantityBtn 
                      onClick={()=>HandleQuantity(cartQuantity+1)}
                      >+</QuantityBtn>
                      
                </div>
                
            </QuantityContainer>

             <Table>
                {rows.map((row, rowIndex) => (
                    <Row key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <Cell key={cellIndex}>{cell.text}</Cell>
                    ))}
                    {row.length === 1 && <Cell />}
                    </Row>
                ))}
            </Table>
            
            

            <DetailBtnGroup>
                    

                    <BuyBtn>Mua ngay</BuyBtn>
                    <CartBtn onClick={()=>HandleAddToCart()}>Bỏ vào giỏ hàng</CartBtn>
            </DetailBtnGroup>

            

        </DetailPetContainer>
           
        
    )

}
