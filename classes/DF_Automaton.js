const Automaton = require("./Automaton");

class DF_Automaton extends Automaton {
    constructor(states, edges, initialState, acceptStates, alphabet) {
        super(states, edges, initialState, acceptStates, alphabet);
        this.type = 'DFA';
    }

    process(input) {

        
        
        let result = false;
        const statePath = [this.initialState];
        
        let currentState = this.initialState;
        
        if (!this.validateDFA(this.alphabet)) {
            return { result, statePath };
        }

        if (input.length === 0) {
            return { result: this.acceptStates.has(currentState), statePath: [currentState] };
        }

        for (const symbol of input) {
            const key = `${currentState},${symbol}`;
            const nextState = this.transitions.get(key)[0];

            if (nextState === undefined) {
                result = false; // Transition not found
                break;
            }
            currentState = nextState;
            statePath.push(currentState);
        }

        

        result = this.acceptStates.has(currentState);

        return { result, statePath };
    }

    printDFAutomaton() {
        console.log('DFA Automaton:');
        console.log("Is Valid:", this.validate(this.alphabet));
        super.printAutomaton();
    }
}

module.exports = DF_Automaton;