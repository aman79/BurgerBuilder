import React from 'react';
import classes from './Logo.css';
import burgerLogo from '../../assests/images/burger-logo.png';

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="MyBURGER" srcset="" />
    </div>
  );
};

export default Logo;
