import styled from "styled-components"

const Container = styled.div`
    width:45%;
    
    display:flex;
    flex-direction:column;
    
    padding:2rem;
    gap:0.5rem;
    font-size: 1.1rem;

    @media (min-width: 0px) and (max-width: 598.99px) {
        padding:0.9rem;
        gap:0.3rem;
        font-size: 0.6rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        padding:1.1rem;
        gap:0.3rem;
        font-size: 0.8rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        padding:1.4rem;
        gap:0.4rem;
        font-size: 0.9rem;
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        padding:1.7rem;
        gap:0.4rem;
        font-size: 1rem;
    }
`
const Title =styled.div`
    font-weight:bold;
    color: rgba(0, 0, 0, .8);
    font-size: 1.3rem;
    
    text-transform: capitalize;

    @media (min-width: 0px) and (max-width: 598.99px) {
        font-size:0.7rem;
    }
    @media (min-width: 599px) and (max-width: 799.99px) {
        font-size:0.9rem;
    }
    @media (min-width: 800px) and (max-width: 1199.98px) {
        font-size:1rem;
       
    }
    @media (min-width: 1200px) and (max-width: 1500px) {
        
        font-size: 1.2rem;
    }

`
const Name =styled.div`

    color: rgba(0, 0, 0, .8);
    
    
    

`
const Address =styled.div`

    color: var(--grey-700);
    
    
    

`
export default function AddressInfo({shippingInfo}){
    return(
        <Container> 
            <Title>Địa chỉ nhận hàng</Title>
            <Name> {shippingInfo?.fullname}</Name>
            <Address> {shippingInfo?.phoneNumber}</Address>
            <Address> {shippingInfo?.address} {", "} {shippingInfo?.ward}{", "} {shippingInfo?.district}{", "} {shippingInfo?.cityProvince}</Address>
        </Container>
    )


}