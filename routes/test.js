const express = require("express");
const router = express.Router();
const DF_Automaton = require("../classes/DF_Automaton");

router.get("/", (req, res) => {
  res.json({ result: "hakdog ka ba" });
});

router.get("/uppercase", (req, res) => {
  const { test } = req.query;
  console.log(req.query);
  
  if (!test) {
    return res.status(400).json({ error: "Missing 'test' parameter" });
  }

  res.json({ 
    test: test.toUpperCase() 
  });
});

router.get("/nodes", (req, res) => {
    const { nodes } = req.query;
    
    if (!nodes) {
      return res.status(400).json({ error: "Missing 'nodes' parameter" });
    }
    console
    try {
      // Parse the JSON string back to an array
      const nodesArray = []
      
      nodes.forEach(node => {
          const message = `${node.data.isFinalState ? node.id +  " FS" : node.id}`;
          // console.log(message);
          nodesArray.push(message);
      });
  
      res.json({ 
        nodes: nodesArray,
        count: nodesArray.length 
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid nodes format" });
    }
  });

router.get("/run_automaton", (req, res) => {
    // need ko na inputs from frontend
    const { nodes, edges, testCase } = req.query;
    
    if (!nodes) {
      return res.status(400).json({ error: "Missing 'nodes' parameter" });
    }

    try {

        // console.log(nodes);
        // console.log(edges);

        const states = new Map();

        nodes.forEach(node => {
            states.set(node.id, node.data.isFinalState);
        });

        const transitions = new Map();

        edges.forEach(edge => {
            transitions.set(`${edge.source},${edge.data}`, edge.target);
        });

        const initialState = Array.from(states.keys())[0];
        const acceptStates = new Set();
        nodes.forEach(node => {
            if (node.data.isFinalState) {
                acceptStates.add(node.id);
            }
        });

        // console.log(states);
        // console.log(transitions);
        // console.log(initialState);
        // console.log(acceptStates);
      
        const automaton = new DF_Automaton(states, transitions, initialState, acceptStates);
        console.log(`INPUT: ${testCase}`);
        console.log(`ACCEPTED: ${automaton.process(testCase)}`);

        automaton.printDFAutomaton();

  
    //   res.json({ 
    //     nodes: nodesArray,
    //     count: nodesArray.length 
    //   });
    } catch (error) {
      res.status(400).json({ error: "Invalid nodes format" });
    }
  });

module.exports = router;
