import { IconButton } from "@mui/material";
import styled from "styled-components";

export const StyledMenuItemsWrapper = styled.div`
width:100%;
text-align: center;
`
export const StyledIconWrapper = styled(IconButton)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
color: rgba(0, 0, 0, 0.54);
text-decoration: none;
text-align: center;
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
export const StyledIconText = styled.p`
word-spacing:.2rem;
max-width:100%;
padding:0;
margin:0;
`
