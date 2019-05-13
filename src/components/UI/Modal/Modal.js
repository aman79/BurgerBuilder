import React, { memo } from 'react';
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

const Modal = props => {
	// shouldComponentUpdate(nextProps, nextState) {
	//   return (
	//   nextProps.show !== this.props.show ||
	//   nextProps.children !== this.props.children
	// );
	// }

	// componentWillUpdate() {
	//   console.log('[Modal] componentWillUpdate');
	// }

	return (
		<Auxx>
			<Backdrop show={props.show} clicked={props.modalClosed} />
			<div
				className={classes.Modal}
				style={{
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0'
				}}
			>
				{props.children}
			</div>
		</Auxx>
	);
};

export default memo(
	Modal,
	(prevProps, nextProps) =>
		nextProps.show === prevProps.show &&
		nextProps.children === prevProps.children
);
