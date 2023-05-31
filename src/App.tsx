import {useEffect} from 'react';

import {favoriteLanguages} from './config/options';
import {useSpeechSynthesisContext} from './context/SpeechSynthesisContext';
import {useAppSelector} from './hooks/redux';
import {useSpeechSynthesis} from './hooks/useSpeechSynthesis';
import Main from './pages/Main';

function App() {
  const {currentVoiceURI} = useAppSelector((state) => state.optionsReducer);
  const speechSynthesis = useSpeechSynthesis();
  const {setSpeechSynthesisCtx} = useSpeechSynthesisContext();

  useEffect(() => {
    setSpeechSynthesisCtx((prevState) => {
      const voices = speechSynthesis.voices.filter((voice) => favoriteLanguages.includes(voice.lang));

      if (!voices.length) return prevState;

      speechSynthesis.voices = voices;

      let selectedVoice = voices.find((voice) => voice.name === currentVoiceURI);

      return {...prevState, ...speechSynthesis, selectedVoice};
    });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [speechSynthesis.voices]);

  return <Main />;
}

export default App;
