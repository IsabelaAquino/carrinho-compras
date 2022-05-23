import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import background from '../assets/images/background.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #FFFAFA;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
