import React from "react";

function InputField(props) {
    return (
        <div className="form-group">
            <input type={props.type} name={props.name} className="form-control" placeholder={props.placeholder} value={props.value} onChange={props.onChanged}/>
        </div>
    );
}

export default InputField;