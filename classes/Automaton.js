class Automaton {
  constructor(states, edges, initialState, acceptStates) {
    this.states = states;         // Map of states
    this.transitions = edges;     // Map of transitions
    this.initialState = initialState;
    this.acceptStates = acceptStates;    // Set of accepting states
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
      }

      initialState = nodes[0].id;

      const transitions = new Map();
      
      // Process each edge
      for (const edge of edges) {
          const key = `${edge.source},${edge.data}`;
          
          // If this transition already exists, add to the array of targets
          if (transitions.has(key)) {
              transitions.get(key).push(edge.target);
          } else {
              // Create new array with first target
              transitions.set(key, [edge.target]);
          }
      }

      return { states, transitions, initialState, acceptStates };
  }

  // Process an input string
  process(input) {
    throw new Error('Method not implemented.');
  }

  // Print automaton details
  printAutomaton() {
    console.log('States:', Array.from(this.states.keys()));
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
