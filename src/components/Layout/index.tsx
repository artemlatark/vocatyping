import React from 'react';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

import styles from './index.module.css';
import {Props} from './types';

const Layout: React.FC<Props> = ({children, onOpenSidebar, sidebarOpen, words, wordNumbers, currentWord, currentWordId}) => (
  <div className={styles.layout}>
    <Sidebar onOpenSidebar={onOpenSidebar} sidebarOpen={sidebarOpen} currentWord={currentWord} currentWordId={currentWordId} words={words} />
    <div className={styles.content}>
      <Header onOpenSidebar={onOpenSidebar} wordNumbers={wordNumbers} currentWordId={currentWordId} />
      {children}
    </div>
  </div>
);

export default Layout;
