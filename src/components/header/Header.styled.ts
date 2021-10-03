import { IconButton } from '@mui/material';
import styled from 'styled-components';




export const StyledLogo = styled.div`
color: rgba(0, 0, 0, 0.54);
    text-transform: uppercase;
    text-decoration: none;
    width:50px;
    height:100%;
    margin:10px;
    padding:10px;
    font-size: ${({theme})=>theme.font.size.h2};
    text-align: center;
    display: flex;
    align-items: center;

`;

export const StyledIconsWrapper = styled.div`
color: rgba(0, 0, 0, 0.54);
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    max-width:50%;
    width: fit-content;
    position:relative;

`
export const StyledIconWrapper = styled(IconButton)`
color: rgba(0, 0, 0, 0.54);
text-decoration: none;
height:100%;
width:max-content;
cursor: pointer;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
margin-left:10px;
svg{
    font-size:2rem;
    text-decoration: none;
}
p{
    font-size:1.1rem;
   margin-bottom:10px;
   text-decoration: none;
}
`
export const StyledIText = styled.p`
word-spacing:.2rem;
max-width:100%;
padding:0;
margin:0;
`

