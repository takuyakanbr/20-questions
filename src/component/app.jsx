
import React from 'react';
import { connect } from 'react-redux';

import Tree from 'react-d3-tree';

const mapStateToProps = (state) => ({
  treeData: state.treeData
});

function nodeCallback(node) {
  console.log(node);
}

const treeStyle = {
  nodes: {
    node: {
      circle: { fill: '#546E7A' }
    },
    leafNode: {
      circle: { fill: '#EFF5FE' }
    }
  }
};

let App = ({ treeData }) => (
  <div className="l-app">
    <Tree data={ treeData } orientation="vertical" pathFunc="straight" nodeSize={{ x: 110, y: 110 }}
      depthFactor={90} scaleExtent={{ min: 0.4, max: 1 }} transitionDuration={300}
      translate={{ x: document.body.clientWidth / 2, y: 50 }} styles={treeStyle} onClick={nodeCallback} />

    <footer>
      <div className="l-content">
        <div>20-Questions</div>
        <span>&copy; 2017 Daniel Teo</span>&nbsp;
        <a className="link float"
          href="https://github.com/takuyakanbr/20-questions"
          target="_blank"
          rel='noreferrer noopener'>View on Github</a>
      </div>
    </footer>
  </div>
);

App = connect(mapStateToProps, null)(App);

export default App;
