import React, { useContext, useEffect, useRef, useState } from "react";
import NotesCotext from "../ContextApi/Notes/notesContext";
import AddNotes from "./AddNotes";
import NotesItem from "./NotesItem";
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
function Notes() {
  const context = useContext(NotesCotext);
  const ref = useRef(null)
  const Close = useRef(null)
  const [note, setNote] = useState({ id: "", Etitle: "", Edescription: "", Etag: "" })
  const { Notes, GetAllNOtes, EditNotes } = context;
  let navigate=useNavigate()
  useEffect(() => {
    if(localStorage.getItem("token")){
      GetAllNOtes()
    }
    else{
       navigate('/login')
    }
  }, [])

  const handlerclick = async(e) => {
    // console.log("edit   "+ e.Edescription)
    Close.current.click()
    EditNotes(note.id, note.Etitle, note.Edescription, note.Etag)
    await toast.success("Note Edit Succesfully😊");
  }

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const UpdateNotes = (Cnote) => {
    ref.current.click()
    setNote({ id: Cnote._id, Etitle: Cnote.title, Edescription: Cnote.description, Etag: Cnote.tag })
  }
  return (
    <>
      <AddNotes />

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Your Notes</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="Etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="Etitle" name="Etitle" value={note.Etitle} aria-describedby="emailHelp" onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="Edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="Edescription" name="Edescription" value={note.Edescription} onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="Etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="Etag" name="Etag" value={note.Etag} onChange={onchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={Close} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.Etitle.length<5 || note.Edescription.length<5 ||note.Etag.length<3} type="button" className="btn btn-primary" onClick={(e) => { handlerclick(e) }}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="YourNotes row" id="Notes">
        <h2 className="text-center">Your Notes</h2>
        
        {Notes.map((note) => {
          return <NotesItem note={note} UpdateNotes={UpdateNotes} key={note._id} />;
        })}
      </div>
    </>
  );
}

export default Notes;
