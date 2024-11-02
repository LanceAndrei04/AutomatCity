const express = require("express");
const router = express.Router();
const DF_Automaton = require("../classes/DF_Automaton");
const NF_Automaton = require("../classes/NF_Automaton");
const Automaton = require("../classes/Automaton");

router.get("/", (req, res) => {
  res.json({ result: "Route for processing Automata is working!" });
});

router.get("/process_DFA", (req, res) => {
    // need ko na inputs from frontend
    const { nodes, edges, testCase } = req.query;
    
    if (!nodes || !edges) {
      return res.status(400).json({ error: "Missing 'nodes' or 'edges' parameter" });
    }

    try {

        const alphabet = new Set();
        for (const edge of edges) {
            alphabet.add(edge.data);
        }

        
        const { states, transitions, initialState, acceptStates } = Automaton.parseAutomaton(nodes, edges);
        
        const DFA = new DF_Automaton(states, transitions, initialState, acceptStates);
        const isValid = DFA.validate(alphabet);
        const { result, statePath } = DFA.process(testCase);


        res.json({ 
            states: states,
            initialState: initialState,
            acceptStates: Array.from(acceptStates),
            transitions: transitions,
            result: result,
            statePath: statePath,
            isValid: isValid
        });
    
    } catch (error) {
      res.status(400).json({ error: "Invalid nodes format" });
    }
  });

router.get("/process_NFA", (req, res) => {
    // need ko na inputs from frontend
    const { nodes, edges, testCase } = req.query;
    
    if (!nodes || !edges) {
        return res.status(400).json({ error: "Missing 'nodes' or 'edges' parameter" });
    }

    try {
        const alphabet = new Set();
        for (const edge of edges) {
            alphabet.add(edge.data);
        }
        const { states, transitions, initialState, acceptStates } = Automaton.parseAutomaton(nodes, edges);

        const NFA = new NF_Automaton(states, transitions, initialState, acceptStates);
        const DFA = new DF_Automaton(states, transitions, initialState, acceptStates);
        const isValid = DFA.validate(alphabet);
        
        const { result, statePath } = NFA.process(testCase);

        // console.log("result:", result);
        // console.log("statePath:", statePath);
        // console.log("isValid:", isValid);
        // console.log("transitions:", transitions);
  
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

router.get("/validate_DFA", (req, res) => {
    // Get inputs from frontend
    const { nodes, edges, testCase } = req.query;
    
    if (!nodes || !edges || !testCase) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    try {
        const alphabet = new Set()
        for (const edge of edges) {
            alphabet.add(edge.data);
        }
  
        res.json({ 
            result,
            alphabet
        });
    
    } catch (error) {
        res.status(400).json({ error: "Invalid input format" });
    }
});



module.exports = router;
