import '../App.css'

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light py-2">
            <a class="navbar-brand text-light ml-5" href="#">Matcher App</a>
            <button class="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse mr-5" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link text-light" href="#">About <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="#">Testimonials</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="#">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
  }
  
  export default Navbar;