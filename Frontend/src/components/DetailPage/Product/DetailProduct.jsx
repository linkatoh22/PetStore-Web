import { useState } from "react";
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
const DescriptionInfo= styled.div`
    font-size:1.2rem;
    width:80%;
    span{
        font-weight:bold;
    }
`

const VariantContainer =styled.div`
    display:flex;
    flex-direction:column;
    gap:1.5rem;
    justify-content:center;
`
const VariantItem =styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:1.5rem;
    font-size:1.1rem;
    font-weight:bold;

`
const VariantBtn = styled.button`
    cursor:pointer;
    border:  2px solid ${(props) => (props.selected? "var(--blue-400)":"var(--grey-300)")};
    border-radius:2px;
    text-align:center;
    width:10%;
    padding-block:0.5rem;

`

const WeightInfo =["200g","400g","600g"]
const SizeInfo = ["S","M","L","XL"]
const ColorInfo = ["Đỏ","Vàng","Xanh"]
export function DetailProduct({label,value}){
    
    const [Weight,SetWeight] = useState("")
    const [Size,SetSize] = useState("")
    const [Color,SetColor] = useState("")

    const HandleWeight = (item)=>{
        if(Weight==item){
            SetWeight("")
            return;
        }
        SetWeight(item)
    }

    const HandleSize = (item)=>{
        if(Size==item){
            SetSize("")
            return;
        }
        SetSize(item)
    }

    const HandleColor = (item)=>{
        if(Color==item){
            SetColor("")
            return;
        }
        SetColor(item)
    }


    return(
        <DetailPetContainer>  

            <DetailNameContainer>

                    <DetailNameId>
                        CL009
                    </DetailNameId>

                    <DetailName>
                       Áo Noel Giáng Sinh
                    </DetailName>

                    <DetailPrice>
                        34.000.000 VND
                    </DetailPrice>

                </DetailNameContainer>
            <DescriptionInfo>
                <span>Áo Noel Giáng Sinh</span> Chiếc áo đỏ rực rỡ với họa tiết giáng sinh cho mùa lễ hội thêm rộn ràng cùng boss yêu.
            </DescriptionInfo>

            <VariantContainer>
                    <VariantItem>
                        <div>Cân nặng:</div>
                        {WeightInfo.map((item)=>{
                            return <VariantBtn 
                            onClick={()=>HandleWeight(item)}
                            selected={Weight===item}
                            >
                                {item}
                            </VariantBtn>
                        })}
                    </VariantItem>

                    <VariantItem>
                        <div>Kích cỡ:</div>
                        {SizeInfo.map((item)=>{
                            return <VariantBtn
                            onClick={()=>HandleSize(item)}
                            selected={Size===item}
                            >{item}</VariantBtn>
                        })}
                    </VariantItem>

                    <VariantItem>
                        <div>Màu sắc:</div>
                        {ColorInfo.map((item)=>{
                            return <VariantBtn 
                            onClick={()=>HandleColor(item)}
                            selected={Color===item}
                            >{item}</VariantBtn>
                        })}
                    </VariantItem>


            </VariantContainer>

            <QuantityContainer>
                <div>Số lượng: </div>
                <div>
                    <QuantityBtn>-</QuantityBtn>
                    <QuantityInput type="number"></QuantityInput>
                    <QuantityBtn>+</QuantityBtn>
                </div>
                
            </QuantityContainer>

                        
            

            <DetailBtnGroup>
                    

                    <BuyBtn>Mua ngay</BuyBtn>
                    <CartBtn>Bỏ vào giỏ hàng</CartBtn>
            </DetailBtnGroup>

            

        </DetailPetContainer>
           
        
    )

}
