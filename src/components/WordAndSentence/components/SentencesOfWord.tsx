import React, {useRef, Fragment} from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import styles from '../index.module.css';
import {SentenceOfWordProps, ContextMenu} from '../types';

const SentencesOfWord: React.FC<SentenceOfWordProps> = ({currentWord, speak, voice}) => {
  const [contextMenu, setContextMenu] = React.useState<ContextMenu | null>(null);
  const sentenceRef = useRef<HTMLDivElement | null>(null);

  const closeContextMenu = (): void => {
    setContextMenu(null);
  };

  const openContextMenu = (event: React.MouseEvent): void => {
    event.preventDefault();

    /**
     * repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
     * Other native context menus might behave different.
     * With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
     */
    setContextMenu(contextMenu === null ? {mouseX: event.clientX + 2, mouseY: event.clientY - 6} : null);
  };

  const listenSelectionPhraseInSentence = (): void => {
    speak({text: window.getSelection()?.toString(), voice, rate: 0.8});
    closeContextMenu();
  };

  return (
    <>
      <div className={styles.sentenceOfWord} ref={sentenceRef} onContextMenu={openContextMenu}>
        {currentWord?.sentences.map((sentence, index) => (
          <Fragment key={`${sentence}-${currentWord.id}-${index}`}>
            {index !== 0 && <br />}
            {sentence}
          </Fragment>
        ))}
      </div>
      <Menu
        open={contextMenu !== null}
        onClose={closeContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? {top: contextMenu.mouseY, left: contextMenu.mouseX} : undefined}
      >
        <MenuItem onClick={listenSelectionPhraseInSentence}>Listen</MenuItem>
      </Menu>
    </>
  );
};

export default SentencesOfWord;
