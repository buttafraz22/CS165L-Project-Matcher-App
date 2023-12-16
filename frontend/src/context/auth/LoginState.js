import { useState } from "react";
import LoginContext from "./loginContext";

function LoginState(props) {
    const [login, setLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [myProfile, setMyProfile] = useState(null);

    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(70);

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

    function updateMinAge(age) {
        setMinAge(age);
    }

    function updateMaxAge(age) {
        setMaxAge(age);
    }

    return (
        <>
            <LoginContext.Provider value={{login, userId, username, myProfile, minAge, maxAge, updateUserId, updateLogin, updateUsername, updateMyProfile, updateMinAge, updateMaxAge}}>
                {props.children}
            </LoginContext.Provider>
        </>
    )
}

export default LoginState;