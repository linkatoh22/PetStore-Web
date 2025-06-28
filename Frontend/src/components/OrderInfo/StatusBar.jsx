import styled from "styled-components"
import { LuNewspaper } from "react-icons/lu";
import { FaCheck,FaTruck } from "react-icons/fa";
import { LuShare } from "react-icons/lu";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo } from "react";

import formatDate from "../../utils/FormatDate";
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
        </StatusBarContainer    >

        
        </>
    )
}
