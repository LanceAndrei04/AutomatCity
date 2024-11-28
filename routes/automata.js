const express = require("express");
const router = express.Router();
const DF_Automaton = require("../classes/DF_Automaton");
const NF_Automaton = require("../classes/NF_Automaton");
const Automaton = require("../classes/Automaton");

router.get("/", (req, res) => {
  console.log({ result: "Route for processing Automata is working!" })
  res.json({ result: "Route for processing Automata is working!" });
});

router.get("/testInputs", (req, res) => {
  const { nodes, edges, testCase } = req.query;

  console.log("nodes", nodes)
  console.log("edges", edges)
  console.log("testCase", testCase)
 
  res.json({ result: "Route for processing Automata is working!" });
});

//TESTED implementation
router.get("/process_DFA", (req, res) => {
    // need ko na inputs from frontend
    const { nodes, edges, testCase } = req.query;
    
    if (!nodes || !edges) {
      return res.status(400).json({ error: "Missing 'nodes' or 'edges' parameter" });
    }

    try {
        const { states, transitions, initialState, acceptStates, alphabet } = Automaton.parseAutomaton(nodes, edges);
        
        const DFA = new DF_Automaton(states, transitions, initialState, acceptStates, alphabet);
        const isValid = DFA.validateDFA();
        const { result, statePath } = DFA.process(testCase);

       

        res.json({ 
            // states: states,
            // initialState: initialState,
            // acceptStates: Array.from(acceptStates),
            // transitions: Array.from(transitions.entries()),
            result: result,
            statePath: statePath,
            isValidDFA: isValid
        });
    
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Invalid nodes format" });
    }
  });


//UNTESTED implementation
router.get("/generateTuples", (req, res) => {
    // Get inputs from frontend
    const { nodes, edges } = req.query;
    
    if (!nodes || !edges) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    try {
      const { states, transitions, initialState, acceptStates, alphabet } = Automaton.parseAutomaton(nodes, edges);

      const formattedTransitions = []

      const sortedAlphabet = Array.from(alphabet).sort()

      for (const state of states) {

        // const keyVal = t[0].split(",")
        let row = [state[0]]

        for (const symbol of sortedAlphabet) {
          const targetStates = transitions.get(`${state[0]},${symbol}`) || []
          row.push(targetStates.sort())
        }

        formattedTransitions.push(row)
        row = []
      }

      console.log("formattedTransitions", formattedTransitions)


      res.json({ 
          states: Array.from(states),
          initialState,
          acceptStates: Array.from(acceptStates),
          transitions: Array.from(formattedTransitions),
          alphabet: sortedAlphabet
      });
    
    } catch (error) {
        res.status(400).json({ error: "Invalid input format" });
    }
});

//TESTED implementation
router.get("/process_NFA", (req, res) => {
    // need ko na inputs from frontend
    console.log("PROCESSING NFA");

    const { nodes, edges, testCase } = req.query;
    
    if (!nodes || !edges) {
        return res.status(400).json({ error: "Missing 'nodes' or 'edges' parameter" });
    }

    try {
        const { states, transitions, initialState, acceptStates, alphabet } = Automaton.parseAutomaton(nodes, edges);

        const NFA = new NF_Automaton(states, transitions, initialState, acceptStates, alphabet);
        const isValid = NFA.validateDFA();
        
        const { result, statePath } = NFA.process(testCase);

        console.log(statePath)
  
        res.json({ 
            states: states,
            initialState: initialState,
            acceptStates: acceptStates,
            transitions: transitions,
            result: result,
            statePath: statePath,
            isValid: isValid
        }); 
    
    } catch (error) {
      res.status(400).json({ error: "Invalid nodes format" });
    }
  });

//UNTESTED implementation
router.get("/validate_DFA", (req, res) => {
    // Get inputs from frontend
    const { nodes, edges } = req.query;
    
    if (!nodes || !edges) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    try {
        const alphabet = new Set()
        for (const edge of edges) {
            alphabet.add(edge.data);
        }

        const { states, transitions, initialState, acceptStates } = Automaton.parseAutomaton(nodes, edges);

        const DFA = new DF_Automaton(states, transitions, initialState, acceptStates);
        const result = DFA.validate(alphabet);
  
        res.status(200).json({ 
            result
        });
    
    } catch (error) {
        res.status(400).json({ error: "Invalid input format" });
    }
});

module.exports = router;
