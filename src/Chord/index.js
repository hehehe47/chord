import React from 'react';
import ChordView from './ChordView';
import ChordControl from './ChordControl';

// Constant for the chord system
// EXP for the exponent of 2
// max_num for the max number this chord can hold
const EXP = 7;
const MAX_NUM = 2 ** EXP;


class node {
    // Node id
    id = "";
    // predecessor for each node
    predecessor = "";
    // each node's finger table
    fingerTable = [];
    // the path to find the specified lookup node
    pathList = [];

    // constructor for node class
    // initialize finger table
    constructor(id) {
        this.id = id;
        for (let i = 0; i < EXP; i++) {
            const start = ((parseInt(this.id) + (2 ** i)) % MAX_NUM);
            const end = ((parseInt(this.id) + 2 ** (i + 1)) % MAX_NUM);
            this.fingerTable[i] = new finger(this, start, [start, end]);
        }
    }

    // find node's successor for each key
    find_successor(id) {
        this.pathList = [];
        if (betweenE(id, this.predecessor.id, this.id)) {
            this.pathList = this.pathList.concat(this.id);
            return this
        }
        let n1 = this.find_predecessor(id);
        this.pathList = this.pathList.concat(n1.fingerTable[0].node.id);
        return n1.fingerTable[0].node;
    }

    // find node's predecessor for each key
    find_predecessor(id) {
        if (id === this.id) {
            return this.predecessor;
        }
        let n1 = this;
        while (!betweenE(id, n1.id, n1.fingerTable[0].node.id)) {
            this.pathList = this.pathList.concat(n1.id);
            n1 = n1.closest_preceding_finger(id);
        }
        this.pathList = this.pathList.concat(n1.id);
        return n1;
    }

    // find id in which finger table
    closest_preceding_finger(id) {
        for (let i = EXP - 1; i > -1; i--) {
            if (between(this.fingerTable[i].node.id, this.id, id)) {
                return this.fingerTable[i].node
            }
        }
        return this;
    }

    // function to join a new node to chord
    join(n1) {
        if (n1) {
            this.init_fingerTable(n1);
            this.update_others();
        } else {
            this.predecessor = this;
        }

    }

    // function to remove a new node to chord
    remove() {
        this.fingerTable[0].node.predecessor = this.predecessor;
        this.update_leave_others(this.fingerTable[0].node);
        this.predecessor.fingerTable[0].node = this.fingerTable[0].node;
    }

    // finalize the new node's finger table
    init_fingerTable(n1) {
        this.fingerTable[0].node = n1.find_successor(this.fingerTable[0].start);
        this.predecessor = this.fingerTable[0].node.predecessor;
        this.fingerTable[0].node.predecessor = this;
        this.predecessor.fingerTable[0].node = this;
        for (let i = 0; i < EXP - 1; i++) {
            if (Ebetween(this.fingerTable[i + 1].start, this.id, this.fingerTable[i].node.id)) {
                this.fingerTable[i + 1].node = this.fingerTable[i].node;
            } else {
                this.fingerTable[i + 1].node = n1.find_successor(this.fingerTable[i + 1].start);
            }
        }
    }

    // update other node's finger table according to new node
    update_others() {
        for (let i = 0; i < EXP; i++) {
            let p = this.find_predecessor(decr(this.id, 2 ** (i)));
            if (parseInt(p.fingerTable[0].node.id) === decr(this.id, 2 ** (i))) {
                p = p.fingerTable[0].node
            }
            p.update_finger_table(this, i);
        }
    }

    // using recursion
    update_finger_table(s, i) {
        if (Ebetween(s.id, this.id, this.fingerTable[i].node.id) && parseInt(this.id) !== parseInt(s.id)) {//
            this.fingerTable[i].node = s;
            let p = this.predecessor;
            p.update_finger_table(s, i);
        }
    }

    // update other node's finger table according to leaving node
    update_leave_others(x) {
        for (let i = 0; i < EXP; i++) {
            let p = this.find_predecessor(decr(this.id, 2 ** i));
            if (parseInt(p.fingerTable[0].node.id) === decr(this.id, 2 ** (i))) {
                p = p.fingerTable[0].node
            }
            p.update_leave_finger_table(this, i, x)
        }
    }

    // using recursion
    update_leave_finger_table(s, i, x) {
        if (this.fingerTable[i].node.id === s.id) {
            this.fingerTable[i].node = x;
            let p = this.predecessor;
            p.update_leave_finger_table(s, i, x);
        }
    }

}

