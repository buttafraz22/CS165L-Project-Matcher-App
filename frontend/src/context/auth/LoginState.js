import { useState } from "react";
import LoginContext from "./loginContext";

function LoginState(props) {
    const [login, setLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [myProfile, setMyProfile] = useState(null);

    function updateLogin(isLogin) {
        setLogin(isLogin);
    }

    function updateUserId(id) {
        setUserId(id);
    }

    function updateUsername(uname) {
        setUsername(uname);
    }

    function updateMyProfile(profile) {
        setMyProfile(profile);
    }

    return (
        <>
            <LoginContext.Provider value={{login, userId, username, myProfile, updateUserId, updateLogin, updateUsername, updateMyProfile}}>
                {props.children}
            </LoginContext.Provider>
        </>
    )
}

export default LoginState;