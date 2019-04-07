import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './ToolBar.css';
import DrawerToggle from '../SideDrawer/DrawerTogggle/DrawerToggle';

const ToolBar = props => {
  return (
    <header className={classes.ToolBar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default ToolBar;
