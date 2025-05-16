
import ImageSlider from './ImageSlider';
import Icon1SVG from '../../assets/svg/icon-1';
import Icon2SVG from '../../assets/svg/icon-2';
import FbGraySVG from '../../assets/svg/facebook/Fb-gray';
import InsGraySVG from '../../assets/svg/instagram/Ins-gray';
import TwitterGraySVG from '../../assets/svg/twitter/Twitter-gray';
import ShareIconSVG from '../../assets/svg/share-icon';
import styled from 'styled-components';
const DetailPicContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 35%;
`;

const PerkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: #fceed5;
  color: #002a48;
  font-size: 15px;
  font-weight: bold;
  padding: 10px 10px;
  border-radius: 15px;
  box-sizing: border-box;
`;

const ShareGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const ShareTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;



function DetailPic(){


    return(
        <>

            <DetailPicContainer>
                
                <ImageSlider/>


                <PerkContainer>
                    <Icon2SVG ></Icon2SVG>
                    <div>100% health guarantee for pets </div>
                    <Icon1SVG></Icon1SVG> <div>100% guarantee of pet identification</div>
                </PerkContainer>

                <ShareGroupContainer>

                    <ShareTitle>
                        <ShareIconSVG></ShareIconSVG>
                        <div>
                            Share: 
                        </div>
                    </ShareTitle>
                    
                    <FbGraySVG className='Share-btn'></FbGraySVG>
                    <InsGraySVG className='Share-btn'></InsGraySVG>
                    <TwitterGraySVG className='Share-btn'> </TwitterGraySVG>
                    
                </ShareGroupContainer>

            </DetailPicContainer>
        </>
    )
}

export default DetailPic;