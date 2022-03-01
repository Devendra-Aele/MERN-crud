import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function SignUp() {
    const navigate=useNavigate()
    // const notify = () => toast("Wow so easy!");
  const  [Data, setData] = useState({name:"",email:"",password:"",Cpassword:""})
  const handleSubmit= async(e)=>{
      e.preventDefault()
      console.log("Submit")
      const response = await fetch("http://localhost:5000/auth/create" , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        
          body: JSON.stringify({name:Data.name, email:Data.email,password:Data.password })
        });
        const note = await response.json();
        if(note.Success){
            localStorage.setItem("token",note.token)
            await toast.success("New User Is Signin Succesfully🧑");
            // await notify()
            navigate("/")
        }else{
            await toast.warning("Somting is wrong😔");
        }
        console.log(note)
  }
  const onchange=(e)=>{
       setData({...Data,[e.target.name]:e.target.value})
  }

  return (
    <div>
         <div className='container Signin'>
            <form onSubmit={handleSubmit}>
            <h3>SignIn Form</h3>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name <span>*</span></label>
                    <input type="text" className="form-control" id="name"  name='name' value={Data.name} onChange={onchange} aria-describedby="emailHelp" minLength={3} required/>
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address <span>*</span></label>
                    <input type="email" className="form-control" id="email"  name='email' value={Data.email} onChange={onchange} aria-describedby="emailHelp"  />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password <span>*</span></label>
                    <input type="password" className="form-control" id="password" value={Data.password} onChange={onchange} name='password' minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
                    <input type="Cpassword" className="form-control" id="Cpassword" onChange={onchange} name='Cpassword'minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default SignUp