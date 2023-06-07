import {useEffect} from 'react';

import {ThemeProvider} from '@mui/material/styles';

import {favoriteLanguages} from 'config/settings';
import {theme} from 'config/theme';

import {useAppSelector} from 'hooks/redux';
import {useSpeechSynthesis} from 'hooks/useSpeechSynthesis';

import {useSpeechSynthesisContext} from 'context/SpeechSynthesisContext';
import {useThemeContext} from 'context/ThemeContext';

import Main from 'pages/Main';

function App() {
  const {currentVoiceURI} = useAppSelector((state) => state.settingsReducer);
  const speechSynthesis = useSpeechSynthesis();
  const {setSpeechSynthesis} = useSpeechSynthesisContext();
  const themeColor = useThemeContext();

  useEffect(() => {
    setSpeechSynthesis((prevState) => {
      const voices = speechSynthesis.voices.filter((voice) => favoriteLanguages.includes(voice.lang));

      if (!voices.length) return prevState;

      speechSynthesis.voices = voices;

      const selectedVoice = voices.find((voice) => voice.name === currentVoiceURI) ?? voices[0];

      return {...prevState, ...speechSynthesis, selectedVoice};
    });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [speechSynthesis.voices]);

  return (
    <ThemeProvider theme={theme[themeColor]}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
