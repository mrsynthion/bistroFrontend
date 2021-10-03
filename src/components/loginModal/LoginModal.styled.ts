import styled from "styled-components";


export const StyledLoginModalWrapper = styled.div<{isOpen:boolean}>`
    width:min(100%,400px);
    height: 250px;
    background-color:#42a5f5;
    z-index: 99;
    display: ${({isOpen})=>isOpen ? 'flex':'none'};
    position:absolute;
    top:calc(100% + 10px);
    border-radius:50px;


`
export const StyledParagraph = styled.p`
padding:0;
margin:0;
font-size: 0.8rem;

`

export const StyledButtonWrapper = styled.div`
display:flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
`
