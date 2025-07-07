import styled from "styled-components"
import { FaRegUser } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
const MinitabMenuContainer = styled.div`
    
    width:20%;
    display:flex;
    flex-direction:column;
    gap:1rem;
    padding:1rem;
    background-color: #f5f5f5;

    @media (min-width: 0px) and (max-width: 598.99px) {
        padding:0.5rem;
        gap:0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       padding:0.7rem;
          gap:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding:0.8rem;
        gap:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding:0.9rem;
        gap:0.9rem;

    }
    
`

const MinitabButton  = styled.div`
    font-weight:bold;
    font-size:1.5rem;
    &:hover{
        color:var(--main-blue)
    }
    &:active{
        color:var(--main-blue)
    }


    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size:0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size:0.6rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size:1.2rem;

    }
`
function MinitabMenu(){
    return(
        <MinitabMenuContainer>
           

            <MinitabButton>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                    <CgNotes></CgNotes>Đơn mua
                </div>
                
            </MinitabButton>

        </MinitabMenuContainer>
    )
}

export default MinitabMenu