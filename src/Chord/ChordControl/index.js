import React, { Component } from 'react';

export default class ChordControl extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.addHandler}>add</button>
        <button onClick={this.props.leaveHandler}>leave</button>
        <button onClick={this.props.lookUpHandler}>look up</button>
        <input
          type='text'
          placeholder='key'
          value={this.props.lookUpKey}
          onChange={this.props.onLookUpKeyChange}
        />
      </div>
    );
  }
}
