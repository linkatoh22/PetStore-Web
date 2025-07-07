
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";


import cantLoad from "../../assets/loadPic.png"
import { useState,useRef } from 'react';
import styled from 'styled-components';
const ITEM_WIDTH=50;

const ImageSliderContainer = styled.div`
    
    display: flex;
    flex-direction: column;
    width:40%;
    gap: 0.8rem;

   


`;

const MainPicContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
   
    background-size: cover;
    background-position: center;    
    background-repeat: no-repeat;
    
    background-image: url(${props => props.bg});
    border-radius:20px;

    width: 100%;
    aspect-ratio: 1 / 1;

    

`;


const PrevBtn = styled.button`
  font-size: 1.7rem;
  border-radius: 50px;
  display:flex;
  padding:1.1rem;
  align-items:center;
  justify-content:center;
  color: white;
  background-color: rgba(240, 248, 255, 0.61);
  border: none;
  &:hover{
    background-color:rgba(240, 248, 255, 0.45);
  }
  &:active{
    background-color:rgba(240, 248, 255, 0.56);
  }


  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.7rem;
        padding:0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size: 0.9rem;
        padding:0.8rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 1.1rem;
        padding:0.9rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1.3rem;
        padding:1rem;
    }
`;

const PicSlider = styled.div`
    width:100%;
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
    flex-wrap: nowrap;
    overflow-x: scroll;
    scroll-behavior: smooth;
`;

const PicItem = styled.img`
   object-fit: cover;
  object-position: center;
  
 
  border-radius: 5px;
  cursor: pointer;

  width: 25%;
  aspect-ratio: 1 / 1;

`;

const myPic=[
        {pic:cantLoad},
        {pic:cantLoad},
        {pic:cantLoad},
        {pic:cantLoad}
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
                <MainPicContainer className='Main-Pic-Container' bg={PicImgMain[index] || cantLoad}>

                    {/* <MainPic className="Main-Pic" src={PicImgMain[index]}></MainPic> */}

                    <PrevBtn onClick={()=>{Prev(index)}} className='prev-btn'>
                        <FaChevronLeft></FaChevronLeft>    
                        
                    </PrevBtn> 

                    <PrevBtn onClick={()=>{Next(index)}} className='next-btn'>
                        <FaChevronRight></FaChevronRight>  

                    </PrevBtn>

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