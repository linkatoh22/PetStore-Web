import { useEffect, useState,useMemo, useContext } from "react";
import styled from "styled-components";
import { FormattedPrice } from "../../../utils/FormatPrice";
import { AuthContext } from "../../../context/AuthProvider";
import { useAddToCart } from "../../../services/hook/DetailHook";
import { useNavigate } from "react-router-dom";
const DetailPetContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:1.5rem;
    width: 50%;
    padding:1.5rem;
    
`
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
  margin-top:1rem;
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
    font-size:1.1rem
    
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
    padding-block:0.14rem;
    text-align:center;
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

const VariantOptionGroup = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:0.5rem
`

const VariantTitle = styled.h4`
    font-size:1.3rem;
    width:120px;
    margin-bottom:0.5rem;
`

const VariantButton = styled.button`
    margin:4px;
    padding:6px 12px;
    background-color: ${  (props)=>(props.selected?  "#007bff" : "white") };
    padding-inline:1.5rem;
    padding-block:0.5rem;
    
    
    font-size:1.1rem;
    color: ${(props) =>(props.selected? "white" : "black")};

    cursor:pointer;
    border-radius:5px;
    transition: background-color 0.2 ease;

`

export function DetailProduct({product}){
    const navigate = useNavigate();
    const {accessToken} = useContext(AuthContext)
    const {mutate:addToCart} = useAddToCart(accessToken);
    const [PriceQuantity,SetPriceQuantity] = useState(
        {
            price:null,
            quantity:null
        }
    );
    const [QuantitySelection,SetQuantitySelection] = useState(1);
    const [selected,setSelected] = useState({
        color:null,
        size:null,
        weight:null
    })

    const HandleQuantity = (quantity)=>{
        if(quantity>PriceQuantity.quantity)
          SetQuantitySelection(PriceQuantity.quantity)
        else if(quantity<0)
          SetQuantitySelection(0)
        else
          SetQuantitySelection(quantity)
     }
    

    const InfoVariant = {
        size :  [   ...new Set(product?.variants?.map( v=>v.size).filter(Boolean)) ], //filter(Boolean) sẽ loại bỏ các giá trị như undefined, null, "", false, 0.
        weight :[   ...new Set(product?.variants?.map(v=>v.weight).filter(Boolean))    ], 
        color : [   ...new Set(product?.variants?.map(v=>v.color).filter(Boolean))  ] 
    }

    const filteredVariants = product?.variants?.filter(variant => {
            return (!selected.color || variant.color === selected.color) &&
                    (!selected.size || variant.size === selected.size) &&
                    (!selected.weight || variant.weight === selected.weight);
            }) ?? [];

    const filteredVariantsChosen = {

        size: [ ...new Set (filteredVariants?.map(    s=>s.size).filter(Boolean))  ],
        weight: [   ...new Set(filteredVariants?.map(    w=>w.weight).filter(Boolean))],
        color: [ ...new Set(filteredVariants?.map(  c=>c.color).filter(Boolean))  ]

    }
    
    useEffect(()=>{
         if (
            filteredVariants.length === 1 &&
            (PriceQuantity.price !== filteredVariants[0].price ||
            PriceQuantity.quantity !== filteredVariants[0].stock)
        ) {
            SetPriceQuantity({
            price: filteredVariants[0].price,
            quantity: filteredVariants[0].stock
            });
        }
    },[filteredVariants])

    const CheckSelectVariant = (key,value)=>{
        if(key=="color") {
            if(selected.size){
                const variant = product?.variants?.filter( v=> v.color == value && v.size == selected.size)
                if (variant && variant[0]?.stock == 0){
                    return false;
                }
            }
            else if(selected.weight){
                const variant = product?.variants?.filter( v=> v.color == value && v.weight == selected.weight)

                if (variant && variant[0]?.stock == 0){
                    return false;
                }
            }
            
            // if (selected.color) return true;
            return filteredVariantsChosen.color.includes(value)
        };

        if(key=="size") {
            if(selected.color){
                const variant = product?.variants?.filter( v=> v.size == value && v.color == selected.color)
                if(variant && variant[0]?.stock == 0){
                    return false;
                }
            }
            else if(selected.weight){
                const variant = product?.variants?.filter( v=> v.size == value && v.weight == selected.weight)

                if (variant && variant[0]?.stock == 0){
                    return false;
                }
            }

            // if(selected.size) return true
            return filteredVariantsChosen.size.includes(value);
        }

        if (key === "weight") {
            
            if(selected.color){
                const variant = product?.variants?.filter( v=> v.weight == value && v.color == selected.color)
                if (variant && variant[0]?.stock == 0){
                    return false;
                }
            }
            else if(selected.size){
                const variant = product?.variants?.filter( v=> v.weight == value && v.size == selected.size)

                if (variant && variant[0]?.stock == 0){
                    return false;
                }
            }


            // if(selected.weight) return true
            return filteredVariantsChosen.weight.includes(value);
        }

        return false;
    }
    
    const handleSelect = (key, value) => {

        setSelected(prev => ({
        ...prev,
        [key]: prev[key] === value ? null : value 
        }));
        
    };

    const HandleSetPrice = useMemo(()=>{

       
        if(filteredVariants.length === 1)
            return FormattedPrice(filteredVariants[0].price);
        else if(product?.minPrice == product?.maxPrice)
            return FormattedPrice(product?.minPrice);
        else if ( product?.maxPrice > product?.minPrice){

             const formattedMinPrice = FormattedPrice(product?.minPrice);

             const formattedMaxPrice = FormattedPrice(product?.maxPrice);

            return `${formattedMinPrice} - ${formattedMaxPrice}`
        
        }
        return "Chưa cập nhập"
        
    },[filteredVariants])

    const TranslateKey = (key)=>{
        if(key== "color")
            return "Màu"
        else if(key == "size")
            return "Kích cỡ"
        else if (key == "weight")
            return "Cân nặng"

    }
    const renderButtons = (key, values) => (
        <VariantOptionGroup>
            <VariantTitle>{TranslateKey(key)}:</VariantTitle>
            {
                // filteredVariants.length == 0 || filteredVariants
                values.map(value => (
                     filteredVariants.length == product.variants.length ||CheckSelectVariant(key,value)?
                        (
                            <VariantButton
                                key={value}
                                onClick={() => handleSelect(key, value)}
                                selected={selected[key] === value}
                            >
                                {value}
                            </VariantButton>
                        )
                        :
                        (
                            <VariantButton
                                key={value}
                                onClick={() => handleSelect(key, value)}
                                selected={selected[key] === value}
                                disabled
                            >
                                {value}
                            </VariantButton>
                        )
                ))}
        </VariantOptionGroup>
  );

    const HandleAddToCart = ()=>{
        if(accessToken){
            if(PriceQuantity.price &&PriceQuantity.quantity&&filteredVariants.length===1 ){
                console.log("DAT HANG NE BA")
                addToCart({
                    itemType:"Product",
                    item:product._id,
                    variant:filteredVariants[0]._id,
                    quantity:QuantitySelection
                },
                {
                    onSuccess:(data)=>{
                        console.log("HERE")
                         alert("Thêm vào giỏ hàng thành công!");
                    },
                    onError:(error)=>{
                        const message =  error.response?.data?.message || error.message;
                        console.log(message);
                    }
                }
            
            )
                
            }
            else{
               alert("Vui lòng chọn phân loại") 
            }
        }
        else{
            navigate("/dang-nhap");
        }
    }

    return(
        <DetailPetContainer>  

            <DetailNameContainer>

                    <DetailNameId>
                        {product?.sku?? "Chưa cập nhập"}
                    </DetailNameId>

                    <DetailName>
                       {product?.name?? "Chưa cập nhập"}
                    </DetailName>

                    <DetailPrice>
                        {HandleSetPrice}
                    </DetailPrice>

                </DetailNameContainer>
            <DescriptionInfo>
                {product?.description?? "Chưa cập nhập"}
            </DescriptionInfo>

            <VariantContainer>

                { InfoVariant.color.length>0 ? renderButtons('color', InfoVariant.color) :null}
                { InfoVariant.size.length>0 ? renderButtons('size', InfoVariant.size):null}
                {InfoVariant.weight.length>0 ? renderButtons('weight', InfoVariant.weight):null}

                {/* <h4>Kết quả:</h4>
                <pre>{JSON.stringify(filteredVariants, null, 2)}</pre> */}
            </VariantContainer>

            <QuantityContainer>
                <VariantTitle>Số lượng: </VariantTitle>
                <div >
                    <QuantityBtn disabled={filteredVariants.length >1 } onClick={()=>HandleQuantity(QuantitySelection-1)}>-</QuantityBtn>
                    <QuantityInput 
                        type="number" 
                        disabled={filteredVariants.length >1 } 
                        value={QuantitySelection}
                        onChange={ (e)=>HandleQuantity(e.target.value) }
                    ></QuantityInput>
                    <QuantityBtn disabled={filteredVariants.length >1 } onClick={()=>HandleQuantity(QuantitySelection+1)} >+</QuantityBtn>
                </div>
                
            </QuantityContainer>

                        
            

            <DetailBtnGroup>
                    

                    <BuyBtn>Mua ngay</BuyBtn>
                    <CartBtn onClick={()=>HandleAddToCart()}>Bỏ vào giỏ hàng</CartBtn>
            </DetailBtnGroup>

            

        </DetailPetContainer>
           
        
    )

}
