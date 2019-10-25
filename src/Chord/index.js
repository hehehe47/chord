import React from 'react';
import ChordView from './ChordView';
import ChordControl from './ChordControl';

const EXP = 7;
const MAX_NUM = 2 ** EXP;

//https://github.com/pedrotgn/python-p2p/blob/master/chord/chord.py
function decr(value, size) {
    value = parseInt(value);
    size = parseInt(size);
    if (size <= value) {
        return value - size;
    }
    return MAX_NUM - (size - value);
}

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

function Ebetween(value, init, end) {
    value = parseInt(value);
    init = parseInt(init);
    end = parseInt(end);
    if (value === init) {
        return true;
    }
    return between(value, init, end);
}

function betweenE(value, init, end) {
    value = parseInt(value);
    init = parseInt(init);
    end = parseInt(end);
    if (value === end) {
        return true;
    }
    return between(value, init, end);
}

class node {
    id = "";
    predecessor = "";
    fingerTable = [];
    pathList = [];

    constructor(id) {
        this.id = id;
        for (let i = 0; i < EXP; i++) {
            const start = ((parseInt(this.id) + (2 ** i)) % MAX_NUM);
            const end = ((parseInt(this.id) + 2 ** (i + 1)) % MAX_NUM);
            this.fingerTable[i] = new finger(this, start, [start, end]);
        }
    }


    find_successor(id) {
        this.pathList = [];
        if (betweenE(id, this.predecessor.id, this.id)) {
            return this
        }
        let n1 = this.find_predecessor(id);
        this.pathList = this.pathList.concat(n1.fingerTable[0].node.id);
        return n1.fingerTable[0].node;
    }

    find_predecessor(id) {
        if (id === this.id) {
            return this.predecessor;
        }
        let n1 = this;
        while (!betweenE(id, n1.id, n1.fingerTable[0].node.id)) {
            this.pathList = this.pathList.concat(n1.id);
            n1 = n1.closest_preceding_finger(id)
        }
        return n1;
    }

    closest_preceding_finger(id) {
        for (let i = EXP - 1; i > -1; i--) {
            if (between(this.fingerTable[i].node.id, this.id, id)) {
                return this.fingerTable[i].node
            }
        }
        return this;
    }


    join(n1) {
        if (n1) {
            this.init_fingerTable(n1);
            this.update_others();
        } else {
            this.predecessor = this;
        }

    }


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

    update_others() {
        for (let i = 0; i < EXP; i++) {
            let p = this.find_predecessor(decr(this.id, 2 ** (i)));
            if (parseInt(p.fingerTable[0].node.id) === decr(this.id, 2 ** (i))) {
                p = p.fingerTable[0].node
            }
            p.update_finger_table(this, i);
        }
    }

    update_finger_table(s, i) {
        if (Ebetween(s.id, this.id, this.fingerTable[i].node.id) && parseInt(this.id) !== parseInt(s.id)) {//
            this.fingerTable[i].node = s;
            let p = this.predecessor;
            p.update_finger_table(s, i);
        }
    }

}

class finger {
    constructor(node, start, interval) {
        this.node = node;
        this.start = start;
        this.interval = interval;
    }
}


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


    add() {
        this.setState(prevState => {
            if (prevState.inputKey === '') {
                console.log('Enter a node first');
                return {...prevState};
            } else if (prevState.nodes.includes(prevState.inputKey)) {
                // TODO: duplicated input [1,1,2,3]
                console.log('Existed Node! Please enter another node!')
            } else if (prevState.inputKey > 2 ** EXP || prevState.inputKey < 0) {
                console.log('Node invalid! Please enter a node between 0 and ' + 2 ** EXP)
            } else {
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
                let n = prevState.nodeList[0];
                n.find_successor(this.state.inputKey);
                console.log("Find ", n.pathList);


                this.setState({
                    highlight: n.pathList
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
                <ChordView nodes={this.state.nodes} highlight={null}/>
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
