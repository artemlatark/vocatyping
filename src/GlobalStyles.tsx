import {grey} from '@mui/material/colors';
import GlobalStyles from '@mui/material/GlobalStyles';

export const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      'html, body, #root': {
        height: '100%',
      },
      body: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        fontSize: 14,
        margin: 0,
        minWidth: 990,
        padding: 0,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        '&.mode-light': {
          backgroundColor: grey[100],
        },
        '&.mode-dark': {
          backgroundColor: grey[900],
        },
      },
    }}
  />
);
