import React from 'react';

export interface Props {
  children: React.ReactNode;
}

export type HandleOpenSidebar = (sidebarName: 'dictionary' | 'options', value?: boolean) => void;
