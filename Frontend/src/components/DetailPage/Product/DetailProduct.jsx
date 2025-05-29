import { useEffect, useState } from "react";
import styled from "styled-components";
const DetailPetContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:1rem;
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

const VariantOptionGroup = styled.div`
    display:flex;
    flex-direction:column;
    gap:0.5rem
`

const VariantTitle = styled.h4`
    font-size:1.1rem;
    color: #002a48;
    margin-bottom:0.3rem;
`

const VariantButton = styled.button`
    margin:4px;
    padding:6px 12px;
    background-color: ${  (props)=>(props.selected?  "#007bff" : "#ccc") };
    color: ${(props) =>(props.selected? "white" : "black")}
    border-radius:5px;
    cursor:pointer;
    
    transition: background-color 0.2 ease;

`

export function DetailProduct({product}){
    const [selected,setSelected] = useState({
        color:null,
        size:null,
        weight:null
    })

    

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
        console.log('Filter variants: ',filteredVariants.length)
        console.log('FilteredVariantsChosen: ',filteredVariantsChosen)
    },[filteredVariants])

    const CheckSelectVariant = (key,value)=>{
        console.log(`Key: ${key} Value: ${value}`)
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
            
            if (selected.color) return true;
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

            if(selected.size) return true
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


            if(selected.weight) return true
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

    const HandleSetPrice = ()=>{

        const formattedMinPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
            }).format(product?.minPrice);

        const formattedMaxPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
            }).format(product?.maxPrice);
        if(product?.minPrice == product?.maxPrice){
            return formattedMinPrice;
        }
        else if ( product?.maxPrice > product?.minPrice){
            return `${formattedMinPrice} - ${formattedMaxPrice}`
        }
        return "Chưa cập nhập"
        
    }

    
    const renderButtons = (key, values) => (
        <VariantOptionGroup>
            <VariantTitle>{key.charAt(0).toUpperCase() + key.slice(1)}</VariantTitle>
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
                        {HandleSetPrice()}
                    </DetailPrice>

                </DetailNameContainer>
            <DescriptionInfo>
                {product?.description?? "Chưa cập nhập"}
            </DescriptionInfo>

            <VariantContainer>

                {renderButtons('color', InfoVariant.color)}
                {renderButtons('size', InfoVariant.size)}
                {renderButtons('weight', InfoVariant.weight)}

                <h4>Kết quả:</h4>
                <pre>{JSON.stringify(filteredVariants, null, 2)}</pre>
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
