import styled from "styled-components";


export const StyledLoginModalWrapper = styled.div<{isOpen:boolean}>`
    width:min(400%,400px);
    height: 250px;
    background-color: #FFB300;
    z-index: 99;
    display: ${({isOpen})=>isOpen ? 'flex':'none'};
    position:absolute;
    top:85%;
    border-radius:50px;
    -webkit-box-shadow: 0px 12px 35px 3px rgba(96, 61, 0, 1);
-moz-box-shadow: 0px 12px 35px 3px rgba(96, 61, 0, 1);
box-shadow: 0px 5px 20px 3px rgba(96, 61, 0, 1);
`
export const StyledParagraph = styled.p`
padding:0;
margin:10% 0 0 ;
font-size: 0.5rem;
`

export const StyledButtonWrapper = styled.div`
display:flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
`
