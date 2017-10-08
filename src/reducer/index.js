
import { defaultData } from '../data/defaults';
import { parseInput, buildTree, buildD3Tree } from '../data/parser';
import { getRandomElement } from '../util/random';

import { changeTree } from '../action/index';

const startState = {
  showInput: false,
  errorMessage: null,
  textInput: defaultData,
  entities: null, // list of entities
  tree: null, // question tree
  treeData: [], // d3 rendering tree
  moves: 0,
  state: 'None',
  target: null
};

function recreateTree(textInput) {
  const entities = parseInput(textInput);
  const tree = buildTree(entities);
  return {
    errorMessage: null,
    entities,
    textInput,
    tree,
    treeData: buildD3Tree(tree),
    moves: 0,
    state: 'Tree Created',
    target: getRandomElement(entities)
  };
}

// given a state and an action, return a new state
const reducer = (state = startState, action) => {
  switch (action.type) {

  case 'CHANGE_TREE':
    return Object.assign({}, state, recreateTree(action.input), { showInput: false });

  case 'RESET_TREE':
    return Object.assign({}, state, recreateTree(state.textInput));

  case 'FORWARD':
    return state;

  case 'TOGGLE_INPUT':
    return Object.assign({}, state, {
      showInput: action.show
    });

  case 'ERROR_MESSAGE':
    return Object.assign({}, state, {
      errorMessage: action.msg
    });

  default:
    return state;
  }
};


// initializes default state
export const initialize = (dispatch) => {
  dispatch(changeTree(defaultData));
};

export default reducer;
