import '../App.css'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-2">
            <a className="navbar-brand text-light ml-5" href="#">Matcher App</a>
            <button className="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse mx-5" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/about">About <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/testimonials">Testimonials</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
  }
  
  export default Navbar;