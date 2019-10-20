import React from 'react';
import ChordView from './ChordView';
import ChordControl from './ChordControl';



export default class Chord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [], // 所有的nodes
      capacity: 0, //
      lookUpKey: '', // string
    };
    this.add = this.add.bind(this);
    this.leave = this.leave.bind(this);
    this.lookUp = this.lookUp.bind(this);
    this.onLookUpKeyChange = this.onLookUpKeyChange.bind(this);
  }

  componentDidMount() {}

  add() {
    console.log('add clicked');
    this.setState(prevState => {
      // const nodes = prevState.nodes.concat({
      //   id: prevState.nodes.length,
      // });
      return {
        nodes: [],
      };
    });
  }
  leave() {
    console.log('leave clicked');
    this.setState(prevState => {
      // const nodes = prevState.nodes.filter(
      //   (e, i) => i !== prevState.nodes.length - 1
      // );
      return {
        nodes: [],
      };
    });
  }
  lookUp() {
    if (this.state.lookUpKey === '') {
      console.log('please enter a key first');
    } else {
      console.log(`lookUp clicked, looking up ${this.state.lookUpKey}`);
    }
  }

  onLookUpKeyChange(event) {
    this.setState({
      lookUpKey: event.target.value,
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <ChordView />
        <ChordControl
          addHandler={this.add}
          leaveHandler={this.leave}
          lookUpHandler={this.lookUp}
          lookUpKey={this.state.lookUpKey}
          onLookUpKeyChange={this.onLookUpKeyChange}
        />
      </div>
    );
  }
}
