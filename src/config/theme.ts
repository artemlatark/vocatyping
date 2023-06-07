import {createTheme} from '@mui/material/styles';

const themeOptions = createTheme({
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
});

export const lightTheme = createTheme({
  ...themeOptions,
  palette: {
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  ...themeOptions,
  palette: {
    mode: 'dark',
  },
});

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};
