
import { defaultData } from '../data/defaults';
import { parseInput, buildTree, buildD3Tree } from '../data/parser';
import { countEntities, bestSubtree, findEntity, trimTree } from '../data/search';
import { getRandomElement } from '../util/random';

import { changeTree } from '../action/index';

const startState = {
  showInput: false,
  errorMessage: null,
  textInput: defaultData,
  entities: null, // list of entities
  tree: null, // question tree
  subtree: null, // current best subtree
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
    subtree: null,
    treeData: buildD3Tree(tree),
    moves: 0,
    state: 'Tree Created',
    target: getRandomElement(entities)
  };
}

function stepForward(state) {
  if (countEntities(state.tree) === 1) {
    // we're done
    return { state: 'Target Found!' };
  }

  if (state.state.indexOf('Next Best Subtree') !== -1) {
    // trim the current tree
    let tree = state.tree;
    if (findEntity(state.subtree, state.target)) {
      tree = state.subtree;
    } else {
      trimTree(state.subtree);
    }
    return {
      tree,
      treeData: buildD3Tree(tree),
      moves: state.moves + 1,
      state: `Tree Trimmed (#${state.moves + 1})`
    };

  } else {
    // find the next best subtree
    const subtree = bestSubtree(state.tree);
    return {
      subtree,
      treeData: buildD3Tree(subtree),
      state: `Next Best Subtree (#${state.moves + 1})`
    };
  }
}

// given a state and an action, return a new state
const reducer = (state = startState, action) => {
  switch (action.type) {

  case 'CHANGE_TREE':
    return Object.assign({}, state, recreateTree(action.input), { showInput: false });

  case 'RESET_TREE':
    return Object.assign({}, state, recreateTree(state.textInput));

  case 'FORWARD':
    return Object.assign({}, state, stepForward(state));

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
