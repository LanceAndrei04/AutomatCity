const Automaton = require("./Automaton");

class DF_Automaton extends Automaton {
    constructor(states, edges, initialState, acceptStates) {
        super(states, edges, initialState, acceptStates);
        this.type = 'DFA';
    }

    validate(alphabet) {
        let isValid = true;
        
        for (const state of this.states.keys()) {
            alphabet.forEach(symbol => {
                const expectedTransitionKey = `${state},${symbol}`;
                if(!this.transitions.has(expectedTransitionKey)) {
                    isValid = false;
                }
            });        
        }

        return isValid;
    }

    process(input) {
        let result = false;
        const statePath = [this.initialState];

        let currentState = this.initialState;


        if (input.length === 0) {
            console.log("EMPTY INPUT: fStates:", this.acceptStates);
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
        console.log("statePath:", statePath);

        return { result, statePath };
    }

    printDFAutomaton() {
        console.log('DFA Automaton:');
        super.printAutomaton();
    }
}

module.exports = DF_Automaton;