// class for each finger in finger table
class finger {
    constructor(node, start, interval) {
        this.node = node;
        this.start = start;
        this.interval = interval;
    }
}

// calculate difference between two values
function decr(value, size) {
    value = parseInt(value);
    size = parseInt(size);
    if (size <= value) {
        return value - size;
    }
    return MAX_NUM - (size - value);
}

// judge whether a value is between init and end on a circle
function between(value, init, end) {
    value = parseInt(value);
    init = parseInt(init);
    end = parseInt(end);
    if (init === end) {
        return true;
    } else if (init > end) {
        return !(init >= value && value > end);
    }
    return (init < value && value < end);

}

// judge whether a value is between init and end or equals to init on a circle
function Ebetween(value, init, end) {
    value = parseInt(value);
    init = parseInt(init);
    end = parseInt(end);
    if (value === init) {
        return true;
    }
    return between(value, init, end);
}

// judge whether a value is between init and end or equals to end on a circle
function betweenE(value, init, end) {
    value = parseInt(value);
    init = parseInt(init);
    end = parseInt(end);
    if (value === end) {
        return true;
    }
    return between(value, init, end);
}

//function to judge whether input is valid
function inputVaildation(state, func) {
    if (state.inputKey === '') {
        alert('please enter a value first');
        return false;
    } else if (!state.nodes.includes(state.inputKey) && func === "leave") {
        alert('Node not in Chord');
        return false;
    } else if (state.inputKey > (MAX_NUM - 1) || state.inputKey < 0) {
        alert('Node invalid! Please enter a node between 0 and ' + MAX_NUM);
        return false;
    } else if (state.nodes.includes(state.inputKey) && func === "add") {
        alert('Existed Node! Please enter another node!');
        return false;
    }
    return true
}

// main class for UI
export default class Chord extends React.Component {
    constructor(props) {
        super(props);
        window.xzp = this;
        this.state = {
            nodes: [],
            capacity: 0,
            inputKey: '',
            highlight: null,
            nodeList: [],
        };
        this.add = this.add.bind(this);
        this.leave = this.leave.bind(this);
        this.lookUp = this.lookUp.bind(this);
        this.onInputKeyChange = this.onInputKeyChange.bind(this);
    }

    componentDidMount() {
    }

    // add button function
    add() {
        this.setState(prevState => {
            if (inputVaildation(prevState, 'add')) {

                const capacity = prevState.capacity + 1;
                let id = prevState.inputKey;
                let nodes = prevState.nodes.concat(id);

                let n = new node(id); // Create new node
                console.log("new node :", n);

                let i = prevState.nodeList[0];
                n.join(i);

                let nodeList = prevState.nodeList.concat(n); // Put node in total node list
                console.log("Append to nodeList :", nodeList);

                return {
                    ...prevState,
                    nodes: nodes,
                    capacity: capacity,
                    nodeList: nodeList,
                };

            }
        });
    }

    // leave button function
    leave() {
        console.log('leave clicked');
        this.setState(prevState => {
            if (inputVaildation(prevState, 'leave')) {
                if (prevState.nodeList.length === 1) {
                    return {
                        ...prevState,
                        nodes: [],
                        nodeList: []
                    };
                }
                console.log(`leaving node ${prevState.inputKey}`);
                let idx = prevState.nodes.indexOf(prevState.inputKey);
                let node_need_to_remove = prevState.nodeList[idx];
                prevState.nodes.splice(idx, 1);
                // console.log(prevState.nodeList)
                prevState.nodeList.splice(idx, 1);
                node_need_to_remove.remove();
                console.log(prevState.nodeList);
                return {
                    ...prevState,
                    nodes: prevState.nodes,
                    nodeList: prevState.nodeList
                };

            }
        });
    }

    // lookup button function
    lookUp() {
        this.setState(prevState => {
            if (inputVaildation(prevState, 'lookup')) {
                console.log(`lookUp clicked, looking up ${this.state.inputKey}`);
                let n = prevState.nodeList[0];
                n.find_successor(this.state.inputKey);
                console.log("Find ", n.pathList);
                return {
                    ...prevState,
                    highlight: n.pathList
                }
            } else {
                return {...prevState};
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
                <ChordView nodes={this.state.nodes} highlight={this.state.highlight}/>
                <ChordControl
                    addHandler={this.add}
                    leaveHandler={this.leave}
                    lookUpHandler={this.lookUp}
                    onInputKeyChange={this.onInputKeyChange}
                />
            </div>
        );
    }
}
