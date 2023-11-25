import { useState } from "react";
import LoginContext from "./loginContext";

function LoginState(props) {
    const [login, setLogin] = useState(false);
    const [userId, setUserId] = useState(null);

    function updateLogin(isLogin) {
        setLogin(isLogin);
    }

    function updateUserId(id) {
        setUserId(id);
    }

    return (
        <>
            <LoginContext.Provider value={{login, userId, updateUserId, updateLogin}}>
                {props.children}
            </LoginContext.Provider>
        </>
    )
}

export default LoginState;