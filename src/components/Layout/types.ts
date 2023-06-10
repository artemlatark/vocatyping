import React from 'react';

export interface Props {
  children: (props: LayoutChildrenProps) => React.ReactNode;
}

export interface LayoutChildrenProps {
  isOpenSidebar: boolean;
}

export type HandleOpenSidebar = (sidebarName: 'dictionary' | 'settings', value?: boolean) => void;
