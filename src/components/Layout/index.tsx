import {FC, useCallback, useMemo, useState} from 'react';

import Header from 'components/Header';
import SidebarDictionary from 'components/SidebarDictionary';
import SidebarSettings from 'components/SidebarSettings';

import {LayoutContainer} from './styles';
import {HandleOpenSidebar, LayoutChildrenProps, Props} from './types';

const Layout: FC<Props> = ({children}) => {
  const [sidebarDictionaryOpen, setSidebarDictionaryOpen] = useState(false);
  const [sidebarSettingsOpen, setSidebarSettingsOpen] = useState(false);

  const childrenProps: LayoutChildrenProps = useMemo(
    () => ({
      isOpenSidebar: sidebarDictionaryOpen || sidebarSettingsOpen,
    }),
    [sidebarDictionaryOpen, sidebarSettingsOpen]
  );

  const handleOpenSidebar = useCallback<HandleOpenSidebar>((sidebarName, value): void => {
    const setStateAction = (prevState: boolean) => (value !== undefined ? value : !prevState);

    if (sidebarName === 'dictionary') setSidebarDictionaryOpen(setStateAction);
    if (sidebarName === 'settings') setSidebarSettingsOpen(setStateAction);
  }, []);

  return (
    <>
      <Header handleOpenSidebar={handleOpenSidebar} />
      <LayoutContainer>{children(childrenProps)}</LayoutContainer>
      <SidebarDictionary isOpen={sidebarDictionaryOpen} handleOpen={handleOpenSidebar} />
      <SidebarSettings isOpen={sidebarSettingsOpen} handleOpen={handleOpenSidebar} />
    </>
  );
};
export default Layout;
