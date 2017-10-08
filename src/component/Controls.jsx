
import React from 'react';
import { connect } from 'react-redux';

import { resetTree, forward, toggleInput } from '../action/index';

const mapStateToProps = (state) => ({
  state: state.state,
  target: state.target
});

const mapDispatchToProps = (dispatch) => ({
  showDialog: (e) => {
    e.preventDefault();
    dispatch(toggleInput(true));
  },
  forward: (e) => {
    e.preventDefault();
    dispatch(forward());
  },
  resetTree: (e) => {
    e.preventDefault();
    dispatch(resetTree());
  }
});

let Controls = ({ state, target, showDialog, forward, resetTree }) => (
  <div className="controls">
    <div className="l-content">
      <div className="app-name">20-Questions</div>
      <a className="link" href="#" onClick={ showDialog }>Change Question Tree</a>
      <div>{ 'Target: ' + target.name }</div>
      <div>{ 'State: ' + state }</div>
      <a className="link" href="#" onClick={ forward }>Forward</a>
      &nbsp;&middot;&nbsp;
      <a className="link" href="#" onClick={ resetTree }>Reset</a>
    </div>
  </div>
);

Controls = connect(mapStateToProps, mapDispatchToProps)(Controls);

export default Controls;
