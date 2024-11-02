const Automaton = require("./Automaton");

class NF_Automaton extends Automaton {
    constructor(states, edges, initialState, acceptStates) {
        super(states, edges, initialState, acceptStates);
        this.type = 'NFA';
    }

    process(input) {
        console.log("NFA Processing  Start");
        console.log("States:", this.states);
        console.log("Initial State:", this.initialState);
        console.log("Accept States:", Array.from(this.acceptStates));
        console.log("Transitions:", this.transitions);
        console.log("Input:", input);

        

        // No path ended in an accepting state
        return { result: false, statePath: [] };
    }

    printNFAutomaton() {
        console.log('NFA Automaton:');
        super.printAutomaton();
    }
}

module.exports = NF_Automaton;