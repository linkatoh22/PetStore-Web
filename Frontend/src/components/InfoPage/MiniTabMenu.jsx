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