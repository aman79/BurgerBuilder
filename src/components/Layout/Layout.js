import React from 'react';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import Auxx from '../../hoc/Auxx';
import classes from './Layout.css';

const Layout = props => (
  <Auxx>
    <ToolBar />
    <main className={classes.Content}>{props.children}</main>
  </Auxx>
);
export default Layout;
