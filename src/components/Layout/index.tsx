import React, {FC} from 'react';

import styles from './index.module.css';

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({children, sidebar}) => (
  <div className={styles.layout}>
    {sidebar}
    <div className={styles.content}>{children}</div>
  </div>
);

export default Layout;
