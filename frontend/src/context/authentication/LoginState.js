import { useState } from "react";
import LoginContext from "./loginContext";

function LoginState(props) {
    const [login, setLogin] = useState(false);

    function updateLogin() {
        setLogin(prevValue=>!prevValue);
    }

    return (
        <>
            <LoginContext.Provider value={{login, updateLogin}}>
                {props.children}
            </LoginContext.Provider>
        </>
    )
}

export default LoginState;