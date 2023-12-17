/*
  LoginContext

  This module defines a React context for managing login-related state and functions.
  It is used to share login-related information across components.

  Dependencies:
  - React: Core library for building UI components.
*/

// Importing the createContext function from React
const { createContext } = require("react");

// Creating a React context for managing login-related information
const loginContext = createContext();

// Exporting the loginContext for use in other components
export default loginContext;