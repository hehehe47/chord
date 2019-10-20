import React from 'react';
import ChordView from './ChordView';
import ChordControl from './ChordControl';

export default class Chord extends React.Component {
  constructor(props) {
    super(props);
    window.xzp = this;
    this.state = {
      nodes: [],
      capacity: 0,
      inputKey: '',
      highlight: null,
    };
    this.add = this.add.bind(this);
    this.leave = this.leave.bind(this);
    this.lookUp = this.lookUp.bind(this);
    this.onInputKeyChange = this.onInputKeyChange.bind(this);
  }

  componentDidMount() {}

  add() {
    console.log('add clicked');
    this.setState(prevState => {
      if (prevState.inputKey === '') {
        console.log('enter a node first');
        return {...prevState};
      } else {
        console.log(`adding node ${prevState.inputKey}`);
        // TODO: add algorithm
        return {
          ...prevState,
          nodes: [],
        };
      }
    });
  }
  leave() {
    console.log('leave clicked');
    this.setState(prevState => {
      if (prevState.inputKey === '') {
        console.log('enter a node first');
        return {...prevState};
      } else {
        console.log(`adding node ${prevState.inputKey}`);
        // TODO: leave algorithm
        return {
          ...prevState,
          nodes: [],
        };
      }
    });
  }
  lookUp() {
    if (this.state.inputKey === '') {
      console.log('please enter a lookup first');
    } else {
      console.log(`lookUp clicked, looking up ${this.state.inputKey}`);
      // TODO: look up algorithm
      this.setState({
        highlight: null
      })
    }
  }

  onInputKeyChange(event) {
    this.setState({
      inputKey: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <ChordView nodes={null} highlight={null} />
        <ChordControl
          addHandler={this.add}
          leaveHandler={this.leave}
          lookUpHandler={this.lookUp}
          //inputKey={this.state.inputKey}
          onInputKeyChange={this.onInputKeyChange}
        />
      </div>
    );
  }
}
