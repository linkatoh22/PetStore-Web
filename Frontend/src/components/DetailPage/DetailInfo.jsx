// import '../../styles/components/DetailInfo.css'
import PageDirect from '../PageDirect';
import styled from 'styled-components';
const DetailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  gap: 15px;
  width: 60%;
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



function DetailInfo(){

    return(

        <>
            <DetailInfoContainer>
                {/* <PageDirect></PageDirect> */}
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

                <DetailBtnGroup>
                    <BuyBtn>Mua ngay</BuyBtn>
                    <CartBtn>Bỏ vào giỏ hàng</CartBtn>
                </DetailBtnGroup>


                
                {/* <DetailTable>

                    <tr className='Detail-Table-Row'>
                        <DetailTableItemHeader>SKU</DetailTableItemHeader>
                        <DetailTableItem>
                            <DetailItemContent>
                            
                                : #1000078
                            </DetailItemContent>
                        </DetailTableItem>
                    </tr>

                    <tr className='Detail-Table-Row'>
                        <DetailTableItemHeader>Gender</DetailTableItemHeader>
                        <DetailTableItem>
                            <DetailItemContent>
                                : Female
                            </DetailItemContent>
                        </DetailTableItem>
                        
                    </tr>
                    
                    <tr className='Detail-Table-Row'>
                        <DetailTableItemHeader className='Detail-Table-Item-Header'>Age</DetailTableItemHeader>
                        <DetailTableItem>
                            <DetailItemContent>
            
                                : 2 Months
                                </DetailItemContent>
                        </DetailTableItem>
                        
                    </tr>

                    <tr className='Detail-Table-Row'>
                        <DetailTableItemHeader className='Detail-Table-Item-Header'>Size</DetailTableItemHeader>
                        <DetailTableItem>
                            <DetailItemContent>
                                : Small
                                </DetailItemContent>
                        </DetailTableItem>
                    </tr>

                    <tr className='Detail-Table-Row'>
                        <DetailTableItemHeader className='Detail-Table-Item-Header'>Color</DetailTableItemHeader>
                        <DetailTableItem>
                            <DetailItemContent>
                                : Apricot & Tan
                                </DetailItemContent>
                        </DetailTableItem>
                        
                    </tr>

                    <tr className='Detail-Table-Row'>
                        <DetailTableItemHeader className='Detail-Table-Item-Header'>Vaccinated</DetailTableItemHeader>
                        <DetailTableItem>
                            <DetailItemContent>
                                : Yes
                                </DetailItemContent>
                        </DetailTableItem>
                        
                    </tr>


                    <tr className='Detail-Table-Row'>
                        <DetailTableItemHeader className='Detail-Table-Item-Header'>Dewormed</DetailTableItemHeader>
                        <DetailTableItem>
                            <DetailItemContent>
                                : Yes
                                </DetailItemContent>
                        </DetailTableItem>
                        
                    </tr>


                    <tr className='Detail-Table-Row'>
                        <DetailTableItemHeader className='Detail-Table-Item-Header'>Cert</DetailTableItemHeader>
                        <DetailTableItem>
                            <DetailItemContent>
                                : Yes
                                </DetailItemContent>
                        </DetailTableItem>
                        
                    </tr>

                    <tr className='Detail-Table-Row'>
                        <DetailTableItemHeader className='Detail-Table-Item-Header'>Microchip</DetailTableItemHeader>
                        <DetailTableItem>
                            <DetailItemContent>
                                : Small
                                </DetailItemContent>
                        </DetailTableItem>
                        
                    </tr>


                    <tr className='Detail-Table-Row'>
                        <DetailTableItemHeader className='Detail-Table-Item-Header'>Location</DetailTableItemHeader>
                        <DetailTableItem>
                            <DetailItemContent>
                                : Vietnam
                                </DetailItemContent>
                        </DetailTableItem>
                        
                    </tr>


                    <tr className='Detail-Table-Row'>
                        <DetailTableItemHeader className='Detail-Table-Item-Header'>Published Date</DetailTableItemHeader>
                        <DetailTableItem>
                            <DetailItemContent>
                                : 12-Oct-2022
                                </DetailItemContent>
                        </DetailTableItem>
                        
                    </tr>

                    <tr className='Detail-Table-Row'>
                        <DetailTableItemHeader className='Detail-Table-Item-Header'>Additional Information</DetailTableItemHeader>
                        <DetailTableItem>
                            <DetailItemContent>
                            : Pure breed Shih Tzu. Good body structure. With MKA cert and Microchip. Father from champion lineage.
                            </DetailItemContent>
                        </DetailTableItem>
                        
                    </tr>


                </DetailTable> */}


                
            </DetailInfoContainer>
        </>
    )
}

export default DetailInfo;