import React from 'react';
import ChordView from './ChordView';
import ChordControl from './ChordControl';

const EXP = 7;
const MAX_NUM = 2 ** 7;


class node {
    id = -1;
    successor = "";
    predecessor = "";
    fingerTable = [];

    constructor(id) {
        this.id = id;
    }

    find_successor(id) {
        let n1 = this.find_predecessor(id);
        return n1.successor;
    }

    find_predecessor(id) {
        let n1 = this;
        while (id > n1.id && id <= n1.successor.id) {
            // while (false) {
            n1 = n1.closest_preceding_finger(id)
        }
        return n1;
    }

    closest_preceding_finger(id) {
        for (let i = EXP - 1; i >= 0; i--) {
            if (this.id < this.fingerTable[i].node.id && this.fingerTable[i].node.id < id) {
                return this.fingerTable[i].node
            }
        }
        return this;
    }

    join(n1) {
        // initialize fingerTable
        for (let i = 0; i < EXP; i++) {
            const start = parseInt(this.id) + (2 ** i) % MAX_NUM;
            const end = parseInt(this.id) + 2 ** (i + 1) % MAX_NUM;
            this.fingerTable[i] = new finger(this, start, [start, end]);
            // this.fingerTable[i].node = this;
        }
        if (n1) {
            this.init_fingerTable(n1);
            this.update_others();
        } else {
            this.predecessor = this;
        }

    }


    init_fingerTable(n1) {
        this.fingerTable[0].node = n1.find_successor(this.fingerTable[0].start);
        this.successor = this.fingerTable[0].node;
        this.predecessor = this.successor.predecessor;
        this.successor.predecessor = this;
        for (let i = 0; i < EXP - 1; i++) {
            if (this.id <= this.fingerTable[i + 1].start && this.fingerTable[i + 1].start < this.fingerTable[i].node.id) {
                this.fingerTable[i + 1].node = this.fingerTable[i].node;
            } else {
                this.fingerTable[i + 1].node = n1.find_successor(this.fingerTable[i + 1].start);
            }
        }
    }

    update_others() {
        for (let i = 0; i < EXP; i++) {
            let p = this.find_predecessor(this.id - 2 ** (i));
            p.update_finger_table(this, i);
        }
    }

    update_finger_table(s, i) {
        if (this.id <= s.id && s.id < this.fingerTable[i].node.id) {
            this.fingerTable[i].node = s;
            let p = this.predecessor;
            p.update_finger_table(s, i);
        }
    }

}

// function find_predecessor(n, id) {
//     let n1 = find_successor(n, id);
//     return n1.successor;
// }
//
// function find_successor(n, id) {
//     let n1 = n;
//     while (id <= n1.id || id > n1.successor) {
//         n1 = closest_preceding_finger(n1, id)
//     }
//     return n1;
// }
//
// function closest_preceding_finger(n, id) {
//     for (let i = EXP - 1; i >= 0; i--) {
//         if (n.fingerTable[i].node.id > n.id && n.fingerTable[i].node.id < id) {
//             return finger[i].node
//         }
//     }
//     return n;
// }

// function join(n, n1) {
//     if (n1 !== "0") {
//         init_fingerTable(n, n1);
//         update_others();
//     } else {
//         // initialize fingerTable
//         for (let i = 0; i < EXP; i++) {
//             const start = parseInt(n.id) + (2 ** i) % MAX_NUM;
//             const end = parseInt(n.id) + 2 ** (i + 1) % MAX_NUM;
//             n.fingerTable[i] = new finger(n, start, [start, end]);
//         }
//         n.predecessor = n;
//     }
// }

// function init_fingerTable(n, n1) {
//     n.fingerTable[0].node = find_successor(n1, n.fingerTable[0].start);
//     n.predecessor = n.successor.predecessor;
//     n.successor.predecessor = n;
//     for (let i = 0; i < EXP - 1; i++) {
//         if (n.fingerTable[i + 1].start > n.id && n.fingerTable[i + 1].start < n.fingerTable[i].node.id) {
//             n.fingerTable[i + 1].node = n.fingerTable[i].node;
//         } else {
//             n.fingerTable[i + 1].node = find_successor(n1, n.fingerTable[i + 1].start);
//         }
//     }
// }
//
// function update_others(n) {
//     for (let i = 0; i < EXP; i++) {
//         let p = find_predecessor(n, n.id - 2 ** (i));
//         update_finger_table(p, n, i);
//     }
// }
//
// function update_finger_table(n, s, i) {
//     if (s.id >= n.id && s.id < n.fingerTable[i].node.id) {
//         n.fingerTable[i].node = s;
//         let p = n.predecessor;
//         update_finger_table(p, s, i);
//     }
// }

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
                // console.log('Enter a node first');
                alert('Enter a node first');
                return {...prevState};
            } else if (prevState.inputKey in prevState.nodes) {
                // TODO: duplicated input [1,1,2,3]
                alert('Existed Node! Please enter another node!')
            } else if (prevState.inputKey > 2 ** EXP || prevState.inputKey < 0) {
                alert('Node invalid! Please enter a node between 0 and ' + 2 ** EXP)
            } else {
                // console.log(`adding node ${prevState.inputKey}`);

                const capacity = prevState.capacity + 1;
                let id = prevState.inputKey;
                let nodes = prevState.nodes.concat(id);

                let n = new node(id); // Create new node
                console.log("new node :", n);


                if (prevState.nodeList.length === 0) {
                    n.join("");
                    n.successor = n;
                } else {
                    for (let i of prevState.nodeList) {
                        n.join(i);
                    }
                }
                let nodeList = prevState.nodeList.concat(n); // Put node in total node list


                console.log("Append to nodeList :", nodeList);

                // console.log(n);
                // console.log(nodes);
                // console.log("Final nodeList :", nodeList);

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
                // TODO: look up algorithm
                // var n;
                // var start = prevState.nodes[0].fingerTable[0][0];
                // var end = prevState.nodes[0].fingerTable[0][1];

                // while (){
                //
                // }
                // for (n of prevState.nodes) {
                //
                // }

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
