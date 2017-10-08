
// changes the question tree used for visualization, given the input text
export const changeTree = (input) => ({
  input,
  type: 'CHANGE_TREE'
});

// returns current tree to its initial state
export const resetTree = () => ({
  type: 'RESET_TREE'
});

// step forward to the next state of the game simulation
export const forward = () => ({
  type: 'FORWARD'
});

// change the visibility of the input dialog
export const toggleInput = (show) => ({
  show,
  type: 'TOGGLE_INPUT'
});

// update the error message
export const errorMessage = (msg) => ({
  msg,
  type: 'ERROR_MESSAGE'
});
