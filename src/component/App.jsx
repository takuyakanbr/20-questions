
import React from 'react';

import GameTree from './GameTree';
import Controls from './Controls';
import InputDialog from './InputDialog';

const App = () => (
  <div className="l-app">

    <GameTree/>
    <Controls/>
    <InputDialog/>

    <footer>
      <div className="l-content">
        <span>&copy; 2017 Daniel Teo</span>&nbsp;&middot;&nbsp;
        <a className="link"
          href="https://github.com/takuyakanbr/20-questions"
          target="_blank"
          rel='noreferrer noopener'>github</a>
      </div>
    </footer>

  </div>
);

export default App;
