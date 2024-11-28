class Automaton {
  constructor(states, edges, initialState, acceptStates, alphabet) {
    this.states = states;         // Map of states
    this.transitions = edges;     // Map of transitions
    this.initialState = initialState;
    this.acceptStates = acceptStates;    // Set of accepting states
    this.alphabet = alphabet;
  }

  static parseAutomaton(nodes, edges) {
      const states = new Map();
      const acceptStates = new Set();
      let initialState = null;

      for (const node of nodes) {
          states.set(node.id, node.data.isFinalState);
          if (node.data.isFinalState == "true") {
              acceptStates.add(node.id);
          }
          if (node.data.isInitialState == "true") {
            initialState = node.id;
        }
      }

      const transitions = new Map();
      
      // Process each edge
      for (const edge of edges) {
          const key = `${edge.source},${edge.data.label}`;
          
          // If this transition already exists, add to the array of targets
          if (transitions.has(key)) {
              transitions.get(key).push(edge.target);
          } else {
              // Create new array with first target
              transitions.set(key, [edge.target]);
          }
      }

      const alphabet = new Set();
      for (const edge of edges) {
          alphabet.add(edge.data.label);  
      }

      return { states, transitions, initialState, acceptStates, alphabet };
  }

  validateDFA() {
    let isValid = true;
    
    for (const state of this.states.keys()) {
        this.alphabet.forEach(symbol => {
            const expectedTransitionKey = `${state},${symbol}`;
            if(!this.transitions.has(expectedTransitionKey)) {
                isValid = false;
            }
            else {
                const expectedTransitions = this.transitions.get(expectedTransitionKey);
                if (expectedTransitions.length !== 1) {
                    isValid = false;
                }
            }
        });        
    }

    return isValid;
}

  // Process an input string
  process(input) {
    throw new Error('Method not implemented.');
  }

  // Print automaton details
  printAutomaton() {
    console.log('States:', Array.from(this.states.keys()));
    console.log('Alphabet:', this.alphabet);
    console.log('Initial State:', this.initialState);
    console.log('Accept States:', Array.from(this.acceptStates));
    console.log('Transitions:');
    this.transitions.forEach((toState, key) => {
      const [fromState, symbol] = key.split(',');
      console.log(`  ${fromState} --${symbol}--> ${toState}`);
    });
  }
}

module.exports = Automaton;
