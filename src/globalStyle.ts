import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
:root{
    --text-color-secondary:black
}
*,*::before,*::after{
    box-sizing: border-box;

}
body{
    margin:0;
    padding:0;
    font-size: 16px;
    font-family:'Lora','Monaco',sans-serif;
    background-color: #FFF9C4;
}
`;
