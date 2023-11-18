import '../App.css';
import Navbar from './Navbar';


function Login() {
    return (
        <>
            <Navbar />
            <div class="login">
                <div class="image-wrapper">
                    <img src="./images/image1.png" alt="" />
                </div>
                <form class="mr-5 mb-5">
                    <h2>Login</h2>
                    <div class="form-inputs">
                    <div class="form-group mt-5">
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" />
                    </div>
                    <div class="form-group mb-5">
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        <a href="#"><small id="emailHelp" class="form-text text-muted" style={{textAlign: 'end'}}>Forget Password?</small></a>
                    </div>
                    </div>
                    <div class="form-buttons">
                        <button class="btn btn-secondary mb-3">Login</button>
                        <button class="btn btn-outline-secondary">Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    );
  }
  
  export default Login;