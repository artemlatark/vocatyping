import React, {useRef, useState} from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {useSpeechSynthesisContext} from 'context/SpeechSynthesisContext';

import styles from '../index.module.css';
import {SentenceOfWordProps, ContextMenuPosition} from '../types';

const SentencesOfWord: React.FC<SentenceOfWordProps> = ({currentWord}) => {
  const {speechSynthesis} = useSpeechSynthesisContext();
  const [contextMenuPosition, setContextMenuPosition] = useState<ContextMenuPosition | null>(null);
  const sentenceRef = useRef<HTMLDivElement | null>(null);

  const closeContextMenu = (): void => {
    setContextMenuPosition(null);
  };

  const openContextMenu = (event: React.MouseEvent): void => {
    event.preventDefault();

    /**
     * repeated contextmenu when it's already open closes it with Chrome 84 on Ubuntu
     * Other native context menus might behave different.
     * With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
     */
    if (!window.getSelection()?.toString()) return;

    const contextMenuNewPosition = {
      top: event.clientY - 6,
      left: event.clientX + 2,
    };

    setContextMenuPosition(contextMenuPosition === null ? contextMenuNewPosition : null);
  };

  const listenSelectionPhraseInSentence = (): void => {
    if (speechSynthesis?.isSpeaking) {
      speechSynthesis?.cancelSpeaking();
    }

    speechSynthesis?.speak({
      text: window.getSelection()?.toString(),
      voice: speechSynthesis?.selectedVoice,
      rate: 1,
    });

    closeContextMenu();
  };

  return (
    <>
      <div className={styles.sentenceOfWord} ref={sentenceRef} onMouseUp={openContextMenu} role="button" tabIndex={0}>
        {currentWord?.sentences.map((sentence, index) => (
          <React.Fragment key={`${sentence}-${currentWord.id}-${index}`}>
            {index !== 0 && <br />}
            {sentence}
          </React.Fragment>
        ))}
      </div>
      <Menu
        open={contextMenuPosition !== null}
        onClose={closeContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={contextMenuPosition !== null ? contextMenuPosition : undefined}
      >
        <MenuItem onClick={listenSelectionPhraseInSentence}>Listen</MenuItem>
      </Menu>
    </>
  );
};

export default SentencesOfWord;
