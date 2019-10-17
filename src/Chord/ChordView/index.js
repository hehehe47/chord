import React, { Component } from 'react';

export default class ChordView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chordConfig: {},
      nodesConfig: {}
    };
  }

  render() {
    return (
      <div
        style={{
          margin: '20px',
          height: '200px',
          width: '200px',
          display: 'inline-block',
          borderRadius: '50%',
          border: '1px black solid',
        }}
      />
    );
  }
}
