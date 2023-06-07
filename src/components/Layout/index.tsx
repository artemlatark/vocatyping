import React, {useCallback, useState} from 'react';

import Header from 'components/Header';
import SidebarDictionary from 'components/SidebarDictionary';
import SidebarSettings from 'components/SidebarSettings';

import styles from './index.module.css';
import {HandleOpenSidebar, Props} from './types';

const Layout: React.FC<Props> = ({children}) => {
  const [sidebarDictionaryOpen, setSidebarDictionaryOpen] = useState(false);
  const [sidebarSettingsOpen, setSidebarSettingsOpen] = useState(false);

  const handleOpenSidebar = useCallback<HandleOpenSidebar>((sidebarName, value) => {
    const setStateAction = (prevState: boolean | undefined) => (value !== undefined ? value : !prevState);

    if (sidebarName === 'dictionary') setSidebarDictionaryOpen(setStateAction);
    if (sidebarName === 'settings') setSidebarSettingsOpen(setStateAction);
  }, []);

  return (
    <div className={styles.layout}>
      <SidebarDictionary isOpen={sidebarDictionaryOpen} handleOpen={handleOpenSidebar} />
      <SidebarSettings isOpen={sidebarSettingsOpen} handleOpen={handleOpenSidebar} />
      <div className={styles.content}>
        <Header handleOpenSidebar={handleOpenSidebar} />
        {children}
      </div>
    </div>
  );
};
export default Layout;
