import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  button {
    width: 130px;
    height: 40px;
    margin: 0;
    background-color: transparent;
    cursor: pointer;
    border-radius: 10px;
  }
`;

export default GlobalStyle;