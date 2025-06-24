

import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { useCheckOut, useGetPhuongXa, useGetQuanHuyen, useGetTinhThanh } from "../../services/hook/CheckoutHook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
function CheckoutInput({cartInfo}){
    const [TinhThanhChosen,SetTinhThanhChosen] =useState({});
    const [QuanHuyenChosen,SetQuanHuyenChosen] =useState({});
    const [PhuongXaChosen,SetPhuongXa] =useState({});
    const [FullName,SetFullName]= useState();
    const [PhoneNumber,SetPhoneNumber] = useState();
    const [Address,SetAddress] = useState();
    const navigate = useNavigate()
    const {data:tinhThanhData}= useGetTinhThanh();
    const {mutate:GetQuanHuyen} = useGetQuanHuyen();
    const {mutate:GetPhuongXa} = useGetPhuongXa();
    const {mutate:CreateOrder} = useCheckOut();
    const [QuanHuyenData,SetQuanHuyenData] = useState();
    const [PhuongXaData,SetPhuongXaData] = useState();
    const handleCheckout =(e)=>{
         e.preventDefault();
         if( !TinhThanhChosen.value || !QuanHuyenChosen.value ||!PhuongXaChosen.value){
            alert("Vui lòng chọn thông tin nơi giao hàng")
            return;
         }
        
        
        if(cartInfo){
            var CartItem = []
            cartInfo.map((item)=>{
                var cartItemTemp = {}
                cartItemTemp.item=item.item
                cartItemTemp.quantity=item.quantity

                if(item.itemType =="Product"){
                    cartItemTemp.itemType ="Product"
                    cartItemTemp.variant = item.variant
                }
                else if(item.itemType =="Pet"){
                    cartItemTemp.itemType ="Pet"
                }

                CartItem.push(cartItemTemp)
            })
            
                CreateOrder(
                {
                    items:CartItem
                    ,
                    shippingInfo:{
                        fullname:FullName,
                        phoneNumber:PhoneNumber,
                        address:Address,
                        cityProvince:TinhThanhChosen.value,
                        district:QuanHuyenChosen.value,
                        ward:PhuongXaChosen.value

                    }
                },
                {
                    onSuccess:(data)=>{
                        alert("Đơn hàng đặt thành công")
                        localStorage.removeItem('cartItems')
                        navigate("/")
                    },
                    onError:(error)=>{
                        alert("Lỗi đặt đơn hàng: " + error.message);
                    }
                }
            )
        }
        
    }

    useEffect(()=>{
        if(TinhThanhChosen){
            GetQuanHuyen(
                {   TinhThanhId:TinhThanhChosen.key },
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
                    QuanHuyenId : QuanHuyenChosen.key
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
                        onChange={(e)=>{
                            const selectedIndex = e.target.selectedIndex;
                            const selectedOption = e.target.options[selectedIndex];
                            SetTinhThanhChosen({
                                key: selectedOption.getAttribute('data-id'),
                                value: e.target.value
                            })

                        }
                            
                        }
                        required
                        >
                            <option>Tỉnh thành</option>
                            {tinhThanhData?.data.map((item)=>{
                                return <option 
                                    
                                    value = {item.name}
                                    data-id={item.id}
                                    >{item.name}</option>
                            })}
                            
                        </Form.Select>
                    </Form.Group>
                   
                       
                    <Form.Group 
                        className="mb-3" 
                        controlId="Checkout.Form">
                        <Form.Label>Quận/Huyện:</Form.Label>
                        <Form.Select 
                        aria-label="Default select example"
                        onChange={(e)=>{
                            const selectedIndex = e.target.selectedIndex;
                            const selectedOption = e.target.options[selectedIndex];
                            SetQuanHuyenChosen({
                                key: selectedOption.getAttribute('data-id'),
                                value: e.target.value
                            })
                        
                        }}
                        required
                        >
                            <option>Quận huyện</option>
                            {

                                QuanHuyenData?.map((item)=>{
                                    return <option 
                                    value={item.name}
                                    data-id={item.id}
                                    >{item.name}</option>
                                })
                            }
                            
                        </Form.Select>
                    </Form.Group>
                    
                        
                    <Form.Group 
                        className="mb-3" 
                        controlId="Checkout.Form">

                        <Form.Label>Phường/Xã:</Form.Label>

                        <Form.Select aria-label="Default select example" onChange={(e)=>{
                            const selectedIndex = e.target.selectedIndex;
                            const selectedOption = e.target.options[selectedIndex];
                            SetPhuongXa({
                                key: selectedOption.getAttribute('data-id'),
                                value: e.target.value
                            })
                            
                            }} required>
                            <option>Phường xã</option>
                            {
                                PhuongXaData?.map((item)=>{
                                    return <option 
                                    value={item.name}
                                    data-id={item.id}
                                    >{item.name}</option>
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