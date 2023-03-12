import React from 'react';

import Sidebar from 'components/Sidebar';
import Header from 'components/Header';

import {Props} from './types';

import styles from './index.module.css';

const Layout: React.FC<Props> = ({
  children,
  onOpenSidebar,
  sidebarOpen,
  words,
  wordNumbers,
  currentWord,
  currentWordId,
  currentWordTense,
}) => (
  <div className={styles.layout}>
    <Sidebar
      onOpenSidebar={onOpenSidebar}
      sidebarOpen={sidebarOpen}
      currentWord={currentWord}
      currentWordId={currentWordId}
      words={words}
    />
    <div className={styles.content}>
      <Header
        onOpenSidebar={onOpenSidebar}
        wordNumbers={wordNumbers}
        currentWordId={currentWordId}
        currentWord={currentWord}
        currentWordTense={currentWordTense}
      />
      {children}
    </div>
  </div>
);

export default Layout;
