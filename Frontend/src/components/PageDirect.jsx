import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const PageDirectContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap:1rem;
    
    font-size: 1.2rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
        gap:0.1rem;    
        font-size: 0.5rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        gap:0.4rem;      
        font-size: 0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        gap:0.6rem;
        font-size: 0.7rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        gap:0.8rem;
        font-size: 1rem;
    }
        
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
function PageDirect({NavDirect,SetPage}){
    const navigate = useNavigate()
    const handleNav= (url)=>{
        SetPage(1);
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