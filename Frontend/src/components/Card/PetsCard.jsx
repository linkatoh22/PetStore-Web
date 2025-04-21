import petImage from '../../assets/pets-card.png'
import styled from 'styled-components';

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
    
    return(
        <>
            <CardContainer>
            <PetImage src= {Item.image[0] ? Item.image[0] : petImage}  ></PetImage>
                {type=="Pet"?
                        <InfoContainer>
                            <PetName>
                                {Item.name ? Item.name : "Chưa cập nhập"}
                            </PetName>

                            <PetInfo>
                                Giới Tính: {Item.gender? Item.gender : "Female"} - Tuổi: {Item.age ?Item.age : "02 months"}
                            </PetInfo>

                            <PetPrice>
                                {Item.price ? Item.price +" VND" : "Chưa cập nhập"}
                            </PetPrice>
                        </InfoContainer>
                :
                <>
                    <InfoContainer>
                            <PetName>
                                {Item.name ? Item.name : "Chưa cập nhập"}
                            </PetName>

                            <PetInfo>
                                Thương hiệu: {Item.brand? Item.brand : "Chưa cập nhập"} 
                                {/* - Tuổi: {Item.age ?Item.age : "02 months"} */}
                            </PetInfo>

                            <PetPrice>
                                {Item.minPrice ? Item.minPrice +" VND" : "Chưa cập nhập"}
                            </PetPrice>
                    </InfoContainer>
                
                </>}

            </CardContainer>
        </>
    )


}

export default PetsCard;