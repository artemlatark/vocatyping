import {ThemeProvider} from '@mui/material/styles';

import {theme} from 'config/theme';

import {useThemeContext} from 'context/ThemeContext';

import Layout from 'components/Layout';

import Main from 'pages/Main';

function App() {
  const themeColor = useThemeContext();

  return (
    <ThemeProvider theme={theme[themeColor]}>
      <Layout>{(props) => <Main {...props} />}</Layout>
    </ThemeProvider>
  );
}

export default App;
