import React, {useCallback, useState} from 'react';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

import styles from './index.module.css';
import {Props} from './types';

const Layout: React.FC<Props> = ({children}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = useCallback((value?: boolean) => {
    setSidebarOpen((prevState) => {
      return value !== undefined ? value : !prevState;
    });
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar sidebarOpen={sidebarOpen} handleOpenSidebar={handleOpenSidebar} />
      <div className={styles.content}>
        <Header handleOpenSidebar={handleOpenSidebar} />
        {children}
      </div>
    </div>
  );
};
export default Layout;
