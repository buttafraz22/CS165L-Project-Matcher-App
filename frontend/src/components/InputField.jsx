/*
  InputField Component

  This is a reusable component for rendering an input field. It receives various props
  to customize the input type, name, placeholder, value, and an event handler for changes.

  Dependencies:
  - React: Core library for building UI components.
*/

import React from "react";

function InputField(props) {
    // Rendered JSX for InputField component
    return (
        <div className="form-group">
            {/* Input field with specified props */}
            <input type={props.type} name={props.name} className="form-control" placeholder={props.placeholder} value={props.value} onChange={props.onChanged}/>
        </div>
    );
}

// Export the InputField component
export default InputField;