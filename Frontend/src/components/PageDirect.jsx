// import "../../styles/components/PageDirect.css"
import styled from "styled-components";

const PageDirectContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap:10px;
    color:#667479;
    
    font-size: 18px;
    font-weight: 200px;

`

function PageDirect(){

    return (
        <>
            <PageDirectContainer className="PageDirect-container">
                <div className="PageDirect-btn">
                    Home
                </div>

                <div className="arrow-symbol">
                    &gt;
                </div>
                
                <div className="PageDirect-btn">
                    Dog
                </div>

                <div className="arrow-symbol">
                    &gt;
                </div>


                <div className="PageDirect-btn">
                    Small Dog
                </div>
            </PageDirectContainer>
        </>
    )

}
export default PageDirect;