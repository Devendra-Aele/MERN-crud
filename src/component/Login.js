import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function Login() {
    const navigate = useNavigate()
    const [Data, setData] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("Submit")
        const response = await fetch("http://localhost:5000/auth/login", {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: Data.email, password: Data.password })
        });
        const note = await response.json();
        if (note.Success) {
            localStorage.setItem("token", note.token)
            await toast.success("New User Is Login Succesfully🧑");
            navigate("/")
        } else {
            await toast.warning("Somting is wrong😔");
        }
        console.log(note)
    }
    const onchange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value })
    }

    return (
        <div className='container '>
            <div className='row Login'>
                {/* <h3>Login Form</h3> */}
                <div className='col-md-6 login_form'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address <span>*</span> </label>
                            <input type="email" className="form-control" id="email" name='email' value={Data.email} onChange={onchange} aria-describedby="emailHelp" minLength={5} required />
                            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password <span>*</span></label>
                            <input type="password" className="form-control" id="password" value={Data.password} onChange={onchange} name='password' minLength={5} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className='col-md-6 login_img' >
                     {/* <img src='https://pixabay.com/illustrations/login-computer-laptop-log-on-3187888/' alt='hello'></img> */}
                     <img src='/img/login.png' alt='hello'></img>
                </div>
            </div>

        </div>
    )
}

export default Login