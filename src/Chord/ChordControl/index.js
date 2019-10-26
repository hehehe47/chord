import React, { Component } from 'react';
import './index.css';

export default class ChordControl extends Component {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: "center"}} className="controls">
        <button onClick={this.props.addHandler}>add</button>
        <button onClick={this.props.leaveHandler}>leave</button>
        <button onClick={this.props.lookUpHandler}>look up</button>
        <input
          type='text'
          placeholder='key'
          value={this.props.inputKey}
          onChange={this.props.onInputKeyChange}
        />
      </div>
    );
  }
}
