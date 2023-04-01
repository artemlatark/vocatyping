import {useEffect} from 'react';

import {useAppDispatch} from './hooks/redux';
import Main from './pages/Main';
import {fetchWords} from './store/words/actionCreators';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWords());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Main />;
}

export default App;
