import styled from "styled-components"
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import formatDate from "../../utils/FormatDate";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.2rem;
  border-left: 2px solid #dee2e6;
  @media (min-width: 0px) and (max-width: 598.99px) {
        padding-left: 1rem;
    }
  
`;

const Item = styled.div`
  position: relative;
  padding-bottom: 0.7rem;
  margin-left: 0.5rem;

   @media (min-width: 0px) and (max-width: 598.99px) {
      padding-bottom: 0.5rem;
      margin-left: 0.1rem;
    }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: -20%;
  top: 31%;
  font-size: 1.15rem;
  color: #198754;

  @media (min-width: 0px) and (max-width: 598.99px) {
  
        font-size:0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       
          font-size:0.8rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
    
        font-size:0.9rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
  
        font-size:1rem;

    }
`;

const Time = styled.div`
  font-weight: bold;
  color: #333;
  font-size: 1rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
  
        font-size:0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       
          font-size:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
    
        font-size:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
  
        font-size:0.9rem;

    }
`;

const Title = styled.div`
  color: #198754;
  font-weight: bold;
  font-size: 1rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
  
        font-size:0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       
          font-size:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
    
        font-size:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
  
        font-size:0.9rem;

    }
`;

export default function StatusHistory({statusHistory}){
    return(
        <Container>
      {statusHistory?.map((item, idx) => (
        <Item key={idx}>

          <IconWrapper >
            <FaCheckCircle />
          </IconWrapper>

          <Time>{formatDate(item.updatedAt)}</Time>
          <Title >{item.status}</Title>
        </Item>
      ))}
    </Container>
    )


}