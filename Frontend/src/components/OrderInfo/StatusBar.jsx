import styled from "styled-components"
import { LuNewspaper } from "react-icons/lu";
import { FaCheck,FaTruck } from "react-icons/fa";
import { LuShare } from "react-icons/lu";
import "bootstrap/dist/css/bootstrap.min.css";

const StatusTitle= styled.div`
    font-weight:bold;
    font-size:1.2rem;
    margin-left: auto;
    padding:1rem;


`
const LineDivider = styled.div`
    width:100%;
    
    border-top:1px dotted var(--grey-400);
    

`
const StatusBarContainer = styled.div`
    padding:1rem;
    display:flex;
    flex-direction:column;
    
    align-items:center;
`
const StatusBarSubcontainer = styled.div`

    display:flex;
    flex-direction:row;
    align-items:center;
    gap:200px;
    

`

const StatusContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
`
const Circle = styled.div`
    
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#198754" : "#adb5bd")};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  
  font-size: 20px;
    z-index:2;
  .status-icon{
    font-size:2rem;
  }
`;

const Line = styled.div`
    position:absolute;
    top:25%;
    left:70%;
    z-index:0;


    width:280px;
  height: 6px;
  background-color: ${(props) => (props.active ? "#198754" : "#dee2e6")};
  
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 13px;
  margin-top: 8px;
`;

const Time = styled.div`
  font-size: 12px;
  color: #6c757d;
`;

export default function StatusBar(){
    return(
        <>
            <StatusTitle>
                Đơn hàng đã thanh toán
            </StatusTitle>
            <LineDivider></LineDivider>

        <StatusBarContainer>
            <StatusBarSubcontainer>
                <StatusContainer>
                        <Circle>
                            <LuNewspaper className="status-icon" />
                            
                        </Circle>
                        <Label>Đơn Hàng Đã Đặt</Label>
                        <Time>23:14 30-05-2025</Time>
                        <Line></Line>
                        
                </StatusContainer>
                    
                <StatusContainer>
                        <Circle>
                            <FaCheck className="status-icon" />
                            
                        </Circle>
                        <Label>Đơn Hàng Đã Đặt</Label>
                        <Time>23:14 30-05-2025</Time>
                        <Line></Line>
                        
                </StatusContainer>


                <StatusContainer>
                        <Circle>
                            <FaTruck className="status-icon" />
                            
                        </Circle>
                        <Label>Đơn Hàng Đã Đặt</Label>
                        <Time>23:14 30-05-2025</Time>
                        <Line></Line>
                        
                </StatusContainer>
                    
                <StatusContainer>
                        <Circle>
                            <FaCheck className="status-icon" />
                            
                        </Circle>
                        <Label>Đơn Hàng Đã Đặt</Label>
                        <Time>23:14 30-05-2025</Time>
                        
                        
                </StatusContainer>
                

            </StatusBarSubcontainer>
        </StatusBarContainer    >

        
        </>
    )
}
