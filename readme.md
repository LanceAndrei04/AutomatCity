# Automata Processing Backend

A Node.js backend service for processing and validating Deterministic Finite Automata (DFA) and Non-deterministic Finite Automata (NFA).

## Features

- Process DFA inputs and determine acceptance
- Process NFA inputs and determine acceptance
- Validate DFA configurations
- RESTful API endpoints for automata operations
- MongoDB integration for data persistence

## Prerequisites

- Node.js (v14 or higher recommended)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
DB_URL=mongodb://your-mongodb-connection-string
```

4. Start the development server:
```bash
npm run devStart
```

The server will start on port 3000 by default.

## API Endpoints

### Test Route
- `GET /test` - Test if the API is working

### Automata Routes
- `GET /automata` - Test if automata processing route is working
- `GET /automata/process_DFA` - Process input string using DFA
- `GET /automata/process_NFA` - Process input string using NFA
- `GET /automata/validate_DFA` - Validate DFA configuration

### Request Parameters

For processing endpoints (`/process_DFA`, `/process_NFA`):
- `nodes`: Array of automaton states
- `edges`: Array of transitions
- `testCase`: Input string to process

For validation endpoint (`/validate_DFA`):
- `nodes`: Array of automaton states
- `edges`: Array of transitions

## Project Structure

```
├── server.js           # Main application entry point
├── routes/
│   ├── test.js        # Test routes
│   └── automata.js    # Automata processing routes
├── classes/
│   ├── Automaton.js   # Base automaton class
│   ├── DF_Automaton.js# Deterministic Finite Automaton implementation
│   └── NF_Automaton.js# Non-deterministic Finite Automaton implementation
```

## Dependencies

- express: Web framework
- mongoose: MongoDB object modeling
- cors: Cross-Origin Resource Sharing middleware
- dotenv: Environment variable management
- nodemon: Development server with hot reload

## Development

To start the development server with hot reload:
```bash
npm run devStart
```

## Error Handling

The application includes global error handling middleware that will catch and process any unhandled errors, returning appropriate HTTP status codes and error messages.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
