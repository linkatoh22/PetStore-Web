import { useEffect } from 'react';
import petImage from '../../assets/pets-card.png'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fdfdfd;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    padding:0.8rem;
    gap: 0.5rem;
`

const PetImage = styled.img`
    height: 300px;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
    object-position: center;

`
const InfoContainer = styled.div`
    gap: 0.2rem;
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: left;
`

const PetName = styled.div`
    color: #00171F;
    font-weight: bold;
    font-size: 17px;
`
const PetInfo = styled.div`
    color: #667479;
    font-size: 13px;
`

const PetPrice = styled.div`
    font-size: 15px;
    color: #00171F;
    
    font-weight: bold;
`


function PetsCard({Item,type} ){
    const navigate = useNavigate();
    const handleNavItem =  (type,item)=>{
        console.log("Hereeee")
        switch(type){
            case "Pet":
                navigate (`/detail/thu-cung/${item}`);
                break;
            case "Product":
                navigate(`/detail/phu-kien/${item}`);
                break;
        }
    }
    


    const imageSrc = Item?.image?.[0] || petImage;
    const name = Item?.name || "Chưa cập nhật";
    const gender = Item?.gender || "Không xác định";
    const age = Item?.age || "Không xác định";
    // const price = Item?.price ? `${Item.price} VND` : "Chưa cập nhật";
    const brand = Item?.brand || "Chưa cập nhập";
    const price = Item?.minPrice?? Item.price;
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    
        // const formattedPrice ="Chưa cập nhập"

    return(
        <>
            <CardContainer onClick={()=>handleNavItem(type,Item?._id)}>
            <PetImage src= {imageSrc}  ></PetImage>
                {type=="Pet"?
                        <InfoContainer>
                            <PetName>
                                {name}
                            </PetName>

                            <PetInfo>
                                Giới Tính: {gender} - Tuổi: {age}
                            </PetInfo>

                            <PetPrice>
                                {formattedPrice}
                            </PetPrice>
                        </InfoContainer>
                :
                <>
                    <InfoContainer>
                            <PetName>
                                {name}
                            </PetName>

                            <PetInfo>
                                Thương hiệu: {brand} 
                                {/* - Tuổi: {Item.age ?Item.age : "02 months"} */}
                            </PetInfo>

                            <PetPrice>
                                {formattedPrice}
                            </PetPrice>
                    </InfoContainer>
                
                </>}

            </CardContainer>
        </>
    )


}

export default PetsCard;