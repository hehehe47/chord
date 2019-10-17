import React from 'react';
import ChordView from './ChordView';
import ChordControl from './ChordControl';

export default class Chord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
    this.add = this.add.bind(this);
    this.leave = this.leave.bind(this);
    this.lookUp = this.lookUp.bind(this);
  }

  componentDidMount() {}

  add() {
    console.log('add clicked');
    this.setState(prevState => {
      const nodes = prevState.nodes.concat({
        id: prevState.nodes.length
      })
      return {
        nodes: nodes
      };
    });
  }
  leave() {
    console.log('leave clicked');
    this.setState(prevState => {
      const nodes = prevState.nodes.filter((e, i) => i !== prevState.nodes.length-1);
      return {
        nodes
      };
    });
  }
  lookUp() {
    console.log('lookUp clicked');
  }

  render() {
    console.log(this.state.nodes);
    return (
      <div style={{ textAlign: 'center' }}>
        <ChordView />
        <ChordControl
          addHandler={this.add}
          leaveHandler={this.leave}
          lookUpHandler={this.lookUp}
        />
      </div>
    );
  }
}
