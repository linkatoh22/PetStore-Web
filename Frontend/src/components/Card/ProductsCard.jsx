
import petImage from '../../assets/pets-card.png'
import PresentSVG from '../../assets/svg/present';


import styled from 'styled-components';

const CardContainer = styled.div`
  flex-direction: column;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  vertical-align: top;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
`;

const ProductImg = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const InfoContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-left: 5px;
`;

const ProductName = styled.p`
  color: #00171f;
  font-weight: bold;
  font-size: 17px;
`;

const ProductInfo = styled.p`
  color: #667479;
  font-size: 13px;
`;

const ProductPrice = styled.p`
  font-size: 15px;
  color: #00171f;
  font-weight: bold;
`;

const GiftProducts = styled.div`
  gap: 10px;
  margin-top: 5px;
  background-color: #fceed5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  color: #002a48;
  font-weight: bold;
  padding: 10px;
`;


function ProductsCard(){
    return(
        <>
            <CardContainer>
                <ProductImg src={petImage} ></ProductImg>
                
                <InfoContainer>
                    <ProductName>
                        MO231-Pomerian White
                    </ProductName>

                    <ProductInfo>
                        Gene: Male - Age: 02 months
                    </ProductInfo>

                    <ProductPrice>
                        6.900.000 VND
                    </ProductPrice>
                </InfoContainer>

                <GiftProducts>
                    <PresentSVG/>Free Toys & Free Shaker

                </GiftProducts>
            </CardContainer>
        </>
    )


}

export default ProductsCard;