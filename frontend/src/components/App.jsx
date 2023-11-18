import '../App.css';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import About from './About';
import Testmonials from './Testimonials'
import {BrowserRouter as Main, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Main>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/testimonials" element={<Testmonials />} />
        </Routes>
    </Main>
  );
}

export default App;