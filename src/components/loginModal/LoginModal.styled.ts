import styled from "styled-components";


export const StyledLoginModalWrapper = styled.div<{isOpen:boolean}>`
    width:200%;
    height: 250px;
    background-color: var(--orange-700);
    z-index: 99;
    display: ${({isOpen})=>isOpen ? 'flex':'none'};
    position:absolute;
    top:calc(100% + 10px);
    transform: translateX(25%);
    border-radius:50px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

`


