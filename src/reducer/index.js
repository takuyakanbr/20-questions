
import { defaultData } from '../data/defaults';
import { parseInput, buildTree, buildD3Tree } from '../data/parser';
import { resetTree } from '../action/index';

const startState = {
  tree: null, // question tree, for internal use
  treeData: null // used for rendering
};

// given a state and an action, return a new state
const reducer = (state = startState, action) => {
  switch (action.type) {

  case 'RESET_TREE':
    return Object.assign({}, state, {
      tree: action.tree,
      treeData: buildD3Tree(action.tree)
    });

  default:
    return state;
  }
};


export const initialize = (dispatch) => {
  // initialize default state
  const entities = parseInput(defaultData);
  const tree = buildTree(entities);
  const treeData = buildD3Tree(tree);
  startState.tree = tree;
  startState.treeData = treeData;
};

export default reducer;
