import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './ToolBar.css';

const ToolBar = props => {
  return (
    <header className={classes.ToolBar}>
      <div>MENU</div>
      <Logo />

      <nav>
        <ul>....</ul>
      </nav>
    </header>
  );
};

export default ToolBar;
