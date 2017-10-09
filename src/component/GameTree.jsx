
import React from 'react';
import { connect } from 'react-redux';

import Tree from '../react-d3-tree';

const mapStateToProps = (state) => ({
  treeData: state.treeData
});

let GameTree = ({ treeData }) => (
  <Tree
    data={ treeData }
    depthFactor={ 55 }
    nodeSize={{ x: 145, y: 145 }}
    scaleExtent={{ min: 0.2, max: 1 }}
    textLayout={{ textAnchor: 'start', x: 12, y: -10 }}
    transitionDuration={ 250 }
    translate={{ x: document.body.clientWidth / 2, y: 50 }}
  />
);

GameTree = connect(mapStateToProps, null)(GameTree);

export default GameTree;
