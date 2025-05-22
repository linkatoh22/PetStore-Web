// import '../../styles/components/ImageSlider.css'
import detail1 from '../../assets/pic/detail-product/detail1.png';
import detail2 from '../../assets/pic/detail-product/detail2.png';
import detail3 from '../../assets/pic/detail-product/detail3.png';
import detail4 from '../../assets/pic/detail-product/detail4.png';
import detail5 from '../../assets/pic/detail-product/detail5.png';
import detail6 from '../../assets/pic/detail-product/detail6.png';
import { useState,useRef } from 'react';
import styled from 'styled-components';
const ITEM_WIDTH=50;
const ImageSliderContainer = styled.div`
    padding:1.5rem;
  display: flex;
  flex-direction: column;
  width:40%;
  gap: 10px;
`;

const MainPicContainer = styled.div`
  position: relative;
`;

const MainPic = styled.img`
  width: 100%;
  border-radius: 50px;
  object-fit: cover;
  object-position: center;
  height:500px;
`;

const PrevBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  font-size: 30px;
  border-radius: 50px;
  padding: 10px 15px;
  color: white;
  background-color: rgba(240, 248, 255, 0.61);
  border: none;
  font-weight: bold;
`;

const NextBtn = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  font-size: 30px;
  border-radius: 50px;
  padding: 10px 15px;
  color: white;
  background-color: rgba(240, 248, 255, 0.61);
  border: none;
  font-weight: bold;
`;

const PicSlider = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: nowrap;
  overflow-x: scroll;
  scroll-behavior: smooth;
`;

const PicItem = styled.img`
  width: 15%;
  border-radius: 15px;
  cursor: pointer;
`;

const myPic=[
        {pic:detail1},
        {pic:detail2},
        {pic:detail3},
        {pic:detail4},
        {pic:detail5},
        {pic:detail6},
        {pic:detail6},
    ]


function ImageSlider({PicImg}){
    const PicImgMain = PicImg? PicImg:myPic
    var [index,useIndex]=useState(0);
    const ContainerRef = useRef();
    const [ScrollPosition,setScrollPosition] = useState(0);
    

    const handleScroll = (scrollAmount) =>{
        const newScrollPosition = ScrollPosition +scrollAmount;

        setScrollPosition(newScrollPosition);

        ContainerRef.current.scrollLeft = newScrollPosition;
    }
    const Next =(val)=>{
        
        let temp= val+1
        if(temp<PicImgMain.length)
            useIndex(index+=1);
        else
            useIndex(0);

        handleScroll(ITEM_WIDTH);
        
    }

    const Prev =(val)=>{
        console.log("HERRE");
        if(val>0)
            useIndex(val-=1);
        else
            useIndex(PicImgMain.length-1);
        handleScroll(-ITEM_WIDTH);
        
    }
    const ClickImg =(index)=>{
        useIndex(index);
    }

    


    return(
        <>

            <ImageSliderContainer className="Image-Silder-Container">
                <MainPicContainer className='Main-Pic-Container'>

                    <MainPic className="Main-Pic" src={PicImgMain[index]}></MainPic>

                    <PrevBtn onClick={()=>{Prev(index)}} className='prev-btn'>{"<"}</PrevBtn> 

                    <NextBtn onClick={()=>{Next(index)}} className='next-btn'>{">"}</NextBtn>

                </MainPicContainer>

                

                             
                

                <PicSlider ref={ContainerRef} className="Pic-Slider">
                    
                        {PicImgMain.map((pic,index)=>{
                            return <PicItem key={index} src={pic} className="Pic-Item" onClick={()=>{ClickImg(index)}}/> 
                        })}
                        

                        
                </PicSlider>

            </ImageSliderContainer>
            
        </>
    )
}

export default ImageSlider;