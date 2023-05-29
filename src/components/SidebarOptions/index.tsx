import React from 'react';

import {Typography} from '@mui/material';
import Drawer from '@mui/material/Drawer';

import styles from './index.module.css';
import {SidebarProps} from './types';

const SidebarOptions: React.FC<SidebarProps> = React.memo(({isOpen, handleOpen}) => {
  return (
    <Drawer anchor="right" onClose={() => handleOpen('options')} open={isOpen}>
      <div className={styles.wrapper}>
        <Typography textAlign="center" sx={{mt: 4, mb: 4}}>
          displaying options for tune the app
        </Typography>
      </div>
    </Drawer>
  );
});

export default SidebarOptions;
