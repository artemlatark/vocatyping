import React from 'react';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {Props} from './types';
import styles from './index.module.css';

const UserProfileHeader: React.FC<Props> = ({user, signOut}) => {
  const {displayName, photoURL} = user;
  const [anchorUserProfileMenu, setAnchorUserProfileMenu] = React.useState<null | HTMLElement>(null);
  const isOpenUserProfileMenu = Boolean(anchorUserProfileMenu);

  const handleOpenUserProfileMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorUserProfileMenu(event.currentTarget);
  };
  const handleCloseUserProfileMenu = () => {
    setAnchorUserProfileMenu(null);
  };

  const handleSignOut = () => {
    signOut();
    handleCloseUserProfileMenu();
  };

  return (
    <>
      <button className={styles.avatar} onClick={handleOpenUserProfileMenu}>
        <Avatar alt={displayName || undefined} src={photoURL || undefined} />
        {isOpenUserProfileMenu ? (
          <ArrowDropUpIcon className={styles.arrow} />
        ) : (
          <ArrowDropDownIcon className={styles.arrow} />
        )}
      </button>

      <Menu
        id="user-profile-header"
        anchorEl={anchorUserProfileMenu}
        open={isOpenUserProfileMenu}
        onClose={handleCloseUserProfileMenu}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </>
  );
};

export default UserProfileHeader;
