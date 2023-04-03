import {useCallback, useEffect, useState} from 'react';

import {getFirestore, collection, getDocs} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import {app} from 'config/firebase';

import {useAppSelector} from 'hooks/redux';

import Keyboard from 'components/Keyboard';
import Layout from 'components/Layout';
import TypeForm from 'components/TypeForm';
import WordAndSentence from 'components/WordAndSentence';

const Main = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {words, isLoading} = useAppSelector((state) => state.wordsReducer);
  const {currentWordId, writtenText, currentWordTense, wordVariants, currentVariantIndex} = useAppSelector((state) => state.currentWordReducer);
  const currentWord = words[currentWordId - 1];
  const wordNumbers = words.length;
  const [sasdas, setSasdas] = useState(true);

  const [value, loading, error, snapshot] = useCollectionData(collection(getFirestore(app), 'dictionaries'), {
    snapshotListenOptions: {includeMetadataChanges: true},
  });

  const onOpenSidebar = useCallback((value?: boolean) => {
    setSidebarOpen((prevState) => {
      return value !== undefined ? value : !prevState;
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (!sasdas) return false;

      // await addDoc(collection(getFirestore(app), '/dictionaries/wmHSUtOX4Ar50I6uOsXi/words'), [
      //   {
      //     tenses: ['abatement'],
      //     sentence: ['Your abatement of taxes is due to your increased charity giving.'],
      //   },
      //   {
      //     tenses: ['abbreviate', 'abbreviates'],
      //     sentence: ["She abbreviates so much that I can't understand what she's saying."],
      //   },
      // ]);

      const querySnapshot = await getDocs(collection(getFirestore(app), 'dictionaries'));
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });

      setSasdas(false);
    })();
  }, [sasdas]);

  console.log(value);

  return (
    <Layout onOpenSidebar={onOpenSidebar} sidebarOpen={sidebarOpen} words={words} wordNumbers={wordNumbers} currentWord={currentWord} currentWordId={currentWordId}>
      <WordAndSentence currentWordTense={currentWordTense} wordVariants={wordVariants} currentVariantIndex={currentVariantIndex} currentWord={currentWord} />
      <TypeForm
        wordNumbers={wordNumbers}
        isLoading={isLoading}
        currentWordId={currentWordId}
        writtenText={writtenText}
        currentWordTense={currentWordTense}
        wordVariants={wordVariants}
        currentWord={currentWord}
        currentVariantIndex={currentVariantIndex}
      />
      <Keyboard currentWordId={currentWordId} writtenText={writtenText} wordVariants={wordVariants} currentVariantIndex={currentVariantIndex} />
    </Layout>
  );
};

export default Main;
