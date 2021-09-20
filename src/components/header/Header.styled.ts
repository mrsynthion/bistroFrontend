import styled from 'styled-components';

export const HeaderWrapper = styled.header`
width:100%;
height:60px;
background-color: var(--orange-500);
margin:0;
position: fixed;
top:0;


@media(max-width:576px){
    height:50px;
}
`
export const StyledWrapper = styled.div`
width:80%;
height:100%;
margin: auto;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
position:relative;
`

export const StyledLogo = styled.div`
    text-transform: uppercase;
    text-decoration: none;
    width:50px;
    height:100%;
    margin:10px;
    padding:10px;
    color:var(--orange-200);
    font-size: ${({theme})=>theme.font.size.h2};
    text-align: center;
    display: flex;
    align-items: center;

`;

export const StyledIconsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    max-width:50%;
    width: fit-content;
    position:relative;

`
export const StyledI = styled.i`
text-decoration: none;
height:100%;
margin-left:20px;
font-size:${({theme})=>theme.font.size.h4};
color:var(--orange-200);
cursor: pointer;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
export const StyledIText = styled.p`
font-size:${({theme})=>theme.font.size.h5};
display:flex;
justify-content: center;
word-spacing:-0.3rem;
max-width:100%;
padding:0;
margin:0;
`

