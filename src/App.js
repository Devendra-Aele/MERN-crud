
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NotesState from './ContextApi/Notes/notesState';
import Login from './component/Login';
import SignUp from './component/SignUp';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <NotesState>
        <Router>
          <Navbar />
       
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signUp" element={<SignUp />}></Route>
            </Routes>
          </div>
        </Router>
        <ToastContainer position="top-right"/>
      </NotesState>
    </>
  );
}

export default App;
