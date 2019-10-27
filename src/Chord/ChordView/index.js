import React, { Component } from 'react';
import Node from '../Node';

export default class ChordView extends Component {
  render() {
    return (
      <div
        style={{
          padding: '50px',
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
            ? this.props.nodes.map((e, i) => {
                if (this.props.highlight !== null) {
                  if (this.props.highlight.includes(e)) {
                    if (
                      this.props.highlight[this.props.highlight.length - 1] ===
                      e
                    ) {
                      return <Node id={e} key={i} result />;
                    } else {
                      return <Node id={e} key={i} highlight />;
                    }
                  } else {
                    return <Node id={e} key={i} />;
                  }
                } else {
                  return <Node id={e} key={i} />;
                }
              })
            : null}
        </div>
      </div>
    );
  }
}
