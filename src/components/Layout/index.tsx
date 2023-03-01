import React from 'react';

import {LayoutProps} from './types';

import styles from './index.module.css';

const Layout: React.FC<LayoutProps> = ({children, sidebar}) => (
  <div className={styles.layout}>
    {sidebar}
    <div className={styles.content}>{children}</div>
  </div>
);

export default Layout;
