import '../App.css';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import About from './About';
import {BrowserRouter as Main, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Main>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
        </Routes>
    </Main>
  );
}

export default App;