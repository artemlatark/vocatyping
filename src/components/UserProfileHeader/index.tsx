import React, {useState} from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import styles from './index.module.css';
import {Props} from './types';

const UserProfileHeader: React.FC<Props> = ({user, signOut}) => {
  const {displayName, photoURL} = user;
  const [anchorUserProfileMenu, setAnchorUserProfileMenu] = useState<null | HTMLElement>(null);
  const isOpenUserProfileMenu = Boolean(anchorUserProfileMenu);

  const handleOpenUserProfileMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorUserProfileMenu(event.currentTarget);
  };

  const handleCloseUserProfileMenu = (): void => {
    setAnchorUserProfileMenu(null);
  };

  const handleSignOut = async (): Promise<void> => {
    await signOut();
    handleCloseUserProfileMenu();
  };

  return (
    <>
      <button className={styles.avatar} onClick={handleOpenUserProfileMenu}>
        <Avatar alt={displayName ?? undefined} src={photoURL ?? undefined} />
        {isOpenUserProfileMenu ? <ArrowDropUpIcon color="primary" /> : <ArrowDropDownIcon color="primary" />}
      </button>

      <Menu
        id="user-profile-header"
        anchorEl={anchorUserProfileMenu}
        open={isOpenUserProfileMenu}
        onClose={handleCloseUserProfileMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </>
  );
};

export default UserProfileHeader;
