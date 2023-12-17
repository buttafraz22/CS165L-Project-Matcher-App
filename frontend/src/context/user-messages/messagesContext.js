/*
  messagesContext

  This module defines a React context for managing user messages.
  It uses createContext from React to create the context and provides it for use in other components.

  Dependencies:
  - React: Core library for building UI components.
*/

// Importing createContext from React
const { createContext } = require("react");

// Creating and exporting the messagesContext using createContext
const messagesContext = createContext();

export default messagesContext;