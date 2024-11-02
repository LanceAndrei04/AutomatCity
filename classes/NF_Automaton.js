const Automaton = require("./Automaton");

class NF_Automaton extends Automaton {
    constructor(states, edges, initialState, acceptStates, alphabet) {
        super(states, edges, initialState, acceptStates, alphabet);
        this.type = 'NFA';
    }

    process(input) {
        let currentStates = [this.initialState];
        let result = false;
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

        // currentStates is the set of states that the input string ends in
        for (const state of currentStates) {
            if (this.acceptStates.has(state)) {
                result = true;
                break;
            }
        }
 
        return { result, statePath };
    }

    printNFAutomaton() {
        console.log('NFA Automaton:');
        super.printAutomaton();
    }
}

module.exports = NF_Automaton;