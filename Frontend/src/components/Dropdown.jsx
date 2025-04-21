import styled from "styled-components";
import {useNavigate} from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import { DropdownProduct } from "./DropdownProduct";
const Dog = ["Beagle","Boston Terrier","Corgi","Poodle","Husky","Chihuahua","Pug","Golden Retriever","Labrador","Phốc Sóc","Samoyed","Shiba Inu"];

const Cat =["Anh Lông Dài","Anh Lông Ngắn","Ba Tư","Himalaya","Munchkin","Ragdoll","Scottish Fold"];



const DropdownContainer = styled.div`
    padding:1rem;
    font-size:1.1rem;
    width:650px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background-color: rgb(3, 74, 126);
    color:white;
    position: absolute;
    column-gap: 0.5rem ;
    row-gap:1.5rem;
    top:100%;
    left:0%;
    z-index:1000;
    
`
const DropdownBtn = styled.div`
    display:flex;
    justify-content:center;
    
    align-items:center;
    text-align:center;
    border-radius:5px;
    color:white;
    cursor: pointer;
    &:hover{
        background-color:green;
    }
    

`


export function Dropdown({menuType,setHover}){
    
    const navigate  = useNavigate();

    const handleNavigate = (type,breed)=>{
        navigate(`/category/${type}/${breed}`)
        
    }


    return(
        <>
            { (menuType == 1 || menuType==2)?
            
            <>
                <DropdownContainer 
                onMouseOver={()=>setHover(true)} 
                onMouseLeave={()=>setHover(false)}
                >

                    {
                        (menuType==1)?
                            <>
                                
                                {
                                    Dog.map((item,index)=>{
                                            return (<DropdownBtn 
                                            onClick = {()=>handleNavigate("cho-canh",item)}
                                            key={index}>
                                                    Chó {item}
                                                </DropdownBtn>

                                            )})
                                }
                            </>
                        
                        :
                            <>
                            {
                                Cat.map((item,index)=>{
                                        return (<DropdownBtn 
                                            onClick = {()=>handleNavigate("meo-canh",item)}
                                        key={index}>
                                                Mèo {item}
                                            </DropdownBtn>

                                        )})
                            }
                            </>
                    }    
                        
                </DropdownContainer>
                
            
            
            </>
            : 
            <DropdownProduct></DropdownProduct>
            }
         </>                  

    )



}