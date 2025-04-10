// import '../../styles/components/Recommend.css'
import PetsCard from '../Card/PetsCard'
import styled from 'styled-components';
const RecommendContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RecommendContext = styled.div`
  font-weight: bold;
  font-size: 25px;
  color: #003459;
`;

const RecommendPetcard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
`;


function Recommmend(){

    return(
        <>
            <RecommendContainer className='recommend-container'>
                <RecommendContainer className='recommend-container'>
                    What's now
                </RecommendContainer>

                <RecommendContext className='recommend-context'>See more puppies</RecommendContext>

                <RecommendPetcard className='recommend-petcard'>
                        <PetsCard/>
                        <PetsCard/>
                        <PetsCard/>
                        <PetsCard/>
                </RecommendPetcard>
            </RecommendContainer>

        </>
    )
}

export default Recommmend;