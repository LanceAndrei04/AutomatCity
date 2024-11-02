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

        let currentStates = [this.initialState];
        const statePath = [currentStates];
        
        for (const symbol of input) {
            const nextStates = new Set();
            
            for (const state of currentStates) {
                const transitions = this.transitions.get(`${state},${symbol}`) || [];
                transitions.forEach(nextState => nextStates.add(nextState));
            }
            
            currentStates = Array.from(nextStates);
            statePath.push(currentStates);
            
            
            if (currentStates.length === 0) {
                break;
            }
        }

        console.log("statePath:", statePath);
        let result = false;

        for (const state of currentStates) {
            if (this.acceptStates.has(state)) {
                result = true;
                break;
            }
        }
        // No path ended in an accepting state
        return { result, statePath };
    }

    printNFAutomaton() {
        console.log('NFA Automaton:');
        super.printAutomaton();
    }
}

module.exports = NF_Automaton;