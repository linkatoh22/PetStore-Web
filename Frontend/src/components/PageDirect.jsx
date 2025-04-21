import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const PageDirectContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap:1rem;
    
    font-size: 1.2rem;
`

const PageDirectItem = styled.div`
    font-weight:bold;
    cursor:pointer;
    color:var(--main-blue);
    &:hover{
        color:var(--grey-800); 
    }
    &:active{
        color:var(--blue-900);
        
    }

`
const ArrowSymbol = styled.div`
    color:var(--grey-600);


`
function PageDirect({NavDirect}){
    const navigate = useNavigate()
    const handleNav= (url)=>{
        navigate(url);


    }
    return (
        <>
            <PageDirectContainer className="PageDirect-container">

                {

                    NavDirect.map((item,index)=>{

                        if(index!=NavDirect.length-1){
                            return <>

                                <PageDirectItem  
                                    onClick={()=>handleNav(item.URL)}
                                >
                                    {item.Nav}
                                </PageDirectItem>

                                <ArrowSymbol className="arrow-symbol">
                                    &gt;
                                </ArrowSymbol>
                            </>
                        }
                        else{
                            return <>

                                <PageDirectItem 
                                    onClick={()=>handleNav(item.URL)}
                                >
                                    {item.Nav}
                                </PageDirectItem>
                            </>
                        }
                    })
                }
                
            </PageDirectContainer>
        </>
    )

}
export default PageDirect;