import { useEffect } from "react";
import PetsCard from "../Card/PetsCard";
import styled from "styled-components";
import { Pagination } from "react-bootstrap"; 
import Spinner from 'react-bootstrap/Spinner';

const PcContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
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
`;

const PcTitleName = styled.h2`
  font-weight: bold;
  font-size: 28px;
  color: #003459;
`;

const PcTitleQuantity = styled.span`
  color: var(--grey-600);
  font-size: 20px;
`;

const PcSort = styled.select`
  font-size: 18px;
  padding: 10px 15px;
  
  &:focus {
    outline: none;
  }
`;

const PcCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;
const SpinnerContainer = styled.div`
    display:flex;
    width:100%;
    align-items:center;
    justify-content:center;
    height:200px;
    font-size:1.3rem;

`


function PetCardBody({Pet,Header,SetSort,Petlength,type,Page,SetPage,TotalPage,isLoading}){
  useEffect(()=>{
      console.log("TotalPage: ",TotalPage)
      console.log("Page: ",Page)
      
    },[TotalPage,Page])

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