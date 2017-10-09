
import React from 'react';
import { connect } from 'react-redux';

import { parseInput } from '../data/parser';
import { changeTree, toggleInput, errorMessage } from '../action/index';

const mapStateToProps = (state) => ({
  showInput: state.showInput,
  textInput: state.textInput,
  errorMessage: state.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
  changeTree: (e) => {
    e.preventDefault();
    const input = document.getElementById('input-textarea').value;
    if (!parseInput(input)) dispatch(errorMessage('Invalid tree data format.'));
    else dispatch(changeTree(input));
  },
  closeDialog: (e) => {
    e.preventDefault();
    dispatch(toggleInput(false));
  }
});

let InputDialog = ({ showInput, textInput, errorMessage, changeTree, closeDialog }) => (
  <div className={ 'dialog ' + (showInput ? 'show' : 'hide') }>
    <div className="l-content dialog-content">
      <div className="dialog-name">Change Question Tree</div>
      <p className="help-text">Enter the new tree data below.
        Refer to the default tree data for the required format.</p>
      <p className={ 'error ' + (errorMessage ? 'show' : 'hide') }>{ errorMessage }</p>
      <textarea id="input-textarea" defaultValue={ textInput } />
      <p>
        <a className="link" href="#" onClick={ changeTree }>Update</a>
        &nbsp;&middot;&nbsp;
        <a className="link" href="#" onClick={ closeDialog }>Cancel</a>
      </p>
    </div>
  </div>
);

InputDialog = connect(mapStateToProps, mapDispatchToProps)(InputDialog);

export default InputDialog;
