

import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { useGetPhuongXa, useGetQuanHuyen, useGetTinhThanh } from "../../services/hook/CheckoutHook";
import { useEffect, useState } from "react";

const CheckoutInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  gap:1.5rem;
`;

const CheckoutInputTitle = styled.h2`
    font-weight:bold;
`;

const CheckoutInputGroup = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: var(--fs-m);
`;

const CheckoutBtn = styled.button`
    width:100%;
  cursor: pointer;
  background-color: var(--clr-dark-blue);
  color: white;
  font-size: var(--fs-m);
  border: none;
  padding-block: 0.5rem;
  padding-inline: 2rem;
  border-radius: 5px;
  font-weight:bold;
  &:active {
    background-color: #005897;
  }
`;
const LineDivider = styled.div`
    width:100%;
    border:1px solid var(--grey-200);
`
function CheckoutInput(){
    const [TinhThanhChosen,SetTinhThanhChosen] =useState();
    const [QuanHuyenChosen,SetQuanHuyenChosen] =useState();
    const [PhuongXaChosen,SetPhuongXa] =useState();
    const [FullName,SetFullName]= useState();
    const [PhoneNumber,SetPhoneNumber] = useState();
    const [Address,SetAddress] = useState();

    const {data:tinhThanhData}= useGetTinhThanh();
    const {mutate:GetQuanHuyen} = useGetQuanHuyen();
    const {mutate:GetPhuongXa} = useGetPhuongXa();

    const [QuanHuyenData,SetQuanHuyenData] = useState();
    const [PhuongXaData,SetPhuongXaData] = useState();
    const handleCheckout =(e)=>{
         e.preventDefault();
         console.log(TinhThanhChosen);
         console.log(QuanHuyenChosen);
         console.log(PhuongXaChosen);
         console.log(FullName);
         console.log(PhoneNumber);
         console.log(Address);
    }

    useEffect(()=>{
        if(TinhThanhChosen){
            GetQuanHuyen(
                {   TinhThanhId:TinhThanhChosen },
                {
                    onSuccess:(data)=>{
                        SetQuanHuyenData(data.data)
                    },
                    onError:(error)=>{
                        const message =  error.response?.data?.message || error.message;
                        alert(`Lỗi: ${message}`)
                    }
                }
            )

        }
    }, [TinhThanhChosen])

    useEffect(()=>{
        if(QuanHuyenChosen){
            
            GetPhuongXa(
                {
                    QuanHuyenId : QuanHuyenChosen
                },
                {
                    onSuccess:(data)=>{
                        
                        SetPhuongXaData(data.data)
                    },
                    onError:(error)=>{
                        const message =  error.response?.data?.message || error.message;
                        alert(`Lỗi: ${message}`)
                    }
                }
            )
        }
    },[QuanHuyenChosen])
    return(
        <>
            <CheckoutInputContainer className="CheckoutInput-Container">

                <CheckoutInputTitle className="CheckoutInput-Title">
                    Thanh toán đơn hàng
                </CheckoutInputTitle>
                <LineDivider></LineDivider>

                <Form onSubmit={handleCheckout}>

                    <Form.Group
                        onChange={(e)=>SetFullName(e.target.value)}
                        className="mb-3" 
                        controlId="Checkout.Form"
                        
                    >
                        <Form.Label>Họ và tên: </Form.Label>
                        <Form.Control type="name" placeholder="Nhập họ tên" required/>
                    </Form.Group>

                    <Form.Group 
                        className="mb-3" 
                        controlId="Checkout.Form"
                        onChange={(e)=>SetPhoneNumber(e.target.value)}
                        
                    >
                        <Form.Label>Số điện thoại: </Form.Label>
                        <Form.Control type="name" placeholder="Nhập họ tên" required/>
                    </Form.Group>

                    
                    <Form.Group 
                        className="mb-3" 
                        controlId="Checkout.Form">
                        <Form.Label>Tỉnh/Thành Phố:</Form.Label>
                        <Form.Select 
                        aria-label="Default select example" 
                        onChange={(e)=>SetTinhThanhChosen(e.target.value)}
                        required
                        >
                            <option>Tỉnh thành</option>
                            {tinhThanhData?.data.map((item)=>{
                                return <option value={item.id}>{item.name}</option>
                            })}
                            
                        </Form.Select>
                    </Form.Group>
                   
                       
                    <Form.Group 
                        className="mb-3" 
                        controlId="Checkout.Form">
                        <Form.Label>Quận/Huyện:</Form.Label>
                        <Form.Select 
                        aria-label="Default select example"
                        onChange={(e)=>SetQuanHuyenChosen(e.target.value)}
                        required
                        >
                            <option>Quận huyện</option>
                            {

                                QuanHuyenData?.map((item)=>{
                                    return <option value={item.id}>{item.name}</option>
                                })
                            }
                            
                        </Form.Select>
                    </Form.Group>
                    
                        
                    <Form.Group 
                        className="mb-3" 
                        controlId="Checkout.Form">

                        <Form.Label>Phường/Xã:</Form.Label>

                        <Form.Select aria-label="Default select example" onChange={(e)=>SetPhuongXa(e.target.value)} required>
                            <option>Phường xã</option>
                            {
                                PhuongXaData?.map((item)=>{
                                    return <option key={item.id}>{item.name}</option>
                                })
                            }
                            
                        </Form.Select>
                    </Form.Group>

                    <Form.Group 
                        onChange={(e)=>SetAddress(e.target.value)}
                        className="mb-3" 
                        controlId="Checkout.Form">
                        <Form.Label>Địa chỉ: </Form.Label>
                        <Form.Control type="name" placeholder="Nhập địa chỉ (số nhà, tên đường)" required />
                    </Form.Group>
                    
                    
                    <CheckoutBtn type="submit">Thanh toán</CheckoutBtn>
                </Form>

            </CheckoutInputContainer>
        </>
    )


}

export default CheckoutInput;