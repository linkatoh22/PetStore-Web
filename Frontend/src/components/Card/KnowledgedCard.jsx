
import petImage from '../../assets/pic-knowledge.png'
import styled from 'styled-components';

const CardContainerKnowledge = styled.div`
    flex-direction: column;
    background-color: #fdfdfd;
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    vertical-align: top;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
`

const KnowledgeImg = styled.img`
    width: 100%;
    object-fit: cover;
    border-radius: 5px;

`

const InfoContainerKnowledge = styled.div`

    margin-left: 3px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 3px;
`

const KnowledgeBubble = styled.div`
    width: 100px;
    font-weight: bold;
    text-align: center;
    padding: 8px;
    font-size: 13px;
    border-radius: 15px;
    color:white;
    background-color: #00A7E7;

`
const KnowledgeName = styled.div`
    color: #00171F;
    font-weight: bold;
    font-size: 17px;
`

const KnowledgeInfo = styled.div`
    color: #667479;
    font-size: 15px;
`


function KnowledgeCard(){
    return(
        <>
            <CardContainerKnowledge>
                <KnowledgeImg src={petImage} ></KnowledgeImg>
                
                <InfoContainerKnowledge>

                    <KnowledgeBubble>Pet Knowledge </KnowledgeBubble>
                    <KnowledgeName>
                        What is a Pomeranian? How to Identify Pomeranian Dogs
                    </KnowledgeName>

                    <KnowledgeInfo>
                    The Pomeranian, also known as the Pomeranian (Pom dog), is always in the top of the cutest pets. Not only that, the small, lovely, smart, friendly, and skillful circus dog breed.
                    </KnowledgeInfo>

                </InfoContainerKnowledge>
            </CardContainerKnowledge>
        </>
    )
    
}

export default KnowledgeCard;