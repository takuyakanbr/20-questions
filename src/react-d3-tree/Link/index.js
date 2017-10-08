import React from 'react';
import PropTypes from 'prop-types';
import { svg, select } from 'd3';

import './style.css';

// modified to assume vertical orientation and straight pathFunc
export default class Link extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initialStyle: {
        opacity: 0,
      },
    };
  }

  componentDidMount() {
    this.applyOpacity(1);
  }

  componentWillLeave(done) {
    this.applyOpacity(0, done);
  }

  applyOpacity(opacity, done = () => {}) {
    const { transitionDuration } = this.props;

    select(this.link)
      .transition()
      .duration(transitionDuration)
      .style('opacity', opacity)
      .each('end', done);
  }

  straightPath(linkData) {
    const straight = svg
      .line()
      .interpolate('basis')
      .x(d => d.x)
      .y(d => d.y);

    let data = [
      { x: linkData.source.x, y: linkData.source.y },
      { x: linkData.target.x, y: linkData.target.y },
    ];

    return straight(data);
  }

  drawPath() {
    const { linkData } = this.props;
    return this.straightPath(linkData);
  }

  render() {
    const { styles } = this.props;
    return (
      <path
        ref={l => {
          this.link = l;
        }}
        style={{ ...this.state.initialStyle, ...styles }}
        className="linkBase"
        d={this.drawPath()}
      />
    );
  }
}

Link.defaultProps = {
  styles: {},
};

Link.propTypes = {
  linkData: PropTypes.object.isRequired,
  transitionDuration: PropTypes.number.isRequired,
  styles: PropTypes.object,
};
