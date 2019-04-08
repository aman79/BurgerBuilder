import React, { Component } from 'react';
import Auxx from '../../../hoc/Auxx/Auxx';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

// const Modal = props => {
//   return (
//     <Auxx>
//       <Backdrop show={props.show} clicked={props.modalClosed} />
//       <div
//         className={classes.Modal}
//         style={{
//           transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
//           opacity: props.show ? '1' : '0'
//         }}
//       >
//         {props.children}
//       </div>
//     </Auxx>
//   );
// };

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate() {
    console.log('[Modal] componentWillUpdate');
  }
  render() {
    return (
      <Auxx>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </Auxx>
    );
  }
}

export default React.memo(Modal);
