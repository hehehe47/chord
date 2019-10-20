import React, { Component } from 'react';
import Node from '../Node';
import { tsThisType } from '@babel/types';

export default class ChordView extends Component {
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
              height: '100%',
              width: '100%',
              display: 'inline-block',
              borderRadius: '50%',
              position: 'absolute',
              border: '3px solid #6ebdeb',
            }}
          ></div>
          {this.props.nodes !== null
            ? this.props.nodes.map(e =>
                e.id == this.props.highlight ? (
                  <Node id={e.id} key={e.id} highlight />
                ) : (
                  <Node id={e.id} key={e.id} />
                )
              )
            : null}
        </div>
      </div>
    );
  }
}
