# Automaton Simulator Backend

A backend service for processing and validating finite automata.

## Quick Start for Collaborators

### Setting Up the Repository

```bash
git remote add origin https://github.com/HusPhil/automaton-simulator-backend.git
git pull origin master
```

### Running the Server Locally
```bash
npm install
npm run devStart
```

## Frontend Integration Example

Here's an example of how to integrate with a React frontend:

```typescript
async function processAutomaton(): Promise<void> {
    // testCase: input string to process
    // currMode: 'DFA' or 'NFA'
    // nodes: array of automaton states
    // edges: array of transitions
    
    try {
        const response = await axios.get(
            `http://localhost:3000/automata/process_${currMode.toUpperCase()}`, 
            {
                params: {
                    nodes,
                    edges,
                    testCase: localData,
                }
            }
        );

        // Update state with automaton processing results
        setAutomatonResult({
            result: response.data.result,        // boolean: whether input is accepted
            statePath: response.data.statePath,  // array: path of states traversed
            isValid: response.data.isValid,      // boolean: whether automaton is valid
            acceptStates: response.data.acceptStates  // array: final/accepting states
        });

        // Response data includes:
        console.log("Input:", testCase);
        console.log("State Path:", response.data.statePath);
        console.log("Accepted:", response.data.result);
        console.log("Valid Automaton:", response.data.isValid);
        console.log(
            response.data.acceptStates?.length <= 0 
                ? "You did not specify any final states." 
                : "You have specified final states."
        );
    } catch (error) {
        console.error("Error processing automaton:", error);
    }
}
```

## API Response Format

The API returns a JSON object with the following structure:

```typescript
interface AutomatonResponse {
    result: boolean;      // Whether the input string is accepted
    statePath: string[];  // Sequence of states visited during processing
    isValid: boolean;     // Whether the automaton configuration is valid
    acceptStates: string[]; // List of accepting/final states
}
```

## Development

The server runs on port 3000 by default. Make sure no other service is using this port before starting the development server.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
