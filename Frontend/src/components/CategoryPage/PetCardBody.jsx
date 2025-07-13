import { useEffect } from "react";
import PetsCard from "../Card/PetsCard";
import styled from "styled-components";
import { Pagination } from "react-bootstrap"; 
import Spinner from 'react-bootstrap/Spinner';

const PcContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (min-width: 0px) and (max-width: 598.99px) {
        gap: 0.4rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          gap: 0.4rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        gap: 0.6rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        gap: 0.8rem;
    }
`;

const PcTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PcTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap:1rem;
  align-items: baseline;

  @media (min-width: 0px) and (max-width: 598.99px) {
        gap: 0.4rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          gap: 0.4rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        gap: 0.6rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        gap: 0.8rem;
    }
`;

const PcTitleName = styled.div`
  font-weight: bold;
  font-size: 2rem;
  color: #003459;

  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          font-size: 1.2rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 1.4rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1.6rem;
    }
`;

const PcTitleQuantity = styled.span`
  color: var(--grey-600);
  font-size: 1.2rem;
  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          font-size: 0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.9rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1rem;
    }
`;

const PcSort = styled.select`
  font-size: 1.2rem;
  padding: 0.7rem 1rem;
  
  &:focus {
    outline: none;
  }
  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.5rem;
        padding: 0.2rem 0.3rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
          font-size: 0.7rem;
          padding: 0.3rem 0.6rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.8rem;
        padding: 0.4rem 0.7rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1rem;
        padding: 0.5rem 0.8rem;
    }
`;

const PcCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
        grid-template-columns: repeat(2,1fr);
        column-gap: 0.2rem;
        row-gap: 0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        grid-template-columns: repeat(3,1fr);
        column-gap: 0.2rem;
        row-gap: 0.6rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        grid-template-columns: repeat(3,1fr);
        column-gap: 0.3rem;
        row-gap: 0.7rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        grid-template-columns: repeat(4,1fr);
        column-gap: 0.4rem;
        row-gap: 0.8rem;
        
    }
`;
const SpinnerContainer = styled.div`
    display:flex;
    width:100%;
    align-items:center;
    justify-content:center;
    height:200px;
    font-size:1.3rem;
    .mr-2{
        width: 4rem;
         height: 4rem;

        @media (min-width: 0px) and (max-width: 598.99px) {
            width: 2rem;
            height: 2rem;
        }
        @media (min-width: 599px) and (max-width: 799.99px) {
            width: 2rem;
            height: 2rem;
        }
        @media (min-width: 800px) and (max-width: 1199.98px) {
            width: 3rem;
            height:3rem;
        }
        @media (min-width: 1200px) and (max-width: 1500px) {
            width: 3rem;
            height:3rem;
        }
    
    }
    @media (min-width: 0px) and (max-width: 598.99px) {
        height:100px;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        height:100px;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        height:200px;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        height:200px;
    }
    

`


function PetCardBody({Pet,Header,SetSort,Petlength,type,Page,SetPage,TotalPage,isLoading}){
  useEffect(()=>{
      console.log("Pet ",Pet)
      
      
    },[Pet])

    const handlePageClick = (pageNumber) => {
    if (pageNumber !== Page && pageNumber >= 1 && pageNumber <= TotalPage) {
      SetPage(pageNumber);
      window.scrollTo({ top:0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    let items = [];

    for (let number = 1; number <= TotalPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === Page}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination>
        <Pagination.Prev onClick={() => handlePageClick(Page - 1)} disabled={Page === 1} />
        {items}
        <Pagination.Next onClick={() => handlePageClick(Page + 1)} disabled={Page === TotalPage} />
      </Pagination>
    </div>
  );

  }
  
    const options =[
        {label: "Sắp xếp theo: Tất cả",value:0},
        {label: "Phổ biến nhất",value:1},
        {label: "Ít phổ biến",value:2},
        {label: "Đắt nhất",value:3},
        {label: "Rẻ nhất",value:4},
    ]
    return(
        <>
            <PcContainer className="pc-container">
                <PcTitleContainer className="pc-title-container">

                    <PcTitle className="pc-title">
                        <PcTitleName className="pc-title-name">
                                {Header}
                        </PcTitleName>

                        <PcTitleQuantity className="pc-title-quantity">
                                {Petlength} Kết quả
                        </PcTitleQuantity>
                    </PcTitle>


                    <div className="pc-title-select">
                        <PcSort className="pc-sort" onChange={(e)=>SetSort(Number(e.target.value))}>
                            {
                                options.map(

                                    option=>(
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    )
                                )
                            }
                        </PcSort>
                    </div>

                </PcTitleContainer>

                
                  {isLoading? 
                    <SpinnerContainer>
                      <Spinner animation="border" variant="info" style={{ width: "4rem", height: "4rem" }} className='mr-2' />
                    </SpinnerContainer> 
                  :
                    (  Pet.length>0?
                    (
                        <PcCardContainer className="pc-card-container">
                                {Pet.map((item)=>{
                                    return (
                                    <PetsCard 
                                    key={item._id}
                                    Item = {item} 
                                    type={type=="All"?item.type:type}>

                                    </PetsCard>
                                    )

                                  }
                                )}
                        </PcCardContainer> 
                    )
                    :
                    (<div>Không tìm thấy kết quả</div>))
                  }
                  
                 
                

                {renderPagination()}
            </PcContainer>          
        </>
    );


}

export default PetCardBody;