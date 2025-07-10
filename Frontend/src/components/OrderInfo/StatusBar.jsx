import styled from "styled-components"
import { LuNewspaper } from "react-icons/lu";
import { FaCheck,FaTruck } from "react-icons/fa";
import { LuShare } from "react-icons/lu";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo } from "react";
import { IoWarning } from "react-icons/io5";
import formatDate from "../../utils/FormatDate";
const StatusTitle= styled.div`
    font-weight:bold;
    font-size:1.2rem;
    margin-left: auto;
    padding:1rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size:0.35rem;
        padding:0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size:0.5rem;
       padding:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size:0.6rem;
        padding:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size:0.7rem;
        padding:0.9rem;

    }
    


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

    @media (min-width: 0px) and (max-width: 598.99px) {
        padding:0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       padding:0.7rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding:0.8rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding:0.9rem;
    }
`
const StatusBarSubcontainer = styled.div`

    display:flex;
    flex-direction:row;
    align-items:center;
    gap:200px;

    @media (min-width: 0px) and (max-width: 598.99px) {
         gap:50px;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        gap:90px;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
         gap:100px;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        gap:100px;
    }
    

`

const StatusContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
    width:20%;
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
  
  font-size: 2rem;
  z-index:2;

    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.7rem;
        width: 30px;
        height: 30px;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
       font-size: 1rem;
        width: 40px;
        height: 40px;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 1.3rem;
        width: 50px;
        height: 50px;
        
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1.6rem;
        width: 55px;
        height: 55px;
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

    @media (min-width: 0px) and (max-width: 598.99px) {
        width:90px;
        height: 2px;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        width:130px;
        height: 2px;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        width:170px;
        height: 4px;
        
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        width:200px;
    }
  
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
  margin-top: 0.3rem;
    text-align:center;
    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.35rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.45rem;
    }
  @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.5rem;
    }
  @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 0.7rem;
    }
`;

const Time = styled.div`
  font-size: 0.8rem;
  color: #6c757d;
  text-align:center;
  @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.35rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.45rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.6rem;
        
    }
  @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 0.7rem;
    }
`;


const CancelOrder = styled.div`
    display:flex;
    align-items:center;
    text-align:center;
    gap:0.2rem;
    font-weight:600;
    font-size:2rem;
    padding-block:3.5rem;


    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.8rem;
        padding-block:1rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 1.1rem;
        padding-block:2rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 1.3rem;
        padding-block:2.5rem;
        
    }
  @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1.6rem;
        padding-block:3rem;
    }

`

const Header = [
    {
        label: "Đang đợi xác nhận",
        icon:<LuNewspaper className="status-icon" ></LuNewspaper>
    },
    {
        label: "Xác nhận",
        icon:<FaCheck className="status-icon" ></FaCheck>
    },
    {
        label: "Đang vận chuyển",
        icon:<FaTruck className="status-icon" ></FaTruck>
    },
    {
        label: "Giao hàng thành công",
        icon:<FaCheck className="status-icon" ></FaCheck>
    },
]
export default function StatusBar({statusHistory,status}){
    const StatusInitial = useMemo(()=>{
        if(statusHistory?.length>0){
             statusHistory.map((item,index)=>{
                if(item.status==="Đang đợi xác nhận") statusHistory[index].step=0;
                if(item.status==="Xác nhận") statusHistory[index].step=1;
                if(item.status==="Đang vận chuyển") statusHistory[index].step=2;
                if(item.status==="Giao hàng thành công") statusHistory[index].step=3;
            })

            
            const reversed = [...statusHistory].reverse()
            return reversed
        }
       return []
    },[statusHistory])

    const MainStatus = useMemo(()=>{
        if(status==="Đang đợi xác nhận") return {status:status, step:0}
        if(status==="Xác nhận") return {status:status, step:1}
        if(status==="Đang vận chuyển") return {status:status, step:2}
        if(status==="Giao hàng thành công") return {status:status, step:3}

        return {status:"", step:0}
    },[status])
    
    const StatusDateFind = (step)=>{
       const foundStatus = StatusInitial.filter((item)=>item.step === step) 
        
       
       if(foundStatus[0]?.updatedAt){
            return formatDate(foundStatus[0]?.updatedAt)
       }
       return "Chưa cập nhập"
    }
    return(
        <>
            <StatusTitle>
                {status??"Chưa cập nhập"}
            </StatusTitle>
            <LineDivider></LineDivider>

        <StatusBarContainer>

            {
                status!="Đã hủy"? 
                <StatusBarSubcontainer>
            
                {Header.map((item,index)=>{
                    return <StatusContainer>

                            <Circle active={index <= MainStatus.step}>
                                {item.icon}
                                
                            </Circle>
                            <Label>{item.label}</Label>
                            
                            <Time>{StatusDateFind(index)}</Time>
                            
                            
                            {index<3&&(<Line active={index+1 <= MainStatus.step} ></Line>)}
                            
                    </StatusContainer>
                })}
               
                

            </StatusBarSubcontainer>
            :
            <CancelOrder>
                <IoWarning style={{color:"var(--error-600)"}}/> 
                <div>Đơn hàng đã hủy</div>
                

            </CancelOrder>
        
            }
            
        </StatusBarContainer    >

        
        </>
    )
}
