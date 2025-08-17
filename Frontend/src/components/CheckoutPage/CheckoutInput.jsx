
import { toast } from "react-toastify";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { useCheckOut, useGetPhuongXa, useGetQuanHuyen, useGetTinhThanh } from "../../services/hook/CheckoutHook";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  gap:1.5rem;

  @media (min-width: 0px) and (max-width: 598.99px) {
        gap:0.7rem;
        width: 40%;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        gap:0.9rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        gap:1.1rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        gap:1.3rem;
    }
`;

const CheckoutInputTitle = styled.div`
    font-weight:bold;
`;



const CheckoutBtn = styled.button`
    border: none;
    width:100%;
    cursor: pointer;
    background-color: var(--clr-dark-blue);
    color: white;

    font-size: 1.2rem;
    padding-block: 0.5rem;
    padding-inline: 2rem;
  
    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.5rem;
        padding-block: 0.1rem;
        padding-inline: 0.7rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.6rem;
        padding-block: 0.2rem;
        padding-inline: 0.9rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.7rem;
        padding-block: 0.3rem;
        padding-inline: 1.2rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 0.9rem;
        padding-block: 0.4rem;
        padding-inline: 1.5rem;
    }

    border-radius: 5px;
    font-weight:bold;
    &:active {
        background-color: #005897;
    }

    &:disabled {
        background-color: gray;
        cursor: not-allowed;
        opacity: 0.7;
    }
`;
const LineDivider = styled.div`
    width:100%;
    border:1px solid var(--grey-200);
`

const FormContainter = styled.div`
    font-size: 1.2rem;
    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size: 0.7rem;
        
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size: 0.8rem;
        
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size: 0.9rem;
        
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        font-size: 1rem;
        
    }


`


const StyledFormControl = styled(Form.Control)`
  font-size: 1.2rem;

  @media (max-width: 598.99px) {
    font-size: 0.5rem;
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
    font-size: 0.8rem;
  }
  @media (min-width: 800px) and (max-width: 1199.98px) {
    font-size: 0.9rem;
  }
  @media (min-width: 1200px) and (max-width: 1500px) {
    font-size: 1rem;
  }
`;


const StyledFormSelect = styled(Form.Select)`
  font-size: 1.2rem;

  @media (max-width: 598.99px) {
    font-size: 0.5rem;
  }
  @media (min-width: 599px) and (max-width: 799.99px) {
    font-size: 0.8rem;
  }
  @media (min-width: 800px) and (max-width: 1199.98px) {
    font-size: 0.9rem;
  }
  @media (min-width: 1200px) and (max-width: 1500px) {
    font-size: 1rem;
  }
`;


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
    const {mutate:CreateOrder,isPending:isLoading} = useCheckOut();
    const [QuanHuyenData,SetQuanHuyenData] = useState();
    const [PhuongXaData,SetPhuongXaData] = useState();

    
    const handleCheckout =(e)=>{
         e.preventDefault();
         if( !TinhThanhChosen.value || !QuanHuyenChosen.value ||!PhuongXaChosen.value){
            toast.success("Vui lòng chọn thông tin nơi giao hàng");
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
                        toast.success("Đơn hàng đặt thành công");
                        
                        localStorage.removeItem('cartItems')
                        navigate("/")
                    },
                    onError:(error)=>{
                        toast.error("Lỗi đặt đơn hàng: " + error.message);
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

    useEffect(() => {
        document.body.style.cursor = isLoading ? "wait" : "default";
        }, [isLoading]);


    return(
        <>
            <CheckoutInputContainer className="CheckoutInput-Container" >

                <CheckoutInputTitle className="CheckoutInput-Title">
                    Thanh toán đơn hàng
                </CheckoutInputTitle>
                <LineDivider></LineDivider>
                    <FormContainter>
                        <Form onSubmit={handleCheckout}>

                            <Form.Group
                                onChange={(e)=>SetFullName(e.target.value)}
                                className="mb-3" 
                                controlId="Checkout.Form"
                                
                            >
                                <Form.Label>Họ và tên: </Form.Label>

                                <StyledFormControl type="name" placeholder="Nhập họ tên" required/>
                            
                            </Form.Group>

                            <Form.Group 
                                className="mb-3" 
                                controlId="Checkout.Form"
                                onChange={(e)=>SetPhoneNumber(e.target.value)}
                                
                            >
                                <Form.Label>Số điện thoại: </Form.Label>
                                
                                <StyledFormControl type="name" placeholder="Nhập họ tên" required/>
                            </Form.Group>

                            
                            <Form.Group 
                                className="mb-3" 
                                controlId="Checkout.Form">
                                <Form.Label>Tỉnh/Thành Phố:</Form.Label>
                                <StyledFormSelect
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
                                    {tinhThanhData?.data?.map((item)=>{
                                        return <option 
                                            
                                            value = {item.name}
                                            data-id={item.id}
                                            >{item.name}</option>
                                    })}
                                    
                                </StyledFormSelect>
                            </Form.Group>
                        
                            
                            <Form.Group 
                                className="mb-3" 
                                controlId="Checkout.Form">
                                <Form.Label>Quận/Huyện:</Form.Label>
                                <StyledFormSelect
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
                                    
                                </StyledFormSelect>
                            </Form.Group>
                            
                                
                            <Form.Group 
                                className="mb-3" 
                                controlId="Checkout.Form">

                                <Form.Label>Phường/Xã:</Form.Label>

                                <StyledFormSelect aria-label="Default select example" onChange={(e)=>{
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
                                    
                                </StyledFormSelect>
                            </Form.Group>

                            <Form.Group 
                                onChange={(e)=>SetAddress(e.target.value)}
                                className="mb-3" 
                                controlId="Checkout.Form">
                                <Form.Label>Địa chỉ: </Form.Label>
                                <StyledFormControl type="name" placeholder="Nhập địa chỉ (số nhà, tên đường)" required />
                            </Form.Group>
                            
                            
                            <CheckoutBtn type="submit" disabled={isLoading}>
                                {isLoading ? "Đang xử lý..." : "Thanh toán"}
                            </CheckoutBtn>
                        </Form>
                    </FormContainter>

            </CheckoutInputContainer>
        </>
    )


}

export default CheckoutInput;