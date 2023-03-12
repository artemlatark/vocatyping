import React from 'react';

import {Props} from './types';

import styles from './index.module.css';

const Layout: React.FC<Props> = ({children, sidebar}) => (
  <div className={styles.layout}>
    {sidebar}
    <div className={styles.content}>{children}</div>
  </div>
);

export default Layout;
