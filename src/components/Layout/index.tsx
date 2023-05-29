import React, {useCallback, useState} from 'react';

import Header from 'components/Header';
import SidebarDictionary from 'components/SidebarDictionary';
/*
 TODO: #69 return when one of the functions for tune the app will be implemented
 import SidebarOptions from 'components/SidebarOptions';
*/

import styles from './index.module.css';
import {HandleOpenSidebar, Props} from './types';

const Layout: React.FC<Props> = ({children}) => {
  const [sidebarDictionaryOpen, setSidebarDictionaryOpen] = useState(false);
  /*
   TODO: #69 return when one of the functions for tune the app will be implemented
   const [sidebarOptionsOpen, setSidebarOptionsOpen] = useState(false);
  */

  const handleOpenSidebar = useCallback<HandleOpenSidebar>((sidebarName, value) => {
    const setStateAction = (prevState: boolean | undefined) => (value !== undefined ? value : !prevState);

    if (sidebarName === 'dictionary') setSidebarDictionaryOpen(setStateAction);
    /*
     TODO: #69 return when one of the functions for tune the app will be implemented
     if (sidebarName === 'options') setSidebarOptionsOpen(setStateAction);
    */
  }, []);

  return (
    <div className={styles.layout}>
      <SidebarDictionary isOpen={sidebarDictionaryOpen} handleOpen={handleOpenSidebar} />
      {/*
        TODO: #69 return when one of the functions for tune the app will be implemented
        <SidebarOptions isOpen={sidebarOptionsOpen} handleOpen={handleOpenSidebar} />
      */}
      <div className={styles.content}>
        <Header handleOpenSidebar={handleOpenSidebar} />
        {children}
      </div>
    </div>
  );
};
export default Layout;
