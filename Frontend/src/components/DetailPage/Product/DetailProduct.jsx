import { useEffect, useState,useMemo, useContext } from "react";
import styled from "styled-components";
import { FormattedPrice } from "../../../utils/FormatPrice";
import { AuthContext } from "../../../context/AuthProvider";
import { useAddToCart } from "../../../services/hook/DetailHook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const DetailPetContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:1rem;
    width: 50%;
    padding:1.5rem;

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
const DetailNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
`;

const DetailNameId = styled.div`
  font-size: 1.1rem;
  color: gray;

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

const DetailBtnGroup = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.1rem;
  width:90%;
  justify-content:space-between;

  @media (min-width: 0px) and (max-width: 598.99px) {
        width:100%;
      font-size:0.5rem;     
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
    width:45%;
  background-color: #002a48;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  padding-block:0.9rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
      padding-block:0.3rem;    
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
    padding-block:0.6rem;
        
  }
  @media (min-width: 800px) and (max-width: 1199.98px) {
       padding-block:0.7rem;
       
  }
  @media (min-width: 1200px) and (max-width: 1500px) {
        padding-block:0.8rem;
  }
`;

const CartBtn = styled.button`
    width:45%;
  background-color: transparent;
  color: #002a48;
  font-weight: bold;
  border: solid 1px #002a48;
  border-radius: 15px;
  padding-block:0.9rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
      padding-block:0.3rem;    
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
    padding-block:0.6rem;
        
  }
  @media (min-width: 800px) and (max-width: 1199.98px) {
       padding-block:0.7rem;
       
  }
  @media (min-width: 1200px) and (max-width: 1500px) {
        padding-block:0.8rem;
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
const DescriptionInfo= styled.div`
    font-size:1.2rem;
    width:80%;
    span{
        font-weight:bold;
    }

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
`

const VariantContainer =styled.div`
    display:flex;
    flex-direction:column;
    gap:1.5rem;
    justify-content:center;

    @media (min-width: 0px) and (max-width: 598.99px) {
        gap:0.7rem;     
  
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        gap:0.9rem;
        
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        gap:1.1rem;
       
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        gap:1.3rem;
    }
`

const VariantOptionGroup = styled.div`
    
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:0.5rem
    @media (min-width: 0px) and (max-width: 598.99px) {
      
            gap:0.2rem
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          
          gap:0.3rem
    }
    
    
`

const VariantTitle = styled.div`
    width:23%;
    
    font-weight:bold;
    font-size:1.2rem;
    @media (min-width: 0px) and (max-width: 598.99px) {
      
            font-size: 0.7rem;
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
    
`

const VariantButton = styled.button`
    margin:4px;
    background-color: ${  (props)=>(props.selected?  "#007bff" : "white") };
    padding-inline:1.5rem;
    padding-block:0.5rem;
   
    color: ${(props) =>(props.selected? "white" : "#002a48")};

    cursor:pointer;
    border-radius:5px;
    transition: background-color 0.2 ease;
     font-size:1.2rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
        padding-inline:0.5rem;
        padding-block:0.2rem;
        font-size: 0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding-inline:0.7rem;
        padding-block:0.2rem;
        font-size: 0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding-inline:0.7rem;
            padding-block:0.3rem;
         font-size: 0.9rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
            padding-inline:1rem;
            padding-block:0.4rem;
            font-size: 1rem;

    }


    

`

export function DetailProduct({product}){
    const navigate = useNavigate();
    const {accessToken} = useContext(AuthContext)
    const {mutate:addToCart,isPending:isLoading} = useAddToCart(accessToken);
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
               
                addToCart({
                    itemType:"Product",
                    item:product._id,
                    variant:filteredVariants[0]._id,
                    quantity:QuantitySelection
                },
                {
                    onSuccess:(data)=>{
                        
                         toast.success("Thêm vào giỏ hàng thành công!");
                    },
                    onError:(error)=>{
                        const message =  error.response?.data?.message || error.message;
                        toast.error("Lỗi thêm vào giỏ hàng: ",message);
                    }
                }
            
            )
                
            }
            else{
               toast.warning("Vui lòng chọn phân loại trước khi thêm vào giỏ hàng.") 
            }
        }
        else{
            navigate("/dang-nhap");
        }
    }


    const BuyNow = ()=>{
        if(accessToken)
        {
            if(PriceQuantity.price &&PriceQuantity.quantity&&filteredVariants.length===1 ){
                var productVariants = product;

                productVariants.variants = product.variants.filter((item)=>{
                    return item._id === filteredVariants[0]._id
                })
                // console.log("productVariants: ",productVariants) 

                var ProductItem = {
                        itemType : "Product",
                        item : product?._id,
                        quantity : QuantitySelection,
                        variant:filteredVariants[0]._id,
                        
                        price : filteredVariants[0].price??product?.minPriceproduct?.minPrice,
                        productItem : productVariants,
                        
                        


                };
                var cartItems = [];
                cartItems.push(ProductItem)

                
                localStorage.setItem("cartItems", JSON.stringify(cartItems))
                navigate("/checkout")
            }
            else{
               toast.warning("Vui lòng chọn phân loại trước khi mua hàng.") 
            }
        }
        else{
            navigate("/dang-nhap");
        }

    }


    useEffect(() => {
        document.body.style.cursor = isLoading ? "wait" : "default";
        }, [isLoading]);


    return(
        <DetailPetContainer >  

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
                    

                    <BuyBtn onClick={()=>BuyNow()} disabled={isLoading}>Mua ngay</BuyBtn>
                    <CartBtn onClick={()=>HandleAddToCart()} disabled={isLoading}>Bỏ vào giỏ hàng</CartBtn>
            </DetailBtnGroup>

            

        </DetailPetContainer>
           
        
    )

}
