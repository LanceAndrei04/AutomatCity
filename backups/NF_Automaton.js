const Automaton = require("./Automaton");

class NF_Automaton extends Automaton {
    constructor(states, edges, initialState, acceptStates) {
        super(states, edges, initialState, acceptStates);
        this.type = 'NFA';
    }

    process(input) {
        let currentStates = new Set([this.initialState]);
        let result = false;
        const statePath = [Array.from(currentStates)];

        console.log("NFA Processing Start");
        console.log("Initial State:", this.initialState);
        console.log("Accept States:", Array.from(this.acceptStates));
        console.log("Input:", input);

        // Process each input symbol
        for (const symbol of input) {
            const nextStates = new Set();
            console.log(`\nProcessing symbol: ${symbol}`);
            console.log("Current states:", Array.from(currentStates));

            // For each current state, find all possible next states
            for (const state of currentStates) {
                const key = `${state},${symbol}`;
                const transitions = this.transitions.get(key);
                console.log(`Looking for transitions with key: ${key}`, transitions);
                
                if (transitions) {
                    for (const nextState of transitions) {
                        nextStates.add(nextState);
                        console.log(`Added transition to state: ${nextState}`);
                    }
                }
            }

            // Check if we have any valid transitions
            if (nextStates.size === 0) {
                console.log("No valid transitions found - rejecting");
                result = false;
                break;
            }

            currentStates = nextStates;
            statePath.push(Array.from(currentStates));
            console.log("Next states:", Array.from(nextStates));
        }

        // Only check accept states if we haven't already rejected
        if (currentStates.size > 0) {
            // Check if any current state is an accept state
            for (const state of currentStates) {
                if (this.acceptStates.has(state)) {
                    result = true;
                    console.log(`Found accepting state: ${state}`);
                    break;
                }
            }
        }

        console.log("Final result:", result);
        console.log("State path:", statePath);

        return { 
            result, 
            statePath,
        };
    }

    printDFAutomaton() {
        console.log('DFA Automaton:');
        super.printAutomaton();
    }
}

module.exports = NF_Automaton;