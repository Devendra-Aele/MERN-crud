import React,{useEffect} from "react";
import { Link ,useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function Navbar() {
    let location = useLocation();
    let  navigate=useNavigate()
    useEffect(() => {
    }, [location]);

  const logOut= async()=>{
        localStorage.removeItem('token')
        await toast.success("LogOut Succesfully🧑");
        navigate('/signUp')
  }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top ">
                <div className="container">
                    <Link className="navbar-brand fs-3" to="/">
                        ✍. Notes
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link  fs-5 ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link  fs-5 ${location.pathname==="/about"?"active":""}`} to="/about">
                                    About
                                </Link>
                            </li>
                        {  !localStorage.getItem('token') ? <li className="nav-item">
                            <Link className={`btn btn-outline-primary mx-2 ${location.pathname==="/login"?"active":""}`} to="/login" role="button">Login</Link>
                            <Link className={`btn btn-outline-primary mx-2 ${location.pathname==="/signUp"?"active":""}`} to="signUp" role="button">SignUp</Link>
                            </li>:<button onClick={logOut} className={`btn btn-outline-primary mx-2 active`}>LogOut</button>}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
