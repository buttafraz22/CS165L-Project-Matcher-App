import '../App.css';
import Login from './Login';
import SignUp from './SignUp';
import {BrowserRouter as Main, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Main>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
        </Routes>
    </Main>
  );
}

export default App;