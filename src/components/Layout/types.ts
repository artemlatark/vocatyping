import React from 'react';
import {Props as HeaderProps} from 'components/Header/types';
import {Props as SidebarProps} from 'components/Sidebar/types';

export interface Props extends HeaderProps, SidebarProps {
  children: React.ReactNode;
}
