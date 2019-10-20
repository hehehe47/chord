import React, { Component } from 'react';
import Node from '../Node';

export default class ChordView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chordConfig: {},
      nodesConfig: {
        highligth: null,
        existingNodes: [32, 40, 52, 60, 70, 79, 80, 85, 102, 113],
      },
    };
  }

  render() {
    return (
      <div
        style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            height: '550px',
            width: '550px',
            display: 'inline-block',
            position: 'relative',
          }}
        >
          <div
            style={{
              boxSizing: 'border-box',
              height: '100%',
              width: '100%',
              display: 'inline-block',
              borderRadius: '50%',
              position: 'absolute',
              border: '3px solid #6ebdeb',
            }}
          ></div>
          {this.state.nodesConfig.existingNodes.map(e => (
            <Node id={e} key={e} />
          ))}
        </div>
      </div>
    );
  }
}
