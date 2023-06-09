import {ThemeProvider} from '@mui/material/styles';

import {theme} from 'config/theme';

import {useThemeContext} from 'context/ThemeContext';

import Main from 'pages/Main';

function App() {
  const themeColor = useThemeContext();

  return (
    <ThemeProvider theme={theme[themeColor]}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
