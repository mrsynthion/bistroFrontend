import styled from "styled-components";


export const StyledLoginModalWrapper = styled.div<{isOpen:boolean}>`
    width:min(100%,400px);
    height: 250px;
    background-color: var(--orange-500);
    z-index: 99;
    display: ${({isOpen})=>isOpen ? 'flex':'none'};
    position:absolute;
    top:calc(100% + 10px);
    transform: translateX(25%);
    border-radius:50px;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

`
export const StyledParagraph = styled.p`
padding:0;
margin:0;
font-size: 0.8rem;

`

