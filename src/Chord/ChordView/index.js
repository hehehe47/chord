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
          margin: '30px',
          height: '600px',
          width: '600px',
          display: 'inline-block',
          borderRadius: '50%',
          border: '5px black solid',
        }}
      />
    );
  }
}
