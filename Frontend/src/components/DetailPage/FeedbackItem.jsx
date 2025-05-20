import { useEffect, useState } from "react"
import styled from "styled-components"
const FeedBackViewContainer = styled.div`
    border: 2px solid var(--main-blue);
    padding:1rem;
    width:100%;
    display:flex;
    flex-direction:column;
    gap:0.5rem;
    border-radius:5px;
`
const FeedbackItemName = styled.div`
    margin:auto;
    width:100%;
    font-size:1rem;
    font-weight:bold;
    display:flex;
    justify-content:space-between;
    
    
`
const StarRating  = styled.div`


`

const FeedbackContent = styled.div`
    font-size:1rem;
    width:100%;
     word-wrap: break-word;
`

const TruncateBtn = styled.div`
    font-size:1.1rem;
    color:var(--grey-600);
    font-weight:bold;
    cursor:pointer;
    display:inline-block;

`
export function FeedBackItem({feedback}){

    const [Expaned,SetExpanded] = useState(1);
    const text = "JFSGIGJRGUIẸGIẺGJERIGJROIGJRGJRIOGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAÂJFSGIGJRGUIẸGIẺGJERIGJROIGJRGJRIOGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAÂJFSGIGJRGUIẸGIẺGJERIGJROIGJRGJRIOGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAÂJFSGIGJRGUIẸGIẺGJERIGJROIGJRGJRIOGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAÂ"
    
    const isTruncate = text.length>300;
    var displayText = text.slice(0, 300*Expaned);

    const ContinueTruncate = displayText.length < text.length;

    var displayText = ContinueTruncate  ? displayText + '...':text ;

    
    const ContentBtn=()=>{
        if(ContinueTruncate){
            return <TruncateBtn onClick={()=>SetExpanded(Expaned+1)}>Xem thêm</TruncateBtn>
            
        }
        else if(isTruncate)
        {   
                
                return <TruncateBtn onClick={()=>SetExpanded(1)} > Xem ít</TruncateBtn>
        }
        
    }
    return(
        <FeedBackViewContainer>

            <FeedbackItemName>
                <div>
                    Khánh Linh
                </div>

                <div style={{color:"var(--grey-600)"}}>
                    22/01/2024
                </div>
            </FeedbackItemName>

            <StarRating></StarRating>

            <FeedbackContent>
                {displayText}
                {ContentBtn()}
            </FeedbackContent>

        </FeedBackViewContainer>


    )

}