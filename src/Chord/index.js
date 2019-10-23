import React from 'react';
import ChordView from './ChordView';
import ChordControl from './ChordControl';


const m = 7;
const maxRange = 5;

class node {
    id = 0;
    finger_table = [];
    predecessor = 0;
    successor = 0;
    value = 0;
}

function updateFinger(nodes) {
    var n;
    // TODO: how to create finger tables
    // TODO: how to update finger tables
    // for (n of nodes){
    //     n.finger_table
    // }

    return nodes;
}

function addNode(prev, node) {
    if (prev.length === 0) {
        return updateFinger(prev.concat({node: node}));
    } else {
        // var i;
        // for (i of prev) {
        //     if (i.id >= node.id) {
        //          //TODO : how to sort array
        //     }
        // }
        return updateFinger(prev.concat({node: node}));
    }
}

var maxList = [];


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

    componentDidMount() {
    }


    add() {
        console.log('add clicked');
        this.setState(prevState => {
            if (prevState.inputKey === '') {
                console.log('enter a node first');
                return {...prevState};
            } else {
                console.log(`adding node ${prevState.inputKey}`);
                // TODO: duplicated input
                // if (prevState.inputKey in maxList) {
                //     alert('Please input another number');
                //     this.add();
                // }

                let node_num = Math.floor(prevState.inputKey % 128);

                let new_node = new node();
                new_node.id = node_num;
                new_node.value = prevState.inputKey;
                // maxList[maxList.length] = node_num;
                // console.log(maxList);
                const nodes = addNode(prevState.nodes, new_node);
                console.log(nodes);

                const capacity = prevState.capacity + 1;

                return {
                    ...prevState,
                    nodes: nodes,
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
        this.setState(prevState => {
            if (this.state.inputKey === '') {
                console.log('please enter a lookup first');
            } else {
                console.log(`lookUp clicked, looking up ${this.state.inputKey}`);
                // TODO: look up algorithm
                var n;
                var start = prevState.nodes[0].finger_table[0][0];
                var end = prevState.nodes[0].finger_table[0][1];

                // while (){
                //
                // }
                for (n of prevState.nodes) {

                }

                this.setState({
                    highlight: null
                })
            }
        })

    }

    onInputKeyChange(event) {
        this.setState({
            inputKey: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <ChordView nodes={null} highlight={null}/>
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
