import { useState } from "react";
import LoginContext from "./loginContext";

function LoginState(props) {
    const [login, setLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);

    function updateLogin(isLogin) {
        setLogin(isLogin);
    }

    function updateUserId(id) {
        console.log(id);
        setUserId(id);
    }

    function updateUsername(uname) {
        setUsername(uname);
    }

    return (
        <>
            <LoginContext.Provider value={{login, userId, username, updateUserId, updateLogin, updateUsername}}>
                {props.children}
            </LoginContext.Provider>
        </>
    )
}

export default LoginState;