// import '../../styles/components/Recommend.css'
import PetsCard from '../Card/PetsCard'
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel'
import { useEffect, useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Spinner from 'react-bootstrap/Spinner';
const RecommendContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
`;

const RecommendContext = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: #003459;

  @media (min-width: 0px) and (max-width: 598.99px) {
       font-size: 0.8rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size: 1rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 1.3rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1.5rem;
        
    }
`;

const RecommendPetcard = styled.div`
  width:100%;
`;


const CustomCarousel = styled(Carousel)`
  
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    display: none;
  }

  .carousel-control-prev,
  .carousel-control-next {
    top: 0%;
    width: 5%;
  }

  .carousel-control-prev {
    left: -2rem;
    @media (min-width: 0px) and (max-width: 598.99px) {
       left: 0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       left: -0.8rem;
    }
  }

  .carousel-control-next {
    right: -2rem;
    @media (min-width: 0px) and (max-width: 598.99px) {
       right: 0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       right: -0.8rem;
    }
  }

  .custom-arrow {
    font-size: 2.5rem;
    color: #003459;
    background: white;
    border-radius: 50%;
    padding: 0.5rem;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);

    @media (min-width: 0px) and (max-width: 598.99px) {
       font-size: 2rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size: 2rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 1.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 2rem;
        
    }
  }
`;

const CardContainer = styled.div`
    width:100%;
    padding-inline:2.2rem;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    column-gap: 1rem;
    row-gap: 1rem;
     grid-auto-rows: 1fr; 
    @media (min-width: 0px) and (max-width: 598.99px) {
        grid-template-columns: repeat(2,1fr);
        column-gap: 0.2rem;
        row-gap: 0.2rem;
        padding-inline:0.2rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        grid-template-columns: repeat(3,1fr);
        column-gap: 0.7rem;
        row-gap: 0.7rem;
        padding-inline:1.5rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        grid-template-columns: repeat(3,1fr);
        column-gap: 0.8rem;
        row-gap: 0.8rem;
        padding-inline:1.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        grid-template-columns: repeat(4,1fr);
        column-gap: 0.8rem;
        row-gap: 0.8rem;
        padding-inline:2rem;
        
    }

`


const SpinnerContainer = styled.div`
    display:flex;
    width:100%;
    align-items:center;
    justify-content:center;
    height:250px;
    
    @media (min-width: 0px) and (max-width: 598.99px) {
        height:50px;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        height:100px;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        height:150px;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        height:200px;
    }

`

function Recommmend({data,type,isLoading}){
  const[sizeItem,setSizeItem] = useState(4);

   const updateSizeItem = () => {
    const width = window.innerWidth;
    if (width <= 598.99) {
      setSizeItem(2);
    } else if (width <= 799.99) {
      setSizeItem(3);
    } else if (width <= 1199.98) {
      setSizeItem(3);
    } else {
      setSizeItem(4);
    }
  };

  useEffect(() => {
    updateSizeItem(); // gọi khi component mount
    window.addEventListener('resize', updateSizeItem); // cập nhật khi resize

    return () => window.removeEventListener('resize', updateSizeItem); // cleanup
  }, []);


  const chunkArray = (array, size) => {
      return array.reduce((acc, _, i) => {
        if (i % size === 0) acc.push(array.slice(i, i + size));
        return acc;
      }, []);
    };

    const chunkedData = useMemo(()=>{
      return chunkArray(data || [], sizeItem);
    },[data,sizeItem])
    // const chunkedData = chunkArray(data || [], 4);

    return(
        <>
            <RecommendContainer className='recommend-container'>
                

                <RecommendContext className='recommend-context'>Các sản phẩm tương tự</RecommendContext>

                {
                        isLoading?
                        <SpinnerContainer>
                          <Spinner animation="border" variant="info" style={{ width: "4rem", height: "4rem" }} className='mr-2' />
                        </SpinnerContainer>
                        :


                    <RecommendPetcard className='recommend-petcard'>
                       <CustomCarousel 
                        interval={null}
                        indicators={false}
                        prevIcon={<FaChevronLeft className="custom-arrow" />}
                        nextIcon={<FaChevronRight className="custom-arrow" />}
                          >


                              {chunkedData?.map((group, idx) => (
                                <Carousel.Item key={idx}>
                                  <CardContainer>
                                    {group.map((item, index) => (
                                      <PetsCard key={index} Item={item} type={type} />
                                    ))}
                                  </CardContainer>
                                </Carousel.Item>
                              ))}                        
                        </CustomCarousel>
                </RecommendPetcard>

                      
                }
                



            </RecommendContainer>

        </>
    )
}

export default Recommmend;