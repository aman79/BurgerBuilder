import React, { Component } from 'react';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import Auxx from '../../hoc/Auxx';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    const { showSideDrawer } = this.state;
    return (
      <Auxx>
        <ToolBar />
        <SideDrawer
          open={showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxx>
    );
  }
}

export default Layout;
