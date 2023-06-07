import React from 'react';

export interface Props {
  children: React.ReactNode;
}

export type HandleOpenSidebar = (sidebarName: 'dictionary' | 'settings', value?: boolean) => void;
