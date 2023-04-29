import React from 'react';

import {Components} from 'react-virtuoso';

import List from '@mui/material/List';

import {ListItemCustom, ListSubheaderCustom} from '../styles';

const MUIComponents: Components = {
  List: React.forwardRef(({style, children}: any, listRef: any) => <List style={{padding: 0, ...style}} component="div" ref={listRef} children={children} />),
  Item: ({children, ...props}: any) => <ListItemCustom component="div" children={children} {...props} />,
  Group: ({children, ...props}: any) => <ListSubheaderCustom component="div" children={children} {...props} />,
};

export default MUIComponents;
