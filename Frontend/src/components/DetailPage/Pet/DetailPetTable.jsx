import { useContext,useEffect, useState } from "react";
import styled from "styled-components";
import { useAddToCart } from "../../../services/hook/DetailHook";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const DetailPetContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:1rem;
    width: 50%;
    
    @media (min-width: 0px) and (max-width: 598.99px) {
       gap:0.7rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        gap:0.8rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        gap:0.9rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        gap:1rem;

    }

`

const Table = styled.div`
  display: table;
  border-collapse: collapse;
  width: 100%;
  
  font-size:1.1rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
    font-size:0.6rem;     
  
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
    font-size:0.8rem;
        
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size:0.9rem;
       
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size:1rem;
        

    }
  
`;

const Row = styled.div`
  display: table-row;
`;

const Cell = styled.div`
  display: table-cell;
  border: 1px dashed #aaa;
  padding: 0.5rem;
  vertical-align: top;
  width: 50%;

  @media (min-width: 0px) and (max-width: 598.99px) {
      padding: 0.2rem; 
  
  }

  @media (min-width: 599px) and (max-width: 799.99px) {
    padding: 0.4rem;
        
  }

  


`;


const DetailNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
       gap: 0.8rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        gap: 0.9rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
       gap: 1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        gap: 1.1rem;

    }
  
`;

const DetailNameId = styled.div`
  font-size: 1.2rem;
  color: gray;

  @media (min-width: 0px) and (max-width: 598.99px) {
       font-size: 0.8rem;
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.9rem;
  }
  @media (min-width: 800px) and (max-width: 1199.98px) {
       font-size: 1rem;
  }
  @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1.1rem;

  }
`;

const DetailName = styled.div`
  font-size: 2rem;
  font-weight: bold;

  @media (min-width: 0px) and (max-width: 598.99px) {
       font-size: 0.8rem;
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 1rem;
  }
  @media (min-width: 800px) and (max-width: 1199.98px) {
       font-size: 1.2rem;
  }
  @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1.4rem;

  }
`;

const DetailPrice = styled.div`
  color: #002a48;
  font-size: 1.6rem;
  font-weight: bold;

  @media (min-width: 0px) and (max-width: 598.99px) {
       font-size: 0.8rem;
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 1rem;
  }
  @media (min-width: 800px) and (max-width: 1199.98px) {
       font-size: 1.1rem;
  }
  @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1.3rem;

  }

`;


const QuantityContainer = styled.div`

    display:flex;
    flex-direction:row;
    
    align-items:center;
    gap:1rem;
    font-size:1.2rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
      gap:0.5rem; 
      font-size: 0.7rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          gap0.7rem;
          font-size: 0.9rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        gap:0.9rem;
          font-size: 1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
          gap:1rem;
          font-size: 1.1rem;

    }
    
`

const QuantityBtn = styled.button`
    
    padding:0.2rem;
    padding-inline:0.6rem;
    background-color:white;
    &:focus{
        outline:none;
    }
   

    @media (min-width: 0px) and (max-width: 598.99px) {
          padding:0.1rem;
        
          padding-inline:0.1rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          padding:0.2rem;
          padding-inline:0.4rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding:0.2rem;
        padding-inline:0.5rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding:0.2rem;
        padding-inline:0.5rem;

    }
    

`
const QuantityInput = styled.input`
    width:25%;
    text-align:center;
    padding:0.2rem;
    border:1px solid var(--grey-600)
    &:focus{
        outline:none;
    }

    @media (min-width: 0px) and (max-width: 598.99px) {
          padding:0.1rem;
          
          padding-inline:0.1rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          padding:0.2rem;
          
          padding-inline:0.4rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding:0.2rem;
        padding-inline:0.5rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding:0.2rem;
        padding-inline:0.5rem;

    }
    
`


const DetailBtnGroup = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.1rem;
  gap: 0.5rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
      font-size:0.6rem;     
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
    font-size:0.8rem;
        
  }
  @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size:0.9rem;
       
  }
  @media (min-width: 1200px) and (max-width: 1500px) {
        font-size:1rem;
  }
  
`;

const BuyBtn = styled.button`
  background-color: #002a48;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  padding: 1rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
      padding:0.4rem;     
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
    padding:0.7rem;
        
  }
  @media (min-width: 800px) and (max-width: 1199.98px) {
        padding:0.9rem;
       
  }
  @media (min-width: 1200px) and (max-width: 1500px) {
        padding:1rem;
  }

  
`;

const CartBtn = styled.button`
  background-color: transparent;
  color: #002a48;
  font-weight: bold;
  border: solid 1px #002a48;
  border-radius: 15px;
  padding: 1rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
      padding:0.4rem;     
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
    padding:0.8rem;
        
  }
  @media (min-width: 800px) and (max-width: 1199.98px) {
        padding:0.9rem;
       
  }
  @media (min-width: 1200px) and (max-width: 1500px) {
        padding:1rem;
  }
`;
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
        if(accessToken){
           
            addToCart({
              itemType:"Pet",
              item: pet._id,
              quantity:cartQuantity
            },
            {
              onSuccess:(data)=>{
                toast.success("Thêm vào giỏ hàng thành công!");
              },
              onError:(error)=>{
                const message =  error.response?.data?.message || error.message;
                toast.error("Lỗi thêm vào giỏ hàng: ",message)
              }
            }
          )
        }
        else{
          navigate("/dang-nhap");
        }
        
     }

     const BuyNow =()=>{

          var PetItem = {
              item : pet?._id,
              itemType : "Pet",
              price : pet?.price,
              productItem : pet,
              quantity : cartQuantity,
              status : pet?.status


          };
          var cartItems = [];
          cartItems.push(PetItem)

          
          localStorage.setItem("cartItems", JSON.stringify(cartItems))
          navigate("/checkout")
          
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
                    

                    <BuyBtn onClick={()=>BuyNow()}>Mua ngay</BuyBtn>
                    <CartBtn onClick={()=>HandleAddToCart()}>Bỏ vào giỏ hàng</CartBtn>
            </DetailBtnGroup>

            

        </DetailPetContainer>
           
        
    )

}
