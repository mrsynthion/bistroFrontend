import { PolishVariables } from "@src/utils/models/user.model";
import styled from "styled-components";


export const StyledRegisterInputWrapper = styled.div`
height:70%;
width:80%;
margin:auto;
display:grid;
grid-template-columns:repeat(2,50%);
grid-template-rows: repeat(6,1fr);
grid-gap: 3%;
`
export const StyledInputWrapper = styled.div<{value:string}>`
width:100%;
height:100%;
grid-column-start: ${({value})=> value === PolishVariables.userPassword ? 1 :''};
grid-column-end: ${({value})=> value === PolishVariables.userPassword ?  3:''};
`
interface SubmittingParagraphProps {
    error?:boolean,
    success?:boolean
}
export const StyledSubmittingParagraph = styled.p<SubmittingParagraphProps>`
font-size:${({theme})=>theme.font.size.h3};
margin:0 auto 15%;
    color: ${({error,success})=> {
        if(error){
            return '#f44336'
        };
        if(success){
            return '#388e3c'
        }

    }}
`
