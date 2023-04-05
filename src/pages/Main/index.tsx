import {useCallback, useEffect, useState} from 'react';

import {
  getFirestore,
  collection,
  doc,
  DocumentReference,
  FirestoreDataConverter,
  WithFieldValue,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
  getDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import {useDocumentData, useCollectionData} from 'react-firebase-hooks/firestore';

import {db} from 'config/firebase';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {fetchWordsInDictionary} from 'store/words/actionCreators';

import Keyboard from 'components/Keyboard';
import Layout from 'components/Layout';
import TypeForm from 'components/TypeForm';
import WordAndSentence from 'components/WordAndSentence';

type Dictionary = {
  id: string;
  tenses: string[];
};

const dictionaryConverter: FirestoreDataConverter<Dictionary> = {
  toFirestore(dictionary: WithFieldValue<Dictionary>): DocumentData {
    return {tenses: dictionary.tenses};
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Dictionary {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      // ref: snapshot.ref,
      tenses: data.tenses,
    };
  },
};

const Main = () => {
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {words, isLoading} = useAppSelector((state) => state.wordsReducer);
  const {currentWordId, writtenText, currentWordTense, wordVariants, currentVariantIndex} = useAppSelector((state) => state.currentWordReducer);
  const currentWord = words[currentWordId - 1];
  const wordNumbers = words.length;
  const [sasdas, setSasdas] = useState(true);

  const ref = collection(db, '/dictionaries/wmHSUtOX4Ar50I6uOsXi/words');
  const refCollection = query(ref, orderBy('word', 'asc'));
  const [value, loading, error, snapshot] = useCollectionData(refCollection, {
    snapshotListenOptions: {includeMetadataChanges: true},
  });

  console.log(value);

  (async () => {
    if (!sasdas) return false;

    if (!value) return false;

    // const docasdasd = await getDoc(value?.[0].test);
    // console.log(docasdasd.data());

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

    setSasdas(false);
  })();

  const onOpenSidebar = useCallback((value?: boolean) => {
    setSidebarOpen((prevState) => {
      return value !== undefined ? value : !prevState;
    });
  }, []);

  useEffect(() => {
    dispatch(fetchWordsInDictionary());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
