import React, { Component } from 'react';

let highlightColor = "#fa2d6e";
let resultColor = "#b715ed";
let normalColor = "#33f561";

export default class index extends Component {
  calculateXY = degree => {
    let x = 275 * Math.cos(((90 - degree) * Math.PI) / 180) + 260;
    let y = 275 * Math.sin(((90 - degree) * Math.PI) / 180) + 260;
    return { x, y };
  };

  render() {
    let { x, y } = this.calculateXY(this.props.id * 360 / 128);
    let backgroundColor = normalColor;
    if(this.props.highlight){
      backgroundColor = highlightColor;
    }else if(this.props.result){
      backgroundColor = resultColor;
    }

    return (
      <div
        style={{
          display: 'inline-block',
          height: '30px',
          width: '30px',
          position: 'absolute',
          zIndex: '100',
          left: x,
          bottom: y,
          borderRadius: '50%',
          border: "1px solid #201b30",
          backgroundColor: backgroundColor
        }}
      >{`N${this.props.id}`}</div>
    );
  }
}
