/* eslint-disable */
//@ts-nocheck
import { FunctionComponent } from 'react';
import './styles/styles.css';

const LoadingScreen: FunctionComponent<PropTypes> = function ({ opacity }) {
  return (
    <div opacity={opacity ? 'true' : 'false'}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

interface PropTypes {
  opacity?: boolean;
}

LoadingScreen.defaultProps = {
  opacity: false,
};

export default LoadingScreen;
