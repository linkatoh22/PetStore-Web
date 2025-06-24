import styled from "styled-components"

const Container = styled.div`
    width:45%;
    padding:2rem;
    display:flex;
    flex-direction:column;
    gap:0.5rem;
`
const Title =styled.div`
    font-weight:bold;
    color: rgba(0, 0, 0, .8);
    font-size: 20px;
    
    text-transform: capitalize;

`
const Name =styled.div`

    color: rgba(0, 0, 0, .8);
    font-size: 17px;
    
    

`
const Address =styled.div`

    color: var(--grey-700);
    font-size: 15px;
    
    

`
export default function AddressInfo(){
    return(
        <Container> 
            <Title>Địa chỉ nhận hàng</Title>
            <Name> TLinh</Name>
            <Address> 012456788</Address>
            <Address> 123 Abc str TPHCM P3 Q7</Address>
        </Container>
    )


}