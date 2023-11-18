import '../App.css';
import Navbar from './Navbar';
import InputField from './InputField';


function Login() {
    return (
        <>
            <Navbar />
            <div className="login">
                <div className="image-wrapper">
                    <img src="./images/image1.png" alt="" />
                </div>
                <form className="mr-5 mb-5">
                    <h2>Login</h2>
                    <div className="form-inputs">
                        <InputField 
                            type='text'
                            placeholder='Username'
                        />
                        <InputField 
                            type='password'
                            placeholder='Password'
                        />
                        <a href="#"><small id="emailHelp" className="form-text text-muted" style={{textAlign: 'end'}}>Forget Password?</small></a>
                    </div>
                    <div className="form-buttons">
                        <button className="btn btn-secondary mb-3">Login</button>
                        <button className="btn btn-outline-secondary">Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    );
  }
  
  export default Login;