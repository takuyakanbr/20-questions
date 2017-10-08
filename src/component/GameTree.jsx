
import React from 'react';
import { connect } from 'react-redux';

import Tree from '../react-d3-tree';

const mapStateToProps = (state) => ({
  treeData: state.treeData
});

function nodeCallback(node) {
  console.log(node);
}

const treeStyle = {
  nodes: {
    node: {
      circle: { fill: '#546E7A', strokeWidth: 1.5 }
    },
    leafNode: {
      circle: { fill: '#EFF5FE', strokeWidth: 1.5 }
    }
  }
};

let GameTree = ({ treeData }) => (
  <Tree
    data={ treeData }
    depthFactor={ 70 }
    nodeSize={{ x: 120, y: 120 }}
    onClick={ nodeCallback }
    scaleExtent={{ min: 0.4, max: 1 }}
    styles={ treeStyle }
    textLayout={{ textAnchor: 'start', x: 12, y: -10 }}
    transitionDuration={ 250 }
    translate={{ x: document.body.clientWidth / 2, y: 50 }}
  />
);

GameTree = connect(mapStateToProps, null)(GameTree);

export default GameTree;