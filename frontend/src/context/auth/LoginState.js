import { useState } from "react";
import LoginContext from "./loginContext";

function LoginState(props) {
    const [login, setLogin] = useState(false);

    function updateLogin(isLogin) {
        setLogin(isLogin);
